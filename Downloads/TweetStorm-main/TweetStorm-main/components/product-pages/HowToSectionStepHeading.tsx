import { ReactNode } from 'react';

type HowToSectionStepHeadingProps = {
  children: ReactNode;
};

function HowToSectionStepHeading({ children }: HowToSectionStepHeadingProps) {
  return <h3 className='font-semibold text-2xl'>{children}</h3>;
}

export default HowToSectionStepHeading;
