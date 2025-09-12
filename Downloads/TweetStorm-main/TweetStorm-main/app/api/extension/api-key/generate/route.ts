import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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
      .select('user_id');
    if (!!apiKey.length) {
      await db('extension_api_keys').where({ user_id: token.id }).delete();
    }

    const currentDate = new Date();
    const key = uuidv4();
    await db('extension_api_keys').insert({
      user_id: token.id,
      key,
      created_at: currentDate,
      updated_at: currentDate,
    });
    return Response.json(
      {
        apiKey: key,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return next(err);
  }
};
