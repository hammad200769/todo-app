'use client';
import { useEffect, useRef } from 'react';

type TweetContentContainerProps = {
  content: string;
};

function TweetContentContainer({ content }: TweetContentContainerProps) {
  const contentTextAreaRef = useRef<null | HTMLTextAreaElement>(null);

  // Set the height of the text area to fit the content.
  useEffect(() => {
    if (contentTextAreaRef.current) {
      contentTextAreaRef.current.style.height = '1px';
      const scrollHeight = contentTextAreaRef.current.scrollHeight;
      contentTextAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [content, contentTextAreaRef]);

  return (
    <div>
      <textarea
        ref={contentTextAreaRef}
        className='w-full border-none p-4 pb-3 resize-none dark:text-gray-200 bg-inherit'
        disabled
        value={content}
      />
    </div>
  );
}

export default TweetContentContainer;
