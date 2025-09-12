import db from '@/DB/db';
import { handleServerError } from '@/middlewares';
import { Subscription } from '@/types/database';
import { SUBSCRIPTION_STATUS } from '@/utils/constants';
import Stripe from 'stripe';
import { FALLBACK_PRICE_ID } from '../constants';
import { getPlanByPriceId } from '../database/plans';
import { getSubscriptionByStripeId } from '../database/subscriptions';

export async function handleSubscriptionUpdated(
  event: Stripe.CustomerSubscriptionUpdatedEvent
) {
  const stripeSubscription = event.data.object;

  const {
    current_period_start,
    current_period_end,
    cancel_at,
    status,
    id,
    customer,
  } = stripeSubscription;

  if (
    [
      SUBSCRIPTION_STATUS.Incomplete,
      SUBSCRIPTION_STATUS.IncompleteExpired,
    ].includes(status as any)
  ) {
    return;
  }

  const subscriptionPriceId = stripeSubscription.items.data[0].price.id;

  const databaseSubscription = await getSubscriptionByStripeId(id, [
    'stripe_id',
    'user_id',
  ]);

  const plan = await getPlanByPriceId(subscriptionPriceId, ['id']);

  if (databaseSubscription) {
    await db('subscriptions')
      .where({ stripe_id: id })
      .update({
        ...(plan ? { plan_id: plan.id } : {}),
        stripe_price: subscriptionPriceId,
        stripe_status: status,
        current_period_start: new Date(current_period_start * 1000),
        current_period_end: new Date(current_period_end * 1000),
        ends_at: cancel_at ? new Date(cancel_at * 1000) : null,
        updated_at: new Date(),
      });
  } else {
    // The subscription record may not have been added yet because of stripe does not guarantee any event ordering. So insert subscription in this case.
    const user = await db('users')
      .where({ stripe_id: customer })
      .select('id')
      .first();

    if (!user) throw new Error('User not found');

    const subscriptionData: Omit<Subscription, 'id' | 'ends_at'> = {
      stripe_id: id,
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
      const fallbackPlan = await getPlanByPriceId(FALLBACK_PRICE_ID, ['id']);

      if (!fallbackPlan) {
        throw new Error('No plan found for the subscription');
      }

      subscriptionData.plan_id = fallbackPlan.id;
    }

    try {
      await db('subscriptions').insert(subscriptionData);
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        // Ignore the error of duplicate entry constraint violation as it is possible that due to a race condition, the record was already created in the checkout.session.completed event. In this case, we can safely ignore this error.
        handleServerError({
          err,
          key: `customer.subscription.updated/ER_DUP_ENTRY/subscriptions/${id}`,
        });
      } else {
        throw err;
      }
    }
  }

  if (!plan) {
    throw new Error('No plan found for the subscription');
  }
}
