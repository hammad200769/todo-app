'use client';
import { URLS } from '@/utils/constants';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { GoogleSignupIcon } from '../icons';

type GoogleSignupLinkProps = {
  children: ReactNode;
};

function GoogleSignupLink({ children }: GoogleSignupLinkProps) {
  async function handclick() {
    await signIn('google', {
      callbackUrl: URLS.dashboard,
    });
  }
  return (
    <button
      className='w-full flex-cc gap-x-4 cursor-pointer border hover:bg-[#1da1f2]/20 focus:ring-4 focus:outline-hidden focus:ring-gray-500/50 rounded-lg px-5 py-2 text-center'
      onClick={() => handclick()}
    >
      <GoogleSignupIcon />
      {children}
    </button>
  );
}

export default GoogleSignupLink;
