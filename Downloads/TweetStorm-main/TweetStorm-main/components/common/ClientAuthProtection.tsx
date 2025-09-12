'use client';

import { URLS } from '@/utils/constants';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

type ClientAuthProtectionProps = {
  children: ReactNode;
};

function ClientAuthProtection({ children }: ClientAuthProtectionProps) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = URLS.login;
    }
  }, [status]);

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') return children;

  return null;
}

export default ClientAuthProtection;
