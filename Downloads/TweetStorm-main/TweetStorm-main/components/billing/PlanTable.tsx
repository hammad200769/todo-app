'use client';
import { useSubscription } from '@/hooks/swr';
import { SUBSCRIPTION_NAME } from '@/types/types';
import {
  pricingBulkActionsFeatures,
  pricingCoreFeatures,
  pricingScreenshotFeatures,
} from '@/utils/constants';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import AlreadySubscribedButton from './AlreadySubscribedButton';
import CancelledSubscription from './CancelledSubscription';
import RenderFeatureSection from './RenderFeatureSection';
import SubscribeButton from './SubscribeButton';
import UpdateSubscriptionButton from './UpdateSubscriptionButton';

type PlanTableProps = {
  plans: SUBSCRIPTION_NAME[];
};

function PlanTable({ plans }: PlanTableProps) {
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    core: true,
    bulk: true,
    screenshot: true,
  });

  useEffect(() => {
    const hasSubscription = Boolean(subscription);
    setExpandedSections({
      core: !hasSubscription,
      bulk: !hasSubscription,
      screenshot: !hasSubscription,
    });
  }, [subscription]);

  function toggleSection(section: string) {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
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

  function shouldShowUpdateSubscriptionButton(
    currentSubscriptionName: SUBSCRIPTION_NAME,
    activeSubscriptionName: SUBSCRIPTION_NAME | null
  ): boolean {
    if (
      currentSubscriptionName === SUBSCRIPTION_NAME.Pro &&
      activeSubscriptionName !== currentSubscriptionName &&
      activeSubscriptionName === SUBSCRIPTION_NAME.Agency
    ) {
      return true;
    }
    if (
      currentSubscriptionName === SUBSCRIPTION_NAME.Agency &&
      activeSubscriptionName !== currentSubscriptionName &&
      activeSubscriptionName === SUBSCRIPTION_NAME.Pro
    ) {
      return true;
    }
    return false;
  }

  function renderActionButton(planName: SUBSCRIPTION_NAME) {
    const activeSubscriptionName = subscription?.name || null;
    const isCancelled = subscription?.status === 'cancelled';
    const isPastDue = subscription?.status === 'past_due';
    if (!activeSubscriptionName) {
      return (
        <div className='space-y-3'>
          <SubscribeButton subscriptionName={planName} />
          <p className='text-center text-xs text-gray-500 dark:text-gray-400 font-medium'>
            Cancel Anytime
          </p>
        </div>
      );
    }

    if (activeSubscriptionName === planName && isCancelled) {
      return <CancelledSubscription />;
    }

    if (activeSubscriptionName === planName && !isCancelled && !isPastDue) {
      return <AlreadySubscribedButton table={true} />;
    } else if (activeSubscriptionName === planName && isPastDue) {
      return (
        <>
          <AlreadySubscribedButton table={true} />
          <p className='text-center text-base text-red-500 dark:text-red-400 font-medium'>
            Payment <b>Past Due</b>.
          </p>
        </>
      );
    }

    if (shouldShowUpdateSubscriptionButton(planName, activeSubscriptionName)) {
      return (
        <UpdateSubscriptionButton
          table={true}
          updateTo={planName}
          status={subscription?.status!}
          updateType={
            planName === SUBSCRIPTION_NAME.Pro ? 'downgrade' : 'upgrade'
          }
        />
      );
    }

    return null;
  }

  return (
    <div className='max-w-7xl mx-auto mt-3'>
      <div className='sticky top-0 z-2 bg-soft-white dark:bg-primary-dark-light'>
        <div className='grid grid-cols-3 gap-3'>
          <div className='p-6'></div>

          {plans.map(planName => {
            return (
              <div
                key={planName}
                className={clsx(
                  'relative px-3 pb-2 text-center rounded-2xl',
                  planName === SUBSCRIPTION_NAME.Agency && 'mr-7'
                )}
              >
                <div className='space-y-3'>
                  <div>
                    <h3 className='text-lg xl:text-xl font-bold mb-2 text-gray-900 dark:text-gray-100'>
                      {getSubscriptionTitle(planName)}
                    </h3>

                    <div className='flex items-baseline justify-center'>
                      <span
                        className='text-3xl font-bold 
                             bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent'
                      >
                        ${getSubscriptionCost(planName)}
                      </span>
                      <span className='text-sm ml-2 font-semibold text-gray-500 dark:text-gray-400'>
                        /month
                      </span>
                    </div>
                  </div>

                  {renderActionButton(planName)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        {RenderFeatureSection(
          pricingCoreFeatures,
          'Core Features',
          'core',
          toggleSection,
          plans,
          expandedSections,
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}

        {RenderFeatureSection(
          pricingBulkActionsFeatures,
          'Bulk Actions',
          'bulk',
          toggleSection,
          plans,

          expandedSections,
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
        )}

        {RenderFeatureSection(
          pricingScreenshotFeatures,
          'Tweet Screenshots',
          'screenshot',
          toggleSection,
          plans,

          expandedSections,
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default PlanTable;
