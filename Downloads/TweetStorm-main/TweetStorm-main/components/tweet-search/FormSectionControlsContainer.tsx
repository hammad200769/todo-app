import { ReactNode } from 'react';

function FormSectionControlsContainer({ children }: { children: ReactNode }) {
  return (
    <div className='grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
      {children}
    </div>
  );
}

export default FormSectionControlsContainer;
