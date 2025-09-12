import db from '@/DB/db';
import { Subscription } from '@/types/database';

export async function getActiveUserSubscription(
  userId: number | bigint,
  columnsToSelect: Array<string> = []
): Promise<Subscription | undefined> {
  const subscriptions = await db('subscriptions')
    .where({ user_id: userId })
    .whereIn('stripe_status', ['active', 'past_due'])
    .select(columnsToSelect.length > 0 ? columnsToSelect : '*');
  return subscriptions[0];
}

export function getSubscriptionByStripeId(
  stripeId: string,
  columnsToSelect: Array<string> = []
): Promise<any> {
  return db('subscriptions')
    .where({ stripe_id: stripeId })
    .select(columnsToSelect)
    .first();
}
