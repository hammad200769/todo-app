import { useEffect, useRef } from 'react';
import TweetProfile from '../common/TweetProfile';
import TweetWrapper from '../common/TweetWrapper';
import GeneratedContentLoader from '../public-generation/GeneratedContentLoader';

type GeneratedTweetPlaceholderProps = {
  isGenerationLoading: boolean;
};

function GeneratedTweetPlaceholder({
  isGenerationLoading,
}: GeneratedTweetPlaceholderProps) {
  const contentTextAreaRef = useRef<null | HTMLTextAreaElement>(null);

  // Set the height of the text area to fit the content.
  useEffect(() => {
    if (contentTextAreaRef.current) {
      contentTextAreaRef.current.style.height = '1px';
      const scrollHeight = contentTextAreaRef.current.scrollHeight;
      contentTextAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [contentTextAreaRef]);

  return (
    <TweetWrapper className='min-h-[188px]'>
      <TweetProfile />
      {isGenerationLoading ? (
        <GeneratedContentLoader />
      ) : (
        <div>
          <textarea
            ref={contentTextAreaRef}
            className='w-full border-none p-4 pb-3 resize-none text-gray-500 dark:bg-inherit'
            disabled
            placeholder='Your generated content will appear here...'
          />
        </div>
      )}
    </TweetWrapper>
  );
}

export default GeneratedTweetPlaceholder;
