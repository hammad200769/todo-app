import db from '@/DB/db';
import Stripe from 'stripe';

export async function handleCustomerDeleted(
  event: Stripe.CustomerDeletedEvent
) {
  const customer = event.data.object;
  const user = await db('users')
    .where({ stripe_id: customer.id })
    .select('id')
    .first();
  if (user) {
    await db('users').where({ id: user.id }).update({
      stripe_id: null,
    });
  }
}
