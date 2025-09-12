import { resetCreditsUsage } from '@/api-utils/database/credits-usage';
import {
  getStripe,
  jsonErrorResponse,
  userNotFoundResponse,
  validationErrorResponse__New,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const DELETE: RouteInitiator = (...params) => {
  return handleRequest(params, handleDelete, [auth]);
};

const handleDelete: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.deleteAccount.validate(body);
    if (error) {
      return validationErrorResponse__New(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;
    const verification = await db('account_deletion_verifications')
      .where({ userId: token.id })
      .select('code', 'expires_at')
      .first();
    if (!verification) {
      return jsonErrorResponse(
        'code-not-found',
        'Verification code not found. Please request a new verification code',
        404
      );
    }
    if (verification.code != body.verificationCode) {
      return jsonErrorResponse(
        'invalid-verification-code',
        'Verification code did not match',
        401
      );
    }
    if (verification.expires_at < new Date()) {
      return jsonErrorResponse(
        'expired-verification-code',
        'Verification code has expired. Please generate a new one',
        401
      );
    }

    const user = await db('users')
      .where({ id: token.id })
      .select('stripe_id')
      .first();
    if (!user) {
      return userNotFoundResponse('No user found for deletion');
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
      userId: token.id,
      email: token.email,
      deleted_at: currentDate,
      permanent_deletion_at: permanentDeletionDate,
    });

    await resetCreditsUsage(token.id as number);

    db('account_deletion_verifications')
      .where({ userId: token.id })
      .del()
      .catch(err => console.error(err));
    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
