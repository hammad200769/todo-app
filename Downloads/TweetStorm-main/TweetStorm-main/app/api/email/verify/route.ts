import { sendEmailVerificationEmail } from '@/api-utils/database/users';
import { jsonErrorResponse, validationErrorResponse } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { ERROR_TYPE } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const currentDate = new Date();

    const body = await request.json();
    const { error } = validationSchemas.verifyEmail.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }
    const user = await db('email_verifications')
      .join('users', 'email_verifications.user_id', '=', 'users.id')
      .where('email_verifications.public_token', body.token)
      .select('users.id as user_id', 'users.email', 'users.email_verified_at')
      .first();

    if (!user) {
      return jsonErrorResponse(
        ERROR_TYPE.UserNotFound,
        'User not found. Make sure to sign up first.',
        400
      );
    }

    if (user.email_verified_at) {
      return jsonErrorResponse(
        'email-already-verified',
        'The user email is already verified.',
        400
      );
    }
    const email_verification = await db('email_verifications')
      .where({
        public_token: body.token,
      })
      .select('id')
      .first();
    const token = uuidv4();
    const publicToken = uuidv4();

    if (email_verification) {
      await db('email_verifications')
        .update({
          expires_at: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
          updated_at: currentDate,
          token,
        })
        .where({
          public_token: body.token,
        });

      await sendEmailVerificationEmail({
        emailTo: user.email,
        token,
      });
      return new Response(null, {
        status: 204,
      });
    }

    await db('email_verifications').insert({
      user_id: user.user_id,
      token,
      expires_at: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
      created_at: currentDate,
      public_token: publicToken,
      updated_at: currentDate,
    });

    await sendEmailVerificationEmail({
      emailTo: user.email,
      token,
    });

    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
