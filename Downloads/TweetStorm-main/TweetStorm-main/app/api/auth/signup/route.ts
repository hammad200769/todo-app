import { createBulkUsage } from '@/api-utils/database/bulk-actions-usage';
import { createUserCreditsUsage } from '@/api-utils/database/credits-usage';
import { sendEmailVerificationEmail } from '@/api-utils/database/users';
import {
  getAffiliateId,
  hashPassword,
  jsonErrorResponse,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { formatDateOnly, removeKeys } from '@/utils/utils';
import { v4 as uuidv4 } from 'uuid';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const currentDate = new Date();
    let data = await request.json();
    const { error } = validationSchemas.signup.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }
    data = { ...removeKeys(data, ['confirmedPassword']) };
    const hashedPassword = await hashPassword(data.password);
    const user = await db('users')
      .leftJoin('account_deletions', 'users.id', 'account_deletions.userId')
      .where('users.email', data?.email)
      .select(
        'users.id',
        'users.email',
        'users.name',
        'account_deletions.deleted_at',
        'account_deletions.permanent_deletion_at'
      )
      .first();
    if (user !== undefined && user !== null) {
      if (user.deleted_at) {
        if (user.permanent_deletion_at < currentDate) {
          await db('users').where({ id: user.id }).del();
        } else {
          return jsonErrorResponse(
            'account-deleted',
            `Your account was deleted. You cannot recreate it before ${formatDateOnly(
              user.permanent_deletion_at.toString()
            )}. To reactivate it now, please contact us at ${
              process.env.NEXT_PUBLIC_SUPPORT_EMAIL
            }.`,
            404
          );
        }
      } else {
        return jsonErrorResponse(
          'email-already-registered',
          'The user with this email is already registered, please login instead',
          400
        );
      }
    }

    await db('users').insert({
      ...data,
      password: hashedPassword,
      affiliate_id: await getAffiliateId(),
      created_at: new Date(),
    });
    const newUser = await db('users').where({ email: data.email }).first();
    const token = uuidv4();
    const publicToken = uuidv4();
    await db('email_verifications').insert({
      user_id: newUser.id,
      token,
      expires_at: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
      created_at: currentDate,
      public_token: publicToken,
      updated_at: currentDate,
    });

    Promise.all([
      await createBulkUsage(Number(newUser.id)),
      await createUserCreditsUsage(Number(newUser.id)),
    ]);
    sendEmailVerificationEmail({
      emailTo: data.email,
      token,
    });

    return Response.json({ token: publicToken }, { status: 201 });
  } catch (err) {
    return next(err);
  }
};
