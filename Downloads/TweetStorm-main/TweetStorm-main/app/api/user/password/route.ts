import {
  checkPassword,
  hashPassword,
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

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut, [auth]);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.updatePassword.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }
    const { oldPassword, newPassword } = body;

    const token = (await getToken({ req: request as NextRequest }))!;

    const user = await db('users')
      .where({ id: token.id })
      .select('id', 'password')
      .first();
    if (!user) {
      return userNotFoundResponse('No user found for update');
    }
    if (!user.password) {
      return Response.json(
        {
          error: {
            type: ERROR_TYPE.ValidationError,
            message: 'User has no password set',
          },
        },
        {
          status: 400,
        }
      );
    }
    const doPasswordsMatch = await checkPassword(
      oldPassword,
      user.password as string
    );
    if (!doPasswordsMatch) {
      return Response.json(
        {
          error: {
            type: ERROR_TYPE.ValidationError,
            message: 'Incorrect current password',
          },
        },
        {
          status: 400,
        }
      );
    }

    await db('users')
      .where({ id: user.id })
      .update({
        password: await hashPassword(newPassword),
      });

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};
