import { userNotFoundResponse } from '@/api-utils/utils';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
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
      .select('pm_type', 'pm_last_four', 'pm_expiration')
      .first();
    if (!user) {
      return userNotFoundResponse('No user found');
    }

    return Response.json({
      pm: user,
    });
  } catch (err) {
    return next(err);
  }
};
