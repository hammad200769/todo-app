import FullPageLoaderForProtectedPages from '@/components/common/FullPageLoaderForProtectedPages';
import { Suspense } from 'react';
import ProtectedPagesLayout from '../../components/common/ProtectedPagesLayout';

function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<FullPageLoaderForProtectedPages />}>
        <ProtectedPagesLayout> {children}</ProtectedPagesLayout>
      </Suspense>
    </>
  );
}

export default ProtectedDashboardLayout;
