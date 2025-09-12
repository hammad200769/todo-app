import { ReactNode } from 'react';

type EngagingTweetGuideHeadingProps = {
  children: ReactNode;
};

function EngagingTweetGuideHeading({
  children,
}: EngagingTweetGuideHeadingProps) {
  return <h3 className='text-xl font-semibold'>{children}</h3>;
}

export default EngagingTweetGuideHeading;
