import { getAbsoluteUrl } from '@/api-utils/utils';
import Billing from '@/components/billing/Billing';
import Toast from '@/components/common/Toast';
import { withAuthenticationProtection } from '@/hocs';
import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'TweetStorm billing',
  alternates: {
    canonical: getAbsoluteUrl(URLS.billing),
  },
};

function BillingPage() {
  return (
    <div
      className={clsx(
        'lg:min-h-screen bg-soft-white dark:bg-primary-dark-light'
      )}
    >
      <Suspense>
        <Billing />
        <Toast />
      </Suspense>
    </div>
  );
}

export default withAuthenticationProtection(BillingPage);
