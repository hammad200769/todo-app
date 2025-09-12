import { ReactNode } from 'react';
import H2Heading from '../ai-tweet-generator/H2Heading';

interface IntroductionProps {
  children: ReactNode;
  className?: string;
}

function Introduction({ children, className }: IntroductionProps) {
  return (
    <div className={`mx-auto max-w-3xl space-y-8 `}>
      <H2Heading className={className}>Introduction</H2Heading>
      <div className='space-y-4'>{children}</div>
    </div>
  );
}

export default Introduction;
