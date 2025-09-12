'use client';

import PrivatePageHeader from '@/components/common/private-page-header/PrivatePageHeader';
import SideBar from '@/components/common/SideBar';
import { useState } from 'react';

function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex-1 max-[796px]:overflow-y-auto overflow-y-visible'>
        <PrivatePageHeader
          isSidebarOpen={isOpen}
          setIsSidebarOpen={setIsOpen}
        />
        <main>
          <div className='py-12'>{children}</div>
        </main>
      </div>
    </>
  );
}

export default ProtectedDashboardLayout;
