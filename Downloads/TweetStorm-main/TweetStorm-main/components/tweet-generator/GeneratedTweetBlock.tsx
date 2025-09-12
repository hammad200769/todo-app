'use client';

import { useEffect } from 'react';
import CopyGeneratedContentButton from '../common/CopyGeneratedContentButton';
import TweetContentContainer from '../common/TweetContentContainer';
import TweetGeneratedContentLink from '../common/TweetGeneratedContentLink';
import TweetProfile from '../common/TweetProfile';
import TweetWrapper from '../common/TweetWrapper';

type GeneratedTweetBlockProps = {
  content: string;
};

function GeneratedTweetBlock({ content }: GeneratedTweetBlockProps) {
  useEffect(() => {
    const element = document.getElementById('generatedContentContainer');
    if (element) {
      const rect = element.getBoundingClientRect();

      const offsetTop = rect.top + window.scrollY;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, [content]);

  return (
    <div
      id='generatedContentContainer'
      className='mx-auto mb-10 pt-10 max-w-xl '
    >
      <TweetWrapper>
        <TweetProfile />
        <TweetContentContainer content={content} />
        <div className='flex-c gap-3 p-4 border-t border-gray-200 dark:border-dark-mode-border'>
          <TweetGeneratedContentLink
            url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              content
            )}`}
          >
            Tweet this
          </TweetGeneratedContentLink>
          <CopyGeneratedContentButton content={content} />
        </div>
      </TweetWrapper>
    </div>
  );
}

export default GeneratedTweetBlock;
