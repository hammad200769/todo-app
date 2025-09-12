import clsx from 'clsx';
import { ReactNode } from 'react';

type TweetWrapperProps = {
  children: ReactNode;
  className?: string;
};

function TweetWrapper({ children, className }: TweetWrapperProps) {
  return (
    <div
      className={clsx(
        'dark:text-neutral-gray__dark rounded-lg border border-primary overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export default TweetWrapper;
