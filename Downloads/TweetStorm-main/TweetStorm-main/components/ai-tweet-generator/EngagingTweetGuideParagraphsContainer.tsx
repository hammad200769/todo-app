import { ReactNode } from 'react';

type EngagingTweetGuideParagraphsContainerProps = {
  children: ReactNode;
};

function EngagingTweetGuideParagraphsContainer({
  children,
}: EngagingTweetGuideParagraphsContainerProps) {
  return <div className='mt-4 space-y-4'> {children}</div>;
}

export default EngagingTweetGuideParagraphsContainer;
