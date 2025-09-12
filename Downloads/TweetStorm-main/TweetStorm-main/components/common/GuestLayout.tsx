import { ReactNode } from 'react';
import GuestLayoutHeader from './GuestLayoutHeader';

function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className='antialiased'>
      <div className='min-h-screen flex flex-col'>
        <GuestLayoutHeader />
        <div className='flex-cc flex-col py-6 grow gap-3'>{children}</div>
      </div>
    </div>
  );
}

export default GuestLayout;
