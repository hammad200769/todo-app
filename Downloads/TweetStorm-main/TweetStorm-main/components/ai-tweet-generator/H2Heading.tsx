import clsx from 'clsx';
import { ReactNode } from 'react';

type H2HeadingProps = {
  children: ReactNode;
  className?: string;
};

function H2Heading({ children, className }: H2HeadingProps) {
  return (
    <h2
      className={clsx(
        'text-[36px] dark:text-white font-bold leading-[1.1]',
        className
      )}
    >
      {children}
    </h2>
  );
}

export default H2Heading;
