import { sendDeleteVerificationEmail } from '@/api-utils/database/users';
import { userNotFoundResponse } from '@/api-utils/utils';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { randomInt } from 'crypto';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;
    const user = await db('users')
      .leftJoin(
        'account_deletion_verifications',
        'users.id',
        'account_deletion_verifications.userId'
      )
      .where('users.id', token.id as string)
      .select(
        'users.id ',
        'users.email as email',
        'account_deletion_verifications.id as deletion_verification_id'
      )
      .first();
    if (!user) {
      return userNotFoundResponse('No user found for deletion');
    }
    // remove already existing verification codes for this user
    if (user?.deletion_verification_id) {
      await db('account_deletion_verifications')
        .where({ userId: user.id })
        .del();
    }
    const code = randomInt(100000, 999999);
    const codeCreationDate = new Date();

    await db('account_deletion_verifications').insert({
      userId: user.id,
      code,
      expires_at: new Date(codeCreationDate.getTime() + 24 * 60 * 60 * 1000),
      created_at: codeCreationDate,
    });

    await sendDeleteVerificationEmail({
      emailTo: user.email,
      verificationCode: code,
    });

    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
