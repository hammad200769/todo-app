import db from '@/DB/db';
import Stripe from 'stripe';
import { updateBulkRecordForUser } from '../database/bulk-actions-usage';
import { resetCreditsUsage } from '../database/credits-usage';
import { getStripe } from '../utils';

export async function handleSubscriptionDeleted(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  const stripeSubscription = event.data.object;
  const stripe = getStripe();
  await db('subscriptions').where({ stripe_id: stripeSubscription.id }).update({
    stripe_status: stripeSubscription.status,
  });
  const invoices = await db('receipts').select('provider_id').where({
    subscription_id: stripeSubscription.id,
    status: 'open',
  });
  const databaseSubscription = await db('subscriptions')
    .select('user_id')
    .where({ stripe_id: stripeSubscription.id })
    .first();
  await updateBulkRecordForUser(Number(databaseSubscription.user_id), {
    tweet_deletions: 0,
    retweets: 0,
    tweet_likes: 0,
    tweet_unlikes: 0,
    follows: 0,
    unfollows: 0,
    last_reset_on: new Date(),
  });
  for (const invoice of invoices) {
    await stripe.invoices.voidInvoice(invoice.provider_id);
  }
  await resetCreditsUsage(databaseSubscription.user_id);
}
