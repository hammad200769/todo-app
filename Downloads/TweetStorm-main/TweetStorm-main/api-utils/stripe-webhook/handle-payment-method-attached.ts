import db from '@/DB/db';
import Stripe from 'stripe';
import { getStripe } from '../utils';

export async function handlePaymentMethodAttached(
  event: Stripe.PaymentMethodAttachedEvent
) {
  const stripe = getStripe();
  const paymentMethod = event.data.object;
  const customer = (await stripe.customers.retrieve(
    paymentMethod.customer as string
  )) as Stripe.Customer;

  if (paymentMethod.card) {
    await db('users')
      .where({
        stripe_id: paymentMethod.customer as string,
        email: customer.email,
      })
      .update({
        pm_type: paymentMethod.card.brand,
        pm_last_four: paymentMethod.card.last4,
        pm_expiration: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
      });
  }
}
