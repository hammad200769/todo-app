import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import { getStripe, jsonErrorResponse } from '@/api-utils/utils';
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
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'ends_at',
      'stripe_id',
    ]);

    if (!subscription) {
      return jsonErrorResponse(
        ERROR_TYPE.NoActiveSubscription,
        'User does not have any active subscriptions',
        400
      );
    }

    if (subscription.ends_at === null) {
      return jsonErrorResponse(
        ERROR_TYPE.DisallowedSubscriptionUpdate,
        'Subscription is already resumed',
        400
      );
    }

    const stripe = getStripe();

    await stripe.subscriptions.update(subscription.stripe_id, {
      cancel_at_period_end: false,
    });
    await db('subscriptions')
      .where({
        stripe_id: subscription.stripe_id,
      })
      .update({
        ends_at: null,
      });

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};
