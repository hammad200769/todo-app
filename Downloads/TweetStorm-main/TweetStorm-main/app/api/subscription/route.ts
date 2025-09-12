import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import {
  getPriceId,
  getStripe,
  getSubscriptionName,
  jsonErrorResponse,
  jsonErrorResponse__New,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest, handleServerError } from '@/middlewares';
import { Subscription } from '@/types/database';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { ERROR_TYPE } from '@/types/types';
import { SUBSCRIPTION_STATUS } from '@/utils/constants';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};
const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'id',
      'stripe_status',
      'stripe_price',
      'ends_at',
      'stripe_id',
      'current_period_start',
      'current_period_end',
    ]);

    if (!subscription) {
      return Response.json({ subscription: null });
    }

    return Response.json({
      subscription: {
        id: subscription.id.toString(),
        name: getSubscriptionName(subscription.stripe_price!),
        status: subscription.stripe_status,
        endsAt: subscription.ends_at,
        currentPeriodEnd: subscription.current_period_end,
        currentPeriodStart: subscription.current_period_start,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut, [auth]);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.updateSubscription.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'stripe_id',
      'stripe_status',
    ]);
    if (!subscription) {
      return jsonErrorResponse(
        ERROR_TYPE.NoActiveSubscription,
        'User does not have any active subscription',
        400
      );
    }

    const stripe = getStripe();
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_id
    );

    const currentSubscriptionItemId = stripeSubscription.items.data[0].id;

    // for past_due status, we cancel current subscription and create new subscription.
    if (stripeSubscription.status === SUBSCRIPTION_STATUS.PastDue) {
      const subscription = await stripe.subscriptions.create({
        customer: stripeSubscription.customer as string,
        proration_behavior: 'always_invoice',
        default_payment_method:
          stripeSubscription.default_payment_method as string,
        items: [
          {
            price: getPriceId(body.subscriptionName),
            quantity: 1,
          },
        ],
      });

      if (subscription.status === SUBSCRIPTION_STATUS.Incomplete) {
        const latestInvoice = await stripe.invoices.retrieve(
          subscription.latest_invoice as string,
          { expand: ['payment_intent'] }
        );

        const paymentIntent =
          latestInvoice.payment_intent as Stripe.PaymentIntent;

        const errorMessage = paymentIntent.last_payment_error?.message
          ? paymentIntent.last_payment_error.message +
            ' Please try updating your card.'
          : 'There was an issue while creating the new subscription because of an issue with your card. Please try updating your card.';

        return jsonErrorResponse__New(404, errorMessage);
      }

      const cancelSubscription = await stripe.subscriptions.cancel(
        stripeSubscription.id
      );
      await db('subscriptions')
        .where({ stripe_id: stripeSubscription.id })
        .update({
          stripe_status: cancelSubscription.status,
        });

      const subscriptionPriceId = subscription.items.data[0].price.id;
      const plan = await db('plans')
        .where({ stripe_price_id: subscriptionPriceId })
        .select('id')
        .first();

      await db('subscriptions').insert({
        user_id: token.id,
        stripe_id: subscription.id,
        stripe_status: subscription.status,
        stripe_price: subscriptionPriceId,
        current_period_start: new Date(
          subscription.current_period_start * 1000
        ),
        current_period_end: new Date(subscription.current_period_end * 1000),
        created_at: new Date(),
        updated_at: new Date(),
        plan_id: plan.id,
      });

      return new Response(null, { status: 204 });
    }

    const updatedSubscription = await stripe.subscriptions.update(
      subscription.stripe_id,
      {
        proration_behavior: 'always_invoice',
        items: [
          {
            id: currentSubscriptionItemId,
            deleted: true,
          },
          {
            price: getPriceId(body.subscriptionName),
            quantity: 1,
          },
        ],
        cancel_at_period_end: false,
      }
    );

    const subscriptionItems = updatedSubscription.items.data;
    const newSubscriptionItemId = subscriptionItems[0].price.id;

    const plan = await db('plans')
      .where({ stripe_price_id: newSubscriptionItemId })
      .select('id')
      .first();

    const updatedSubscriptionData: Omit<
      Subscription,
      'id' | 'user_id' | 'created_at' | 'stripe_id' | 'plan_id'
    > & { plan_id?: Subscription['plan_id'] } = {
      stripe_status: updatedSubscription.status,
      stripe_price: newSubscriptionItemId,
      ends_at: null,
      current_period_start: new Date(
        updatedSubscription.current_period_start * 1000
      ),
      current_period_end: new Date(
        updatedSubscription.current_period_end * 1000
      ),
      updated_at: new Date(),
    };

    if (!plan) {
      await db('subscriptions')
        .where({
          stripe_id: subscription.stripe_id,
        })
        .update(updatedSubscriptionData);
      handleServerError({
        err: new Error(
          'No pricing plan was found corresponding to this subscription'
        ),
        key: 'api/subscription/no-plan-found',
        metadata: {
          newSubscriptionItemId,
        },
      });

      return jsonErrorResponse__New(
        409,
        'No pricing plan was found corresponding to this subscription'
      );
    } else {
      updatedSubscriptionData.plan_id = plan.id;

      await db('subscriptions')
        .where({ stripe_id: subscription.stripe_id })
        .update(updatedSubscriptionData);
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};

export const DELETE: RouteInitiator = (...params) => {
  return handleRequest(params, handleDelete, [auth]);
};

const handleDelete: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'stripe_id',
      'ends_at',
    ]);

    if (!subscription) {
      return Response.json(
        { message: 'User does not have any active subscriptions' },
        {
          status: 400,
        }
      );
    }

    if (subscription.ends_at !== null) {
      return jsonErrorResponse(
        ERROR_TYPE.DisallowedSubscriptionUpdate,
        'Subscription is already marked for cancelation.',
        400
      );
    }

    const stripe = getStripe();

    const updatedSubscription = await stripe.subscriptions.update(
      subscription.stripe_id,
      {
        //  subscription will be cancelled at the end of the current billing cycle.
        cancel_at_period_end: true,
      }
    );

    await db('subscriptions')
      .where({
        stripe_id: subscription.stripe_id,
      })
      .update({
        ends_at: new Date(updatedSubscription.cancel_at! * 1000),
        updated_at: new Date(),
      });

    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    return next(err);
  }
};
