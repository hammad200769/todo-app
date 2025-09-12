import { LogoutIcon, ProfileIcon, WalletIcon } from '@/components/icons';
import { withOutsideClickDetector } from '@/hocs';
import { URLS } from '@/utils/constants';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function AccountDropDown() {
  return (
    <div className='absolute z-50 mt-2 w-48 rounded-md shadow-lg origin-top-right right-0'>
      <div className='rounded-md ring-1 dark:bg-primary-dark ring-black ring-opacity-5 py-1 bg-white'>
        <Link
          href={URLS.profile}
          className='flex-c gap-4 px-4 py-2 leading-5 hover:bg-gray-100 dark:hover:bg-primary-dark-light focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 transition cursor-pointer'
        >
          <ProfileIcon />
          <span>Profile</span>
        </Link>
        <Link
          href={URLS.billing}
          className='flex-c gap-4 px-4 py-2 leading-5 hover:bg-gray-100 dark:hover:bg-primary-dark-light focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 transition cursor-pointer'
        >
          <WalletIcon />
          <span>Billing</span>
        </Link>

        <button
          className='flex-c w-full cursor-pointer gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-dark-light focus:bg-gray-100 dark:focus:bg-gray-700 transition'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogoutIcon />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default withOutsideClickDetector(AccountDropDown);
