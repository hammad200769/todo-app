import { ReactNode } from 'react';
import GuestLayoutHeader from './GuestLayoutHeader';

function AuthFormsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='antialiased'>
      <div className='min-h-screen flex flex-col'>
        <GuestLayoutHeader />
        <div className='grow gap-3'>{children}</div>
      </div>
    </div>
  );
}

export default AuthFormsLayout;
