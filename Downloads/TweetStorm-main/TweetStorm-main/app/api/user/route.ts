import {
  checkPassword,
  userNotFoundResponse,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { removeKeys } from '@/utils/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};

const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;
    const user = await db('users')
      .where({
        id: token.id,
      })
      .select('id', 'email', 'name', 'password')
      .first();
    if (!user) {
      return userNotFoundResponse('No user found');
    }

    let signedInWithEmail = true;
    if (user.password === null) {
      signedInWithEmail = false;
    } else {
      const doPasswordsMatch = await checkPassword(
        process.env.DEFAULT_USER_PASS as string,
        user.password as string
      );
      if (doPasswordsMatch) signedInWithEmail = false;
    }

    return Response.json({
      user: {
        ...removeKeys(user, ['password']),
        id: user.id.toString(),
        signedInWithEmail: signedInWithEmail,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut, [auth]);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.updateUserProfile.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;

    const user = await db('users').where({ id: token.id }).select('id').first();
    if (!user) {
      return userNotFoundResponse('No user found for update');
    }

    await db('users')
      .where({ id: user.id })
      .update({
        ...body,
      });

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};
