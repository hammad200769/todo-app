import db from '@/DB/db';
import { handleServerError } from '@/middlewares';
import { Subscription } from '@/types/database';
import { SUBSCRIPTION_STATUS } from '@/utils/constants';
import Stripe from 'stripe';
import { FALLBACK_PRICE_ID } from '../constants';
import { getPlanByPriceId } from '../database/plans';
import { getSubscriptionByStripeId } from '../database/subscriptions';
import { getStripe } from '../utils';

export async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  // update the subscription database and also the users database (for billing details)
  const sessionData = event.data.object;
  const stripe = getStripe();

  if (sessionData.status === 'complete') {
    if (sessionData.mode === 'subscription') {
      const customer = (await stripe.customers.retrieve(
        sessionData.customer as string
      )) as Stripe.Customer;

      // TODO: we fetch using customer id?
      const user = await db('users')
        .where({ email: customer.email })
        .select('id')
        .first();

      if (!user) {
        throw new Error('User not found');
      }

      const stripeSubscription = (await stripe.subscriptions.retrieve(
        sessionData.subscription as string
      )) as Stripe.Subscription;

      const {
        current_period_start,
        current_period_end,
        id: subscriptionId,
        cancel_at,
        status: subscriptionStatus,
      } = stripeSubscription;

      if (
        [
          SUBSCRIPTION_STATUS.Incomplete,
          SUBSCRIPTION_STATUS.IncompleteExpired,
        ].includes(subscriptionStatus as any)
      ) {
        return;
      }

      const databaseSubscription = await getSubscriptionByStripeId(
        subscriptionId,
        ['stripe_id']
      );
      const subscriptionPriceId = stripeSubscription.items.data[0].price.id;

      const plan = await getPlanByPriceId(subscriptionPriceId, ['id']);
      if (databaseSubscription) {
        await db('subscriptions')
          .where({
            stripe_id: subscriptionId,
          })
          .update({
            ...(plan ? { plan_id: plan.id } : {}),
            stripe_price: subscriptionPriceId,
            stripe_status: subscriptionStatus,
            current_period_start: new Date(current_period_start * 1000),
            current_period_end: new Date(current_period_end * 1000),
            ends_at: cancel_at ? new Date(cancel_at * 1000) : null,
            updated_at: new Date(),
          });
      } else {
        const subscriptionData: Omit<Subscription, 'id' | 'ends_at'> = {
          stripe_id: sessionData.subscription as string,
          stripe_status: stripeSubscription.status,
          user_id: user.id,
          stripe_price: subscriptionPriceId,
          created_at: new Date(),
          updated_at: new Date(),
          current_period_start: new Date(current_period_start * 1000),
          current_period_end: new Date(current_period_end * 1000),
          plan_id: -1,
        };

        if (plan) {
          subscriptionData.plan_id = plan.id;
        } else {
          const fallbackPlan = await getPlanByPriceId(FALLBACK_PRICE_ID, [
            'id',
          ]);

          if (!fallbackPlan) {
            throw new Error('No fallback plan found for the subscription');
          }

          subscriptionData.plan_id = fallbackPlan.id;
        }

        try {
          await db('subscriptions').insert(subscriptionData, ['id']);
        } catch (err: any) {
          if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            // Ignore the error of duplicate entry constraint violation as it is possible that due to a race condition, the record was already created in the customer.subscription.updated event. In this case, we can safely ignore this error.
            handleServerError({
              err,
              key: `checkout.session.completed/ER_DUP_ENTRY/subscriptions/${subscriptionId}`,
              metadata: { sessionData },
            });
          } else {
            throw err;
          }
        }
      }

      if (!plan) {
        throw new Error('No plan found for the subscription');
      }
    } else if (sessionData.mode === 'setup') {
      const setupIntent = (await stripe.setupIntents.retrieve(
        sessionData.setup_intent as string
      )) as Stripe.SetupIntent;
      const { metadata, payment_method } = setupIntent;
      if (metadata !== null && metadata.subscription_id) {
        await stripe.subscriptions.update(metadata.subscription_id as string, {
          default_payment_method: payment_method as string,
        });
      }
    }
  }
}
