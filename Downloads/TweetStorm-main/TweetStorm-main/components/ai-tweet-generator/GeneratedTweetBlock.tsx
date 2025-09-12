'use client';

import { NAVIGATION_HEADER_HEIGHT } from '@/utils/constants';
import { useEffect } from 'react';
import CopyGeneratedContentButton from '../common/CopyGeneratedContentButton';
import TweetContentContainer from '../common/TweetContentContainer';
import TweetGeneratedContentLink from '../common/TweetGeneratedContentLink';
import TweetProfile from '../common/TweetProfile';
import TweetWrapper from '../common/TweetWrapper';

type GeneratedTweetBlockProps = {
  content: string;
  twitterPostUrl: string;
  postButtonText: string;
};

function GeneratedTweetBlock({
  content,
  twitterPostUrl,
  postButtonText,
}: GeneratedTweetBlockProps) {
  useEffect(() => {
    const element = document.getElementById('generatedContentContainer');
    if (element) {
      const rect = element.getBoundingClientRect();

      if (rect.bottom > window.screen.height) {
        // Calculate the scroll position. We have to subtract the navigation height as it is 'position:fixed' and is not considered in the scroll position.
        const offsetTop = rect.top + window.scrollY - NAVIGATION_HEADER_HEIGHT;

        window.scrollTo({
          top: offsetTop - 40,
          behavior: 'smooth',
        });
      }
    }
  }, [content]);

  return (
    <div id='generatedContentContainer'>
      <TweetWrapper>
        <TweetProfile />
        <TweetContentContainer content={content} />
        <div className='flex-c gap-3 p-4 border-t border-gray-200 dark:border-dark-mode-border'>
          <TweetGeneratedContentLink url={twitterPostUrl}>
            {postButtonText}
          </TweetGeneratedContentLink>
          <CopyGeneratedContentButton content={content} />
        </div>
      </TweetWrapper>
    </div>
  );
}

export default GeneratedTweetBlock;
