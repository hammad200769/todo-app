import { getAbsoluteUrl } from '@/api-utils/utils';
import GoogleSignupLink from '@/components/auth/GoogleSignupLink';
import LoginForm from '@/components/auth/LoginForm';
import TwitterSignupLink from '@/components/auth/TwitterSignupLink';
import AuthFormsLayout from '@/components/common/AuthFormsLayout';
import ClarityScript from '@/components/common/ClarityScript';
import { Link } from '@/components/common/Links';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Log in to your account - TweetStorm.ai',
  description:
    'TweetStorm - An AI Tweet generator. Generate ai tweets, hashtags, unique twitter handles and twitter bio. Login to get started.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.login),
  },
};

function LoginPage() {
  return (
    <>
      <ClarityScript />
      <AuthFormsLayout>
        <div className='h-[94vh] w-full flex'>
          <div className='flex-cc flex-col py-6 grow gap-3 h-full w-full md:w-1/2 px-10'>
            <div className='w-full max-w-[450px]'>
              <h1 className='font-bold dark:text-white text-4xl mb-12 text-center'>
                Log in
              </h1>
              <div className='space-y-3'>
                <TwitterSignupLink> Login with Twitter </TwitterSignupLink>
                <GoogleSignupLink> Login with Google </GoogleSignupLink>
              </div>
              <div className='mt-8 mb-8 text-gray-500 dark:text-gray-400 relative'>
                <div className='w-full h-[1px] bg-gray-200 dark:bg-gray-500' />
                <span className='absolute top-0 translate-y-[-50%] text-sm left-[50%] translate-x-[-50%] px-4 bg-white dark:bg-primary-dark-light'>
                  or login with email
                </span>
              </div>
              <div>
                <Suspense>
                  <LoginForm />
                </Suspense>

                <p className='mt-5 text-gray-500 dark:text-gray-300'>
                  New here?{' '}
                  <Link
                    decorated
                    className='font-semibold text-base!'
                    href={URLS.signup}
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className='hidden lg:flex-cc lg:flex-col w-1/2 bg-primary text-white dark:bg-[#101721] px-10'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold mt-5 text-white'>
                Level up Your Twitter Game!
              </h2>
              <p className='mx-auto mt-4'>
                Generate high-impact tweets, hashtags, and more with AI to grow
                your audience.
              </p>

              <p className='dark:text-gray-300 mt-10'>
                New here?{' '}
                <Link
                  decorated
                  className='font-semibold text-white text-base!'
                  href={URLS.signup}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthFormsLayout>
    </>
  );
}

export default LoginPage;
