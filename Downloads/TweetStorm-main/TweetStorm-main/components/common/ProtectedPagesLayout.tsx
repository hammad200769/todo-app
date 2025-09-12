import ProtectedDashboardLayoutComponent from '@/components/common/ProtectedDashboardLayout';
import SessionProvider from '@/components/common/SessionProvider';
import Swr from '@/components/common/Swr';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { URLS } from '@/utils/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function ProtectedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(URLS.login);
  }

  return (
    <div className='flex bg-soft-white dark:bg-primary-dark-light relative min-h-screen'>
      <Swr>
        <SessionProvider>
          <ProtectedDashboardLayoutComponent>
            {children}
          </ProtectedDashboardLayoutComponent>
        </SessionProvider>
      </Swr>
    </div>
  );
}

export default ProtectedPagesLayout;
