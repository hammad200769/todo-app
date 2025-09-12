import { ReactNode } from 'react';

type HowToSectionStepContainerProps = {
  children: ReactNode;
};

function HowToSectionStepContainer({
  children,
}: HowToSectionStepContainerProps) {
  return (
    <div className='grid my-20 grid-cols-1 items-center justify-between lg:grid-cols-2 gap-x-8 gap-y-4'>
      {children}
    </div>
  );
}

export default HowToSectionStepContainer;
