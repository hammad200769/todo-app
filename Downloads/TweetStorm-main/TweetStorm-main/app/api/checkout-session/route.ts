import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import {
  getDomain,
  getPriceId,
  getProtocol,
  getStripe,
  jsonErrorResponse__New,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.createCheckoutSession.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;

    const stripe = getStripe();
    const domain = getDomain();
    const protocol = getProtocol();

    const user = (await db('users')
      .where({ id: token.id })
      .select('id', 'email', 'stripe_id')
      .first())!;

    let customerId: string = '';
    if (user.stripe_id) {
      customerId = user.stripe_id;
    } else {
      // Create stripe customer if it does not exist
      const customer = await stripe.customers.create({
        email: user.email,
      });

      await db('users')
        .where({ id: user.id })
        .update({ stripe_id: customer.id });

      customerId = customer.id;
    }

    const subscription = await getActiveUserSubscription(user.id, [
      'stripe_status',
    ]);

    if (subscription) {
      return jsonErrorResponse__New(
        409,
        'A subscription is already active for this user. Cannot buy multiple subscriptions.'
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: getPriceId(body.subscriptionName),
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${protocol}://${domain}/billing?checkout=subscription_started`,
      cancel_url: `${protocol}://${domain}/billing?checkout=subscription_failed`,
    });

    return NextResponse.json({ data: session.id });
  } catch (err) {
    return next(err);
  }
};
