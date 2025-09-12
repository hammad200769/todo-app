import {
  DeleteIcon,
  DropDownIcon,
  ExtensionIcon,
  FollowIcon,
  HamburgerIcon,
  HashTagIcon,
  LikeIcon,
  MobileNavigationCloseIcon,
  ProfileIcon,
  RetweetIcon,
  ScreenshotIcon,
  SearchIcon,
  TwitterHandleIcon,
  UnfollowIcon,
  UnlikeIcon,
  VideoIcon,
} from '@/components/icons';
import { MENU_ITEMS } from '@/types/types';
import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import DarkModeToggle from '../DarkModeToggle';

const dropDownMenu: MENU_ITEMS = {
  Generators: [
    {
      href: URLS.publicTweetGeneration,
      icon: <RetweetIcon width='1.3em' height='1.3em' />,
      text: 'Tweet Generator',
    },
    {
      href: URLS.publicHashtagGeneration,
      icon: <HashTagIcon width='1.3em' height='1.3em' />,
      text: 'Twitter Hashtags Generator',
    },
    {
      href: URLS.publicBioGeneration,
      icon: <ProfileIcon width='1.3em' height='1.3em' />,
      text: 'Twitter Bio Generator',
    },
    {
      href: URLS.publicHandleGeneration,
      icon: <TwitterHandleIcon width='1.3em' height='1.3em' />,
      text: 'Twitter Handles Generator',
    },
  ],

  'Bulk Actions': [
    {
      href: URLS.massTweetDeletes,
      icon: <DeleteIcon width='1.3em' height='1.3em' />,
      text: 'Mass Delete Tweets',
    },
    {
      href: URLS.massTwitterFollows,
      icon: <FollowIcon width='1.3em' height='1.3em' />,
      text: 'Mass Twitter Follows',
    },
    {
      href: URLS.massTwitterUnfollows,
      icon: <UnfollowIcon width='1.3em' height='1.3em' />,
      text: 'Mass Twitter Unfollows',
    },
    {
      href: URLS.massRetweets,
      icon: <RetweetIcon width='1.3em' height='1.3em' />,
      text: 'Mass Retweets',
    },
    {
      href: URLS.twitterAutoLiker,
      icon: <LikeIcon width='1.3em' height='1.3em' />,
      text: 'Twitter Auto Liker',
    },
    {
      href: URLS.deleteTwitterLikes,
      icon: <UnlikeIcon width='1.3em' height='1.3em' />,
      text: 'Delete Twitter Likes',
    },
  ],

  Extensions: [
    {
      href: URLS.tweetGeneratorExtension,
      icon: <ExtensionIcon width='1.3em' height='1.3em' />,
      text: 'Tweet Generator',
    },
    {
      href: URLS.massTweetDeletionExtension,
      icon: <ExtensionIcon width='1.3em' height='1.3em' />,
      text: 'Mass Tweet Deletion',
    },
  ],
  Others: [
    {
      href: URLS.publicTweetSearch,
      icon: <SearchIcon width='1.3em' height='1.3em' />,
      text: 'Tweet Search',
    },
    {
      href: URLS.videoDownloader,
      icon: <VideoIcon width='1.3em' height='1.3em' />,
      text: 'X Video Downloader',
    },
    {
      href: URLS.screenShot,
      icon: <ScreenshotIcon height='1.3em' width='1.3em' />,
      text: 'X Post Screenshot',
    },
  ],
};

function MobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    Generators: true,
    'Bulk Actions': true,
    Extensions: true,
    Others: true,
  });
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (section: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className='ml-auto lg:hidden py-0'>
      {isMobileMenuOpen ? (
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className='block hover:text-primary cursor-pointer'
        >
          <MobileNavigationCloseIcon />
        </button>
      ) : (
        <div className='flex items-center'>
          <div className='hidden sm:flex items-center gap-2'>
            <Link
              href={URLS.login}
              className='rounded-sm bg-[#f0f0f0] dark:bg-gray-800 dark:text-white text-primary-dark px-4 py-3 font-semibold leading-none'
            >
              Log In
            </Link>
            <Link
              href={URLS.signup}
              className='rounded-sm bg-primary px-4 py-3 text-sm font-semibold leading-none text-white hover:bg-indigo-700'
            >
              Sign Up
            </Link>
          </div>
          <div className='w-[2px] h-7 bg-gray-500 hidden sm:block mx-3'></div>{' '}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className='block text-primary-dark dark:text-white hover:text-primary cursor-pointer'
            aria-label='Hamburger Icon'
          >
            <HamburgerIcon width='32px' height='32px' />
          </button>
        </div>
      )}
      {/* The mobile menu */}
      {isMobileMenuOpen && (
        <nav className='fixed top-0 left-0 z-20 w-full h-screen bg-white dark:bg-primary-dark opacity-[99%] flex flex-col'>
          <div className='flex items-center justify-between p-3 xs:px-8 sm:px-12 border-b border-gray-600'>
            <div className='font-bold text-lg'>Menu</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='block hover:text-primary cursor-pointer'
            >
              <MobileNavigationCloseIcon />
            </button>
          </div>

          <div className='overflow-y-auto flex-grow px-2 xs:px-8 sm:px-12 py-6 space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 xs:gap-x-12'>
              <ul>
                <NavigationListItem href={URLS.pricing}>
                  Pricing
                </NavigationListItem>
                <NavigationListItem href={URLS.blog}>Blog</NavigationListItem>
                <NavigationListItem href={URLS.tweetGeneratorExtension}>
                  {' '}
                  Tweet Generator Extension
                </NavigationListItem>
                <NavigationListItem href={URLS.massTweetDeletionExtension}>
                  {' '}
                  Mass Tweet Deletion Extension
                </NavigationListItem>
              </ul>

              <div className='w-full space-y-10'>
                {Object.keys(dropDownMenu).map(section => (
                  <div key={section} className='w-full'>
                    <button
                      className='flex-cb font-bold mb-3 w-full py-2 border-b border-gray-700 cursor-pointer'
                      onClick={() => toggleDropdown(section)}
                    >
                      <span>{section}</span>
                      <span
                        className={clsx(
                          'transition-transform duration-200 ml-2',
                          openDropdowns[section] ? 'rotate-180' : ''
                        )}
                      >
                        <DropDownIcon />
                      </span>
                    </button>

                    <div
                      className={clsx(
                        'grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden',
                        openDropdowns[section]
                          ? 'max-h-96 opacity-100 mb-4'
                          : 'max-h-0 opacity-0'
                      )}
                    >
                      {dropDownMenu[section].map((menuItem, index) => (
                        <MenuItem
                          key={`${section}-${index}`}
                          href={menuItem.href}
                          icon={menuItem.icon}
                          active={!!pathname?.includes(menuItem.href)}
                          hiddenOnLarge={menuItem.hiddenOnLarge}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {menuItem.text}
                        </MenuItem>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-center w-full space-x-4 mt-8 pb-6'>
              <DarkModeToggle />

              <Link
                href={URLS.login}
                className='rounded-sm bg-[#f0f0f0] dark:bg-gray-800 dark:text-white text-primary-dark px-4 py-3 font-semibold leading-none sm:hidden'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href={URLS.signup}
                className='inline-block rounded-sm bg-primary px-4 py-3 font-semibold leading-none text-white hover:bg-primary-hover sm:hidden'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

type NavigationListItemProps = {
  href: string;
  children: ReactNode;
};

function NavigationListItem({ href, children }: NavigationListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className='font-medium inline-block w-full hover:text-primary-dark hover:underline dark:hover:text-white py-3'
      >
        {children}
      </Link>
    </li>
  );
}

export default MobileNavigation;

type MenuItemProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  active: boolean;
  hiddenOnLarge?: boolean;
  onClick?: () => void;
};

function MenuItem({
  href,
  children,
  icon,
  active,
  hiddenOnLarge,
  onClick,
}: MenuItemProps) {
  return (
    <div className={clsx('w-full', hiddenOnLarge && 'lg:hidden')}>
      <Link
        href={href}
        className={clsx(
          'flex-c font-medium gap-2 py-2 rounded-sm hover:underline hover:text-primary-dark dark:hover:text-white',
          active && 'font-extrabold'
        )}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </div>
  );
}
