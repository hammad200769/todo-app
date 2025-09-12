'use client';

import { SUBSCRIPTION_NAME } from '@/types/types';
import { loadStripe } from '@stripe/stripe-js';

type SubscribeButtonProps = {
  subscriptionName: SUBSCRIPTION_NAME;
};

function SubscribeButton({ subscriptionName }: SubscribeButtonProps) {
  async function handleCreateCheckoutSession() {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // TODO: we need some error feedback mechanism
    if (!stripe) return;

    const response = await fetch('/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        subscriptionName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.data });
  }

  return (
    <button
      onClick={handleCreateCheckoutSession}
      className='bg-primary w-full rounded-md py-[10px] px-6 text-white hover:bg-primary-hover font-semibold cursor-pointer'
    >
      Subscribe
    </button>
  );
}

export default SubscribeButton;
