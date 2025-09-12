import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { URLS } from '@/utils/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type GuestProtectionProps = {
  children: ReactNode;
};

async function GuestProtection({ children }: GuestProtectionProps) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(URLS.dashboard);
  } else {
    return <>{children}</>;
  }
}

export default GuestProtection;
