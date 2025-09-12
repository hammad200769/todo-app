'use client';

import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className='max-w-[1320px] mx-auto'>
      <div className='flex-cb py-5'>
        <Link
          href='/'
          className='inline-block text-2xl font-bold leading-none text-white'
        >
          TweetStorm.ai
        </Link>
        <div className='ml-auto lg:hidden'>
          <div
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className='block cursor-pointer text-gray-100 hover:text-blue-500 focus:outline-hidden'
          >
            {isMobileMenuOpen ? (
              <svg
                id='menu_close'
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            ) : (
              <svg
                id='menu_open'
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            )}
          </div>
        </div>
        <nav
          id='menu'
          className={clsx(
            'absolute top-0 text-sm left-0 z-20 mt-24 ml-auto w-full select-none flex-col border-t border-b border-gray-600 bg-gray-900 bg-opacity-95 pt-10 pb-10 space-y-6 lg:space-y-0 lg:relative lg:left-auto lg:mt-0 lg:flex lg:w-3/5 lg:flex-row lg:border-transparent lg:bg-transparent lg:pt-0 lg:pb-0 lg:pl-16',
            isMobileMenuOpen ? '' : 'hidden'
          )}
        >
          <ul className='flex flex-col items-center text-gray-400 space-y-3 lg:space-y-0 lg:space-x-7 lg:flex-row xl:space-x-12'>
            <li>
              <Link
                href={URLS.publicTweetGeneration}
                className='font-semibold hover:text-blue-500'
              >
                AI Tweet Generator
              </Link>
            </li>
            <li>
              <Link
                href='/#features'
                className='font-semibold hover:text-blue-500'
              >
                Features
              </Link>
            </li>
            <li className=''>
              <Link
                href='/#pricing'
                className='font-semibold hover:text-blue-500'
              >
                Pricing
              </Link>
            </li>
            <li className=''>
              <Link
                href={URLS.blog}
                className='font-semibold hover:text-blue-500'
              >
                Blog
              </Link>
            </li>
          </ul>
          <div className='mr-auto ml-auto w-full text-center lg:mr-0 lg:ml-auto lg:w-auto'>
            <Link
              href={URLS.login}
              className='mr-2 inline-block rounded-sm bg-gray-800 px-4 py-3 text-sm font-semibold leading-none text-gray-400 hover:border-gray-300 hover:text-white'
            >
              Log In
            </Link>
            <Link
              href={URLS.signup}
              className='inline-block rounded-sm bg-primary px-4 py-3 text-sm font-semibold leading-none text-white hover:bg-blue-700'
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavigationHeader;
