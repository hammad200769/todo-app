import {
  handleCheckoutSessionCompleted,
  handleCustomerDeleted,
  handleInvoicePaymentSucceeded,
  handlePaymentMethodAttached,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from '@/api-utils/stripe-webhook';
import { handleInvoiceCreated } from '@/api-utils/stripe-webhook/handle-invoice-created';
import { handleInvoiceFinalizedFailed } from '@/api-utils/stripe-webhook/handle-invoice-finalized-failed';
import { handleInvoiceUpdated } from '@/api-utils/stripe-webhook/handle-invoice-updated';
import { getStripe, serverErrorResponse } from '@/api-utils/utils';
import { handleServerError } from '@/middlewares';

export async function POST(request: Request) {
  let event;
  try {
    const stripe = getStripe();
    const sig = request.headers.get('stripe-signature')!;
    const payload = await request.text();

    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    handleServerError({ err, key: 'webhook-error' });
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await handleCheckoutSessionCompleted(event);
    } else if (event.type === 'customer.subscription.updated') {
      await handleSubscriptionUpdated(event);
    } else if (event.type === 'customer.subscription.deleted') {
      await handleSubscriptionDeleted(event);
    } else if (event.type === 'invoice.created') {
      await handleInvoiceCreated(event);
    } else if (event.type === 'invoice.payment_succeeded') {
      await handleInvoicePaymentSucceeded(event);
    }
    // else if (event.type === 'invoice.payment_failed') {
    //   await handleInvoicePaymentFailed(event);
    //  }
    else if (event.type === 'invoice.updated') {
      await handleInvoiceUpdated(event);
    } else if (event.type === 'invoice.finalization_failed') {
      await handleInvoiceFinalizedFailed(event);
    } else if (event.type === 'payment_method.attached') {
      await handlePaymentMethodAttached(event);
    } else if (event.type === 'customer.deleted') {
      await handleCustomerDeleted(event);
    }
    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    handleServerError({
      err,
      key: `${event.type}`,
      subject: 'Error in Stripe Webhook event: ' + event.type,
      metadata: {
        event: event.type,
        eventObject: JSON.stringify(event.data.object),
      },
    });
    return serverErrorResponse(`Error handling webhook event: ${event.type}`);
  }
}
