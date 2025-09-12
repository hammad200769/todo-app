'use client';

import { useCredits, useSubscription } from '@/hooks/swr';
import { MONTHS_SHORT } from '@/utils/constants';
import clsx from 'clsx';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS_SHORT[date.getMonth()];

  return `${day} ${month}`;
}

const currentDate = new Date();

const startOfNextMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  1
);

function RemainingCreditsBlock() {
  const { data: creditsData } = useCredits();
  const { data: subscriptionData } = useSubscription();
  const credits = creditsData?.credits;
  const subscription = subscriptionData?.subscription;

  return (
    subscription !== undefined &&
    credits !== undefined && (
      <div
        className={clsx(
          'inline-flex items-center gap-x-1 rounded-full border px-3 py-0.5 font-medium',
          subscription === null
            ? 'border-green-200 bg-green-100 text-green-800'
            : 'border-yellow-400 bg-yellow-100 text-yellow-800'
        )}
      >
        {<span> {credits.count} Credits </span>}
        {subscription !== null ? (
          <span className='italic'>
            (renews on {formatDate(subscription.currentPeriodEnd)})
          </span>
        ) : (
          <span className='italic'>
            (renews on {formatDate(startOfNextMonth.toISOString())})
          </span>
        )}
      </div>
    )
  );
}

export default RemainingCreditsBlock;
