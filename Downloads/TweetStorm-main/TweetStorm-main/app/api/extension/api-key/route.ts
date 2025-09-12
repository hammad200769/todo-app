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
    if (!token) return Response.json({ message: 'token not found' });

    const apiKey = await db('extension_api_keys')
      .where({
        user_id: token.id,
      })
      .select('key');
    if (!apiKey.length)
      return Response.json(
        {
          apiKey: null,
        },
        {
          status: 404,
        }
      );

    return Response.json(
      {
        apiKey: apiKey[0].key,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return next(err);
  }
};
