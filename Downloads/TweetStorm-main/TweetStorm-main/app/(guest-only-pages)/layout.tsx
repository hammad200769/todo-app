import FullPageLoaderForGuestPages from '@/components/common/FullPageLoaderForGuestPages';
import GuestProtection from '@/components/common/GuestProtection';
import { Suspense } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FullPageLoaderForGuestPages />}>
      <GuestProtection> {children}</GuestProtection>
    </Suspense>
  );
}

export default Layout;
