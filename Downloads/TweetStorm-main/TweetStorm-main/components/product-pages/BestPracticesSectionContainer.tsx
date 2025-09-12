import { ReactNode } from 'react';

type BestPracticesSectionContainerProps = {
  children: ReactNode;
};

function BestPracticesSectionContainer({
  children,
}: BestPracticesSectionContainerProps) {
  return <section className='space-y-10'>{children}</section>;
}

export default BestPracticesSectionContainer;
