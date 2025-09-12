'use client';

import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { DropDownIcon } from '../../icons';
import DarkModeToggle from '../DarkModeToggle';
import GenerationsSubmenu from './GenerationsSubmenu';
import MobileNavigation from './MobileNavigation';

function NavigationMenu() {
  const [isGenerationsSubMenuOpen, setIsGenerationsSubMenuOpen] =
    useState<boolean>(false);

  function onGenerateMoreButtonClick() {
    if (!isGenerationsSubMenuOpen) {
      setIsGenerationsSubMenuOpen(true);
    }
  }

  return (
    <header className='max-w-[1320px] mx-auto'>
      <div className='flex-c py-3'>
        <Link
          href='/'
          className='text-lg sm:text-2xl font-bold text-primary-dark dark:text-white'
        >
          TweetStorm.ai
        </Link>
        <MobileNavigation />
        <nav className='hidden lg:flex grow lg:justify-between gap-0 select-none'>
          <ul className='flex items-center mx-auto space-y-0 space-x-8 xl:space-x-10'>
            <li>
              <Link
                href={URLS.publicTweetGeneration}
                className='font-medium hover:text-primary-dark dark:hover:text-white'
              >
                Tweet Generator
              </Link>
            </li>
            <li onClick={onGenerateMoreButtonClick}>
              <div
                className='relative'
                onMouseOver={() => setIsGenerationsSubMenuOpen(true)}
                onMouseOut={() => setIsGenerationsSubMenuOpen(false)}
              >
                <button
                  className={clsx(
                    'flex-cc hover:cursor-pointer cursor-pointer',
                    isGenerationsSubMenuOpen && 'text-black dark:text-white'
                  )}
                >
                  <span className='font-medium hover:text-primary-dark dark:hover:text-white'>
                    More
                  </span>
                  <DropDownIcon />
                </button>
                {isGenerationsSubMenuOpen && (
                  <div className='absolute left-1/2 transform -translate-x-1/2 pt-3'>
                    <GenerationsSubmenu />
                  </div>
                )}
              </div>
            </li>

            <li className='hidden 2xl:block'>
              <Link
                href={URLS.publicTweetSearch}
                className='font-medium hover:text-primary-dark dark:hover:text-white'
              >
                Tweet Search
              </Link>
            </li>

            <li>
              <Link
                href={URLS.pricing}
                className='font-medium hover:text-primary-dark dark:hover:text-white'
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href={URLS.blog}
                className='font-medium hover:text-primary-dark dark:hover:text-white'
              >
                Blog
              </Link>
            </li>
          </ul>
          <div className='mr-3 flex-cc'>
            <DarkModeToggle />
          </div>
          <div className='text-center w-auto'>
            <Link
              href={URLS.login}
              className='mr-2 inline-block rounded-sm px-4 py-3 font-semibold'
            >
              Log In
            </Link>
            <Link
              href={URLS.signup}
              className='rounded-sm inline-block bg-primary px-4 py-3 font-semibold leading-none text-white hover:bg-primary-hover link-anim'
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavigationMenu;
