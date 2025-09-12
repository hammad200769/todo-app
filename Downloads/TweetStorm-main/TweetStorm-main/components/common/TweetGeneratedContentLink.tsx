import Link from 'next/link';
import { ReactNode } from 'react';
import { TwitterIcon } from '../icons';

type TweetGeneratedContentLinkProps = {
  children: ReactNode;
  url: string;
};

function TweetGeneratedContentLink({
  children,
  url,
}: TweetGeneratedContentLinkProps) {
  return (
    <Link
      target='_blank'
      className='flex items-center justify-center rounded-md border border-transparent bg-primary-twitter px-4 py-2 text-sm font-medium text-white gap-1 shadow-xs hover:bg-[#0070bc] link-anim'
      href={url}
    >
      <TwitterIcon />
      {children}
    </Link>
  );
}

export default TweetGeneratedContentLink;
