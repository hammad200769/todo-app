import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
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

    const subscription = await getActiveUserSubscription(token.id as number, [
      'stripe_id',
    ]);

    if (!subscription) {
      return Response.json({ count: 0 });
    }

    const [{ count }] = await db('receipts')
      .where({ subscription_id: subscription.stripe_id })
      .count('subscription_id as count');

    return Response.json({ count: Number(count) });
  } catch (err) {
    return next(err);
  }
};
