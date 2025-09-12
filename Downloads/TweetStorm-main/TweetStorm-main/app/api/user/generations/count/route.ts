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
    const searchParams = request.nextUrl.searchParams;

    const type = searchParams.get('type');
    if (type !== 'undefined') {
      const userGenerationsCount = await db('user_generations')
        .where({ user_id: token.id, type: type })
        .count('id as totalCount')
        .first();
      return Response.json({
        count: userGenerationsCount ? userGenerationsCount.totalCount : 0,
      });
    }
    const userGenerationsCount = await db('user_generations')
      .where({ user_id: token.id })
      .count('id as totalCount')
      .first();
    return Response.json({
      count: userGenerationsCount ? userGenerationsCount.totalCount : 0,
    });
  } catch (err) {
    return next(err);
  }
};
