'use client';

import { HamburgerIcon } from '@/components/icons';
import { useSubscription } from '@/hooks/swr';
import logo from '@/public/android-chrome-512x512.png';
import { SUBSCRIPTION_NAME } from '@/types/types';
import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import PrivateNavigationProfilePic from './PrivateNavigationProfilePic';
import RemainingCreditsBlock from './RemainingCreditsBlock';

type PrivatePageHeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

function PrivatePageHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}: PrivatePageHeaderProps) {
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  let activeSubscriptionName: null | SUBSCRIPTION_NAME = null;

  if (!!subscription) {
    activeSubscriptionName = subscription.name;
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <header className='bg-white border-b dark:bg-primary-dark dark:border-0 border-gray-100 relative text-sm'>
      <div className='max-w-7xl mx-auto flex-cb h-16 px-3 lg:px-8'>
        <div className='flex space-x-8'>
          {!isSidebarOpen && (
            <button
              className='flex-cc w-12 h-12 dark:hover:bg-primary-dark-light hover:bg-gray-100'
              onClick={toggleSidebar}
            >
              <HamburgerIcon />
            </button>
          )}
          <Link href='/' className='self-center hidden xs:block'>
            <Image src={logo} className='h-9 w-auto' alt='logo' />
          </Link>
        </div>

        <div className='flex-c space-x-4'>
          {subscription !== undefined && (
            <div className='hidden sm:flex-c space-x-3 xl:ml-6'>
              <div className='hidden lg:block mr-6 lg:ml-4'>
                <DarkModeToggle />
              </div>

              {!subscription && (
                <Link
                  className='px-1 font-medium leading-5 transition text-gray-500 dark:text-soft-white dark:hover:text-primary-light hover:text-neutral-gray focus:text-neutral-gray'
                  href={URLS.billing}
                >
                  🚀 Upgrade to PRO
                </Link>
              )}
              <Link
                href={URLS.billing}
                className={clsx(
                  'rounded-full border px-3 py-0.5 font-medium hidden md:flex-c',
                  subscription === null
                    ? 'border-green-200 bg-green-100 text-green-800'
                    : 'border-yellow-400 bg-yellow-100 text-yellow-800'
                )}
              >
                {activeSubscriptionName === null && 'Free '}
                {activeSubscriptionName !== null &&
                  activeSubscriptionName === SUBSCRIPTION_NAME.Pro &&
                  '✨ Pro '}
                {activeSubscriptionName !== null &&
                  activeSubscriptionName === SUBSCRIPTION_NAME.Agency &&
                  '✨ Agency '}
                plan
              </Link>
            </div>
          )}
          <RemainingCreditsBlock />
          <div className='hidden sm:flex-c shrink-0'>
            <PrivateNavigationProfilePic />
          </div>
        </div>
      </div>
    </header>
  );
}

export default PrivatePageHeader;
