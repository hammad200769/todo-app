import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import { formatInvoiceAmount, getStripe } from '@/api-utils/utils';
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
      'ends_at',
      'stripe_status',
      'current_period_end',
    ]);

    if (
      subscription?.stripe_status === 'active' ||
      subscription?.stripe_status === 'past_due'
    ) {
      const stripe = getStripe();

      // TODO: handle non existent subscription error.

      const nextPaymentDate = new Date(Number(subscription.current_period_end));

      const user = (await await db('users')
        .where({
          id: token.id,
        })
        .select('stripe_id')
        .first())!;

      // if subscription is marked for cancellation, then there is no upcoming invoice
      if (subscription.ends_at !== null) {
        return Response.json({
          nextPayment: null,
        });
      }

      const nextInvoice = await stripe.invoices.retrieveUpcoming({
        customer: user.stripe_id!,
        subscription: subscription.stripe_id,
      });

      return Response.json({
        nextPayment: {
          date: nextPaymentDate,
          amount: formatInvoiceAmount(nextInvoice.amount_due),
        },
      });
    } else {
      return Response.json({
        nextPayment: null,
      });
    }
  } catch (err) {
    return next(err);
  }
};
