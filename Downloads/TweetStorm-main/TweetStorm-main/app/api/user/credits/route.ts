import { getRemainingUserCredits } from '@/api-utils/database/users';
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

    const remainingCredits = await getRemainingUserCredits(token.id as number);

    return Response.json({ credits: { count: remainingCredits } });
  } catch (err) {
    return next(err);
  }
};
