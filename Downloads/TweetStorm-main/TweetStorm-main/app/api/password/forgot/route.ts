import { sendPasswordResetEmail } from '@/api-utils/database/users';
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
    const { error } = validationSchemas.forgotPassword.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const user = await db('users')
      .where({
        email: body.email,
      })
      .select('email')
      .first();
    if (!user) {
      return jsonErrorResponse(
        ERROR_TYPE.UserNotFound,
        'The user with this email does not exist',
        400
      );
    }
    const token = uuidv4();
    await db('password_reset_tokens').insert({
      email: user.email,
      token,
      // add 1 hour in milliseconds to set the expiry time to after 1 hour.
      expires_at: new Date(currentDate.getTime() + 1 * 60 * 60 * 1000),
      created_at: currentDate,
    });
    await sendPasswordResetEmail({
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
