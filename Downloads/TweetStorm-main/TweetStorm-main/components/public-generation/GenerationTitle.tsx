import { ReactNode } from 'react';

function GenerationTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className='text-[42px] font-bold tracking-tight leading-none sm:text-6xl'>
      {children}
    </h1>
  );
}

export default GenerationTitle;
