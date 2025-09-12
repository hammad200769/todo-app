import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import {
  getDomain,
  getProtocol,
  getStripe,
  jsonErrorResponse,
} from '@/api-utils/utils';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut, [auth]);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const stripe = getStripe();
    const domain = getDomain();
    const protocol = getProtocol();
    const token = (await getToken({ req: request as NextRequest }))!;
    const user = await db('users')
      .where({ id: token.id })
      .select('id', 'stripe_id')
      .first();
    if (!user)
      return jsonErrorResponse('user-not-found', 'User not found', 404);

    const subscription = await getActiveUserSubscription(user.id, [
      'stripe_id',
      'stripe_status',
    ]);
    if (!subscription)
      return jsonErrorResponse(
        'no-active-subscription-found',
        'No Active Subscription found',
        404
      );

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'setup',
        customer: user.stripe_id as string,
        setup_intent_data: {
          metadata: {
            customer_id: user.stripe_id,
            subscription_id: subscription.stripe_id,
          },
        },
        success_url: `${protocol}://${domain}/billing?paymentUpdate=success`,
        cancel_url: `${protocol}://${domain}/billing?PaymentUpdate=canceled`,
        currency: 'USD',
      });
      return NextResponse.json({ sessionId: session.id });
    } catch (err) {
      return jsonErrorResponse(
        'error-creating-checkout-session',
        `Error creating checkout session: ${err}`,
        500
      );
    }
  } catch (err) {
    return next(err);
  }
};
