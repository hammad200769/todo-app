'use client';

import { useSubscription } from '@/hooks/swr';
import { URLS } from '@/utils/constants';
import Link from 'next/link';

function LimitedViewMessage() {
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  return subscription === null ? (
    <div className='p-4 mb-6 border-l-4 border-yellow-400 bg-yellow-50 text-center'>
      <div className='flex-cc'>
        <div className='shrink-0'>
          <svg
            className='w-5 h-5 text-yellow-400'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-3'>
          <p className='text-sm text-yellow-700'>
            <b>Free users</b> only see the last 5 searches{' '}
            <Link
              href={URLS.billing}
              className='font-medium text-yellow-700 underline hover:text-yellow-600'
            >
              Upgrade your account to see all historic.
            </Link>
          </p>
        </div>
      </div>
    </div>
  ) : null;
}

export default LimitedViewMessage;
