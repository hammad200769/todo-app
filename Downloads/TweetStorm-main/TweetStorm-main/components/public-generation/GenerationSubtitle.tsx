import { ReactNode } from 'react';

function GenerationSubtitle({ children }: { children: ReactNode }) {
  return (
    <h2 className='mt-3 text-lg dark:text-neutral-gray__dark leading-tight text-neutral-gray'>
      {children}
    </h2>
  );
}

export default GenerationSubtitle;
