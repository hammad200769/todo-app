import db from '@/DB/db';
import Stripe from 'stripe';
import { updateBulkRecordForUser } from '../database/bulk-actions-usage';
import { resetCreditsUsage } from '../database/credits-usage';
import { getActiveUserSubscription } from '../database/subscriptions';
import { formatInvoiceAmount } from '../utils';

export async function handleInvoicePaymentSucceeded(
  event: Stripe.InvoicePaymentSucceededEvent
) {
  const invoice = event.data.object;
  const user = await db('users')
    .select('id')
    .where({ stripe_id: invoice.customer })
    .first();
  const finalizedAt = invoice.status_transitions.finalized_at
    ? new Date(invoice.status_transitions.finalized_at * 1000)
    : null;
  await db('receipts')
    .update({
      amount: formatInvoiceAmount(invoice.total),
      tax: `$${invoice.tax ?? '0.00'}`,
      status: invoice.status,
      amount_due: formatInvoiceAmount(invoice.amount_due),
      amount_paid: formatInvoiceAmount(invoice.amount_paid),
      finalized_at: finalizedAt,
      updated_at: new Date(),
    })
    .where({
      provider_id: invoice.id,
    });
  const subscription = await getActiveUserSubscription(user.id, ['stripe_id']);
  if (!subscription) {
    return;
  }
  if (
    subscription.stripe_id === invoice.subscription &&
    (invoice.billing_reason === 'subscription_create' ||
      invoice.billing_reason === 'subscription_cycle')
  ) {
    await updateBulkRecordForUser(Number(user.id), {
      tweet_deletions: 0,
      retweets: 0,
      tweet_likes: 0,
      tweet_unlikes: 0,
      follows: 0,
      unfollows: 0,
      last_reset_on: new Date(),
    });
    await resetCreditsUsage(user.id);
  }
}
