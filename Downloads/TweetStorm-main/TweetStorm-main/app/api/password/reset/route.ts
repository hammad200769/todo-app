import {
  hashPassword,
  jsonErrorResponse,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { ERROR_TYPE } from '@/types/types';

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const currentDate = new Date();

    const body = await request.json();
    const { error } = validationSchemas.resetPassword.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const token = await db('password_reset_tokens')
      .where({
        token: body.token,
      })
      .select('expires_at', 'email')
      .first();
    if (!token) {
      return jsonErrorResponse(
        'token-not-found',
        'Verification token was not found',
        400
      );
    }

    // If token exists but has expired
    if (currentDate >= token.expires_at) {
      return jsonErrorResponse(
        'token-expired',
        'Your password reset token has expired. Try generating a new one.',
        400
      );
    }

    const user = await db('users')
      .where({
        email: token.email,
      })
      .select('email', 'email_verified_at')
      .first();
    if (!user) {
      return jsonErrorResponse(
        ERROR_TYPE.UserNotFound,
        'The user to which the reset token belongs does not exist in our system',
        400
      );
    }

    const hashedPassword = await hashPassword(body.password);
    await db('users')
      .where({
        email: token.email,
      })
      .update({
        password: hashedPassword,
        email_verified_at: user.email_verified_at
          ? user.email_verified_at
          : currentDate,
      });

    await db('password_reset_tokens')
      .where({
        email: token.email,
      })
      .del();
    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
