'use client';
import { URLS } from '@/utils/constants';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { TwitterSingupIcon } from '../icons';

type TwitterSignupLinkProps = {
  children: ReactNode;
};

function TwitterSignupLink({ children }: TwitterSignupLinkProps) {
  async function handclick() {
    await signIn('twitter', {
      callbackUrl: URLS.dashboard,
    });
  }
  return (
    <button
      className='cursor-pointer w-full flex-cc gap-x-4 border hover:bg-[#1da1f2]/20 focus:ring-4 focus:outline-hidden focus:ring-gray-500/50 rounded-lg px-5 py-2 text-center'
      onClick={() => handclick()}
    >
      <TwitterSingupIcon />
      {children}
    </button>
  );
}

export default TwitterSignupLink;
