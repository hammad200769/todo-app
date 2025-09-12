import { validationErrorResponse__New } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { validateSchema } from '@/utils/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut, [auth]);
};

const handlePut: RouteHandler = async (request, next, params) => {
  try {
    const data = await request.json();
    // TODO: make a wrapper getToken function
    const token = await getToken({ req: request as NextRequest });
    const { error } = validateSchema(validationSchemas.tweetSearch, data);

    if (error) {
      return validationErrorResponse__New(error);
    }

    const currentDate = new Date();

    await db('tweet_searches')
      .where({
        id: params && BigInt(params.params.searchId),
        user_id: token!.id,
      })
      .update({
        ...data.data,
        name: data.name,
        updated_at: currentDate,
        ...(data.data.start_date && {
          start_date: new Date(data.data.start_date),
        }),
        ...(data.data.end_date && { end_date: new Date(data.data.end_date) }),
      });

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};

export const DELETE: RouteInitiator = (...params) => {
  return handleRequest(params, handleDelete, [auth]);
};

const handleDelete: RouteHandler = async (request, next, params) => {
  try {
    const token = await getToken({ req: request as NextRequest });

    await db('tweet_searches')
      .where({
        id: params && BigInt(params.params.searchId),
        user_id: token!.id,
      })
      .del();

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};
