import { ReactNode } from 'react';

function FormSectionContainer({ children }: { children: ReactNode }) {
  return (
    <div className='grid lg:grid-cols-[0.25fr_1fr] gap-x-4'> {children}</div>
  );
}

export default FormSectionContainer;
