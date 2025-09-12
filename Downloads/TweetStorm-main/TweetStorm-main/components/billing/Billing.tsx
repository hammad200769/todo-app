'use client';

import AbsentSubscriptionMessage from '@/components/billing/AbsentSubscriptionMessage';
import CancelSubscriptionBlock from '@/components/billing/CancelSubscriptionBlock';
import PaymentsBlock from '@/components/billing/PaymentsBlock';
import ReceiptsBlock from '@/components/billing/ReceiptsBlock';
import ResumeSubscriptionBlock from '@/components/billing/ResumeSubscriptionBlock';
import { useSubscription } from '@/hooks/swr';
import { SUBSCRIPTION_NAME } from '@/types/types';
import { pricingFeatures, screenShotPricingFeatures } from '@/utils/constants';
import { notifySuccess } from '@/utils/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlanTable from './PlanTable';
import SubscriptionPlanCard from './SubscriptionPlanCard';

function Billing() {
  const { data: subscriptionData } = useSubscription();
  const searchParams = useSearchParams();
  const checkoutSearchParam = searchParams?.get('checkout');
  const subscription = subscriptionData?.subscription;

  const [isScreenshotFeaturesExpanded, setIsScreenshotFeaturesExpanded] =
    useState<boolean>(() => {
      if (subscription === undefined) {
        return false;
      }

      if (subscription === null) {
        return true;
      }

      if (
        subscription.status === 'active' ||
        subscription.status === 'past_due'
      ) {
        return false;
      }

      return true;
    });

  useEffect(() => {
    if (subscription === undefined) return;

    if (subscription === null) {
      setIsScreenshotFeaturesExpanded(true);
    } else if (
      subscription.status === 'active' ||
      subscription.status === 'past_due'
    ) {
      setIsScreenshotFeaturesExpanded(false);
    } else {
      setIsScreenshotFeaturesExpanded(true);
    }
  }, [subscription]);

  const isSubscriptionPendingCancelation: boolean =
    (subscription?.status === 'active' ||
      subscription?.status === 'past_due') &&
    subscription.endsAt !== null;

  useEffect(() => {
    if (checkoutSearchParam === 'subscription_started') {
      notifySuccess('Your Subscription has started successfully!');
      if (searchParams) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('checkout');
        window.history.replaceState(
          {},
          '',
          `${window.location.pathname}?${params.toString()}`
        );
      }
    }
  }, [checkoutSearchParam, searchParams]);

  return (
    <div className='min-h-screen relative text-left max-w-7xl pb-[30px] lg:pb-16 mx-auto px-[40px]'>
      <h3 className='text-2xl'>Subscription</h3>
      {subscription === null && <AbsentSubscriptionMessage />}

      {subscription !== undefined ? (
        <div className='mt-5 flex-col gap-5 max-[796px]:flex hidden '>
          {Object.values(SUBSCRIPTION_NAME).map(planName => (
            <SubscriptionPlanCard
              key={planName}
              subscriptionName={planName}
              activeSubscriptionName={subscription?.name || null}
              subscriptionFeatures={pricingFeatures[planName] || []}
              scFeatures={screenShotPricingFeatures[planName] || []}
              subscriptionCost={getSubscriptionCost(planName)}
              subscriptionTitle={getSubscriptionTitle(planName)}
              isCancelled={subscription?.status === 'cancelled'}
              status={subscription?.status}
              isScreenshotFeaturesExpanded={isScreenshotFeaturesExpanded}
              setIsScreenshotFeaturesExpanded={setIsScreenshotFeaturesExpanded}
            />
          ))}
        </div>
      ) : null}

      <span className='block max-[796px]:hidden'>
        <PlanTable plans={Object.values(SUBSCRIPTION_NAME)} />
      </span>

      {!!subscription && isSubscriptionPendingCancelation ? (
        <ResumeSubscriptionBlock />
      ) : null}

      <PaymentsBlock />

      {!!subscription && !isSubscriptionPendingCancelation ? (
        <CancelSubscriptionBlock />
      ) : null}

      <ReceiptsBlock />
    </div>
  );
}

function getSubscriptionCost(planName: SUBSCRIPTION_NAME): string {
  const costs = {
    [SUBSCRIPTION_NAME.Pro]: '12',
    [SUBSCRIPTION_NAME.Agency]: '29',
  };
  return costs[planName] || '0';
}

function getSubscriptionTitle(planName: SUBSCRIPTION_NAME): string {
  const titles = {
    [SUBSCRIPTION_NAME.Pro]: 'Professional',
    [SUBSCRIPTION_NAME.Agency]: 'Agency',
  };
  return titles[planName] || planName;
}

export default Billing;
