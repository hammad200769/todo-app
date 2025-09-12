import { ReactNode } from 'react';

function FeatureDescription({ children }: { children: ReactNode }) {
  return <p className='text-center md:text-left'>{children}</p>;
}

export default FeatureDescription;
