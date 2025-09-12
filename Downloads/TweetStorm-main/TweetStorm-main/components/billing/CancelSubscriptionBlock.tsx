'use client';

import { useSubscription } from '@/hooks/swr';
import CancelSubscriptionButton from './CancelSubscriptionButton';

function CancelSubscriptionBlock() {
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  const isSubscriptionPendingCancelation: boolean =
    subscription?.status === 'active' && subscription.endsAt !== null;

  return (
    !!subscription &&
    !isSubscriptionPendingCancelation && (
      <div className='mt-12'>
        <h2 className='text-2xl'>Cancel Subscription</h2>
        <div className='bg-white dark:bg-primary-dark shadow-sm sm:rounded-lg p-6 mt-4'>
          <p className='text-sm mb-4'>
            You may cancel your subscription at any time. Once your subscription
            has been cancelled, you will have the option to resume the
            subscription until the end of your current billing cycle.
          </p>
          <CancelSubscriptionButton />
        </div>
      </div>
    )
  );
}

export default CancelSubscriptionBlock;
