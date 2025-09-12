'use client';

import {
  DropDownIcon,
  HashTagIcon,
  HomeIcon,
  LeftArrowIcon,
  ListIcon,
  LogoutIcon,
  MailIcon,
  ProfileIcon,
  ScreenshotIcon,
  SearchIcon,
  TableIcon,
  TwitterHandleIcon,
  TwitterIconOutlined,
  VideoIcon,
  WalletIcon,
} from '@/components/icons';
import logo from '@/public/android-chrome-512x512.png';
import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function SideBar({ isOpen, setIsOpen }: SideBarProps) {
  const pathname = usePathname();

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsOpen]);

  return (
    <aside
      className={clsx(
        'fixed lg:sticky top-0 bottom-0 text-sm z-10 py-2 dark:bg-primary-dark bg-white w-[240px] h-screen overflow-y-auto shadow-[1px_0px_4px_0px_#bdbdbd] dark:shadow-[1px_0px_4px_0px_#0b0c0d]',
        isOpen ? 'block' : 'hidden'
      )}
      id='dashboard-sidebar'
      aria-label='Sidebar Navigation'
    >
      <div className='flex-cb lg:justify-end px-3'>
        <button
          className='w-12 h-12 flex-cc dark:hover:bg-primary-dark-light hover:bg-gray-100 cursor-pointer'
          onClick={toggleSidebar}
          aria-label='Close sidebar'
        >
          <LeftArrowIcon />
        </button>

        <div className='lg:hidden'>
          <Link href='/'>
            <Image src={logo} className='h-9 w-auto' alt='logo' />
          </Link>
        </div>
        <div className='lg:hidden'>
          <DarkModeToggle />
        </div>
      </div>

      {/* Sidebar Links */}
      <div className='flex flex-col gap-2 mt-4'>
        <div className='px-3'>
          <SidebarLink
            href={URLS.dashboard}
            isActive={!!pathname && isActivePathname(pathname, URLS.dashboard)}
            icon={<HomeIcon />}
          >
            Dashboard
          </SidebarLink>
        </div>
        <SidebarSection title='Generators'>
          <SidebarLink
            href={URLS.tweetGeneration}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.tweetGeneration)
            }
            icon={<TwitterIconOutlined />}
          >
            Tweet Generator
          </SidebarLink>
          <SidebarLink
            href={URLS.hashtagGeneration}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.hashtagGeneration)
            }
            icon={<HashTagIcon />}
          >
            Hashtag Generator
          </SidebarLink>
          <SidebarLink
            href={URLS.bioGeneration}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.bioGeneration)
            }
            icon={<ProfileIcon />}
          >
            Bio Generator
          </SidebarLink>
          <SidebarLink
            href={URLS.handleGeneration}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.handleGeneration)
            }
            icon={<TwitterHandleIcon />}
          >
            Handle Generator
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title='History'>
          <SidebarLink
            href={URLS.myGenerations}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.myGenerations)
            }
            icon={<ListIcon />}
          >
            My Generations
          </SidebarLink>
          <SidebarLink
            href={URLS.myTweetSearces}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.myTweetSearces)
            }
            icon={<TableIcon />}
          >
            My Tweet Searches
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title='More'>
          <SidebarLink
            href={URLS.tweetSearch}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.tweetSearch)
            }
            icon={<SearchIcon />}
          >
            Search Tweet
          </SidebarLink>
          <SidebarLink
            href={URLS.videoDownloader}
            isActive={
              !!pathname && isActivePathname(pathname, URLS.videoDownloader)
            }
            icon={<VideoIcon />}
          >
            X Video Downloader{' '}
          </SidebarLink>
          <SidebarLink
            href={URLS.screenShot}
            isActive={!!pathname?.includes('/screenshot')}
            icon={<ScreenshotIcon height='1.3r  em' width='1.3rem' />}
          >
            X Post Screenshot{' '}
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title='Account'>
          <SidebarLink
            href={URLS.profile}
            isActive={!!pathname && isActivePathname(pathname, URLS.profile)}
            icon={<ProfileIcon />}
          >
            Profile
          </SidebarLink>
          <SidebarLink
            href={URLS.billing}
            isActive={!!pathname && isActivePathname(pathname, URLS.billing)}
            icon={<WalletIcon />}
          >
            Billing
          </SidebarLink>
          <SidebarLink
            href={URLS.contactUs}
            isActive={!!pathname && isActivePathname(pathname, URLS.contactUs)}
            icon={<MailIcon />}
          >
            Contact Us
          </SidebarLink>
          <button
            className='flex-c w-full gap-4 px-4 py-2 rounded-md cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-300 ease-in-out'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogoutIcon />
            <span>Log Out</span>
          </button>
        </SidebarSection>
      </div>
    </aside>
  );
}

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
  isActive: boolean;
  icon: ReactNode;
};

function SidebarLink({ href, isActive, icon, children }: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex-c px-4 py-2 gap-4 rounded-md text-primary-dark dark:text-soft-white transition-colors duration-300 ease-in-out',
        isActive
          ? 'bg-primary text-white'
          : 'hover:bg-gray-100 dark:hover:bg-primary-dark-light'
      )}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function SidebarSection({ title, children }: SectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div>
      <button
        className='flex-cb w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-primary-dark-light px-3'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <h3 className='px-4 py-2 font-semibold'>{title}</h3>
        <span className={clsx(isOpen ? 'rotate-0' : '-rotate-90')}>
          <DropDownIcon />
        </span>
      </button>
      {isOpen && <div className='px-3 space-y-1 mt-1'> {children} </div>}
    </div>
  );
}

function isActivePathname(pathname: string, url: string) {
  // remove / from the end of both pathname and url for comparison
  const cleanPathname = pathname.replace(/\/$/, '');
  const cleanUrl = url.replace(/\/$/, '');
  return cleanPathname === cleanUrl;
}

export default SideBar;
