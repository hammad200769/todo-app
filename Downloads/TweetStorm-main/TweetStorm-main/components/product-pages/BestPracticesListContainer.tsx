import { ReactNode } from 'react';

type BestPracticesListContainerProps = {
  children: ReactNode;
};

function BestPracticesListContainer({
  children,
}: BestPracticesListContainerProps) {
  return <div className='space-y-8'>{children}</div>;
}

export default BestPracticesListContainer;
