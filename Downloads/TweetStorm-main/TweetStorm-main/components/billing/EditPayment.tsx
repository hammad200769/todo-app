'use client';
import { put } from '@/utils/utils';
import { loadStripe } from '@stripe/stripe-js';

function EditPayment() {
  async function handleCreateCheckoutSession() {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // TODO: we need some error feedback mechanism
    if (!stripe) return;
    const response = await put('/api/payment-method', {
      body: JSON.stringify({}),
    });
    if (response.ok) {
      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        alert(error);
      }
    } else {
      alert('Error creating billing portal session');
    }
  }
  return (
    <button
      onClick={handleCreateCheckoutSession}
      className='bg-primary mt-5 lg:mt-0 rounded-md h-12 px-7 text-white hover:bg-primary-hover font-semibold cursor-pointer'
    >
      Update Payment Details
    </button>
  );
}

export default EditPayment;
