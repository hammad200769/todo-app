'use client';

import { URLS } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

function MoreToolsSection() {
  const pathName = usePathname();

  return (
    <div className='mt-10 max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold mb-2'>We Also Offer</h2>
      <ul className='flex-c flex-wrap gap-x-6'>
        {!pathName?.includes(URLS.publicTweetGeneration) && (
          <li>
            <h3>
              <ToolLink href={URLS.publicTweetGeneration}>
                Tweet Generator
              </ToolLink>
            </h3>
          </li>
        )}
        {!pathName?.includes(URLS.publicHashtagGeneration) && (
          <li>
            <h3>
              <ToolLink href={URLS.publicHashtagGeneration}>
                Twitter Hashtags Generator
              </ToolLink>
            </h3>
          </li>
        )}
        {!pathName?.includes(URLS.publicBioGeneration) && (
          <li>
            <h3>
              <ToolLink href={URLS.publicBioGeneration}>
                Twitter Bio Generator
              </ToolLink>
            </h3>
          </li>
        )}
        {!pathName?.includes(URLS.publicHandleGeneration) && (
          <li>
            <h3>
              <ToolLink href={URLS.publicHandleGeneration}>
                Twitter Handles Generator
              </ToolLink>
            </h3>
          </li>
        )}
        <li>
          <h3>
            <ToolLink href={URLS.massTweetDeletionExtension}>
              Mass Tweet Deletion
            </ToolLink>
          </h3>
        </li>
        <li>
          <h3>
            <ToolLink href={URLS.publicTweetSearch}>
              Advanced Tweet Search
            </ToolLink>
          </h3>
        </li>
      </ul>
    </div>
  );
}

type ToolLinkProps = {
  href: string;
  children: ReactNode;
};

function ToolLink({ href, children }: ToolLinkProps) {
  return (
    <Link
      href={href}
      className='text-primary dark:text-primary-light border-b border-b-transparent text-lg link-anim hover:text-primary-hover hover:border-b-current'
    >
      {children}
    </Link>
  );
}

export default MoreToolsSection;
