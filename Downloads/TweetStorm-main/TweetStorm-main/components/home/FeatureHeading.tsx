import { ReactNode } from 'react';

function FeatureHeading({ children }: { children: ReactNode }) {
  return <h3 className='text-2xl xs:text-3xl font-medium'>{children}</h3>;
}

export default FeatureHeading;
