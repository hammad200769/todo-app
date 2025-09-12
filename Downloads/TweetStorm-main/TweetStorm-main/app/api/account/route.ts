import { resetCreditsUsage } from '@/api-utils/database/credits-usage';
import {
  checkPassword,
  getStripe,
  jsonErrorResponse,
  userNotFoundResponse,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { ERROR_TYPE } from '@/types/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const DELETE: RouteInitiator = (...params) => {
  return handleRequest(params, handleDelete, [auth]);
};

const handleDelete: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;
    const body = await request.json();
    const { error } = validationSchemas.deleteUser.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }
    const { password } = body;

    const user = await db('users')
      .where({ id: token.id })
      .select('id', 'stripe_id', 'password', 'email')
      .first();
    if (!user) {
      return userNotFoundResponse('No user found for deletion');
    }

    if (!user.password) {
      return jsonErrorResponse(
        ERROR_TYPE.ValidationError,
        'User has no password',
        403
      );
    }

    const doPasswordsMatch = await checkPassword(
      password,
      user.password as string
    );
    if (!doPasswordsMatch) {
      return jsonErrorResponse(
        ERROR_TYPE.ValidationError,
        'Incorrect current password',
        400
      );
    }

    if (user.stripe_id) {
      await Promise.all([
        getStripe().customers.del(user.stripe_id),

        db('users').where({ id: token.id }).update({ stripe_id: null }),
      ]);
    }

    // remove existing account deletion entries if any

    await db('account_deletions').where({ userId: token.id }).del();
    const currentDate = new Date();
    // permanent deletion date is 90 days from now
    const permanentDeletionDate = new Date(
      new Date().setDate(currentDate.getDate() + 90)
    );

    await db('account_deletions').insert({
      userId: user.id,
      email: user.email,
      deleted_at: currentDate,
      permanent_deletion_at: permanentDeletionDate,
    });
    await resetCreditsUsage(user.id);
    await db('account_deletion_verifications')
      .where({ userId: token.id })
      .del();

    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
