import {
  DeleteIcon,
  ExtensionIcon,
  FollowIcon,
  HashTagIcon,
  LikeIcon,
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
import { ReactNode } from 'react';

const menuItems: MENU_ITEMS = {
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
      icon: <VideoIcon height='1.3em' width='1.3em' />,
      text: 'X Video Downloader',
    },
    {
      href: URLS.screenShot,
      icon: <ScreenshotIcon height='1.3em' width='1.3em' />,
      text: 'X Post Screenshot',
    },
  ],
};

function GenerationsSubmenu() {
  const pathname = usePathname();

  return (
    <div className='min-w-max bg-white dark:bg-gray-800 border flex justify-center border-gray-700 shadow-lg py-2 rounded-lg'>
      {Object.keys(menuItems).map(section => (
        <div key={section} className='px-6'>
          <h2 className='text-xl font-semibold mb-5 mt-2'>{section}</h2>
          {menuItems[section].map((menuItem, index) => (
            <MenuItem
              key={`${section}-${index}`}
              href={menuItem.href}
              icon={menuItem.icon}
              active={!!pathname?.includes(menuItem.href)}
              hiddenOnLarge={menuItem.hiddenOnLarge}
            >
              {menuItem.text}
            </MenuItem>
          ))}
        </div>
      ))}
    </div>
  );
}

type MenuItemProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  active: boolean;
  hiddenOnLarge?: boolean;
};

function MenuItem({
  href,
  children,
  icon,
  active,
  hiddenOnLarge,
}: MenuItemProps) {
  return (
    <div className={clsx('mb-5 w-fit', hiddenOnLarge && 'block large:hidden')}>
      <Link
        href={href}
        className={clsx(
          'flex-c gap-2.5 font-medium py-[4px] rounded-sm hover:text-primary-dark dark:hover:text-white hover:underline',
          active && 'font-bold! text-primary-dark dark:text-white'
        )}
      >
        {icon}
        {children}
      </Link>
    </div>
  );
}

export default GenerationsSubmenu;
