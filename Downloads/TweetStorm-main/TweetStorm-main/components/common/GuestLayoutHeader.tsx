'use client';

import Image from 'next/image';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

function GuestLayoutHeader() {
  return (
    <header className='dark:bg-primary-dark flex justify-between py-2 px-6 sm:px-12 shadow-[#00000040_0px_2px_3px]'>
      <Link href='/' className='flex-c w-max gap-x-2 text-xl'>
        <Image
          src={'/android-chrome-192x192.png'}
          width={40}
          height={40}
          alt='TweetStorm logo'
        />
        <span className='inline-block font-extrabold mt-1 leading-none dark:text-white'>
          TweetStorm
        </span>
      </Link>

      <DarkModeToggle />
    </header>
  );
}

export default GuestLayoutHeader;
