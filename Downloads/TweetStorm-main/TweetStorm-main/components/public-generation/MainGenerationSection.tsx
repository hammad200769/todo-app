import { ReactNode } from 'react';

function MainGenerationSection({ children }: { children: ReactNode }) {
  return (
    <article className='mx-auto max-w-6xl sm:px-6 py-8 sm:pt-16 text-center sm:pb-20'>
      {children}
    </article>
  );
}

export default MainGenerationSection;
