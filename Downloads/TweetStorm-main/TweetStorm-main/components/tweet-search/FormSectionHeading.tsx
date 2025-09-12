import { ReactNode } from 'react';

function FormSectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className='text-xl xl:text-2xl font-medium text-gray-400 dark:text-gray-400 mb-3 uppercase tracking-wide lg:mb-0'>
      {children}
    </h3>
  );
}

export default FormSectionHeading;
