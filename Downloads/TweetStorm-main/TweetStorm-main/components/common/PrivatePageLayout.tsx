'use client';

import { ReactNode, useState } from 'react';
import SideBar from './SideBar';
import PrivatePageHeader from './private-page-header/PrivatePageHeader';

function PrivatePageLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex bg-soft-white dark:bg-primary-dark'>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex-1 dark:bg-primary-dark overflow-y-auto'>
        <PrivatePageHeader
          isSidebarOpen={isOpen}
          setIsSidebarOpen={setIsOpen}
        />
        {children}
      </div>
    </div>
  );
}

export default PrivatePageLayout;
