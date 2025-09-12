import { getAbsoluteUrl } from '@/api-utils/utils';
import GoogleSignupLink from '@/components/auth/GoogleSignupLink';
import SignupForm from '@/components/auth/SignupForm';
import TwitterSignupLink from '@/components/auth/TwitterSignupLink';
import AuthFormsLayout from '@/components/common/AuthFormsLayout';
import ClarityScript from '@/components/common/ClarityScript';
import { Link } from '@/components/common/Links';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create your account - TweetStorm.ai',
  description:
    'TweetStorm - An AI Tweet generator. Effortlessly craft compelling tweets, generate trending hashtags, create standout Twitter handles, and craft captivating bios. Elevate your social media game with TweetStorm',
  alternates: {
    canonical: getAbsoluteUrl(URLS.signup),
  },
};

function SignupPage() {
  return (
    <>
      <ClarityScript />
      <AuthFormsLayout>
        <div className='h-[94vh] w-full flex'>
          <div className='flex-cc flex-col py-6 grow gap-3 h-full w-full md:w-1/2 px-10'>
            <div className='w-full max-w-[450px]'>
              <h1 className='font-bold dark:text-white text-4xl mb-12 text-center'>
                Create your account
              </h1>
              <div className='space-y-3'>
                <TwitterSignupLink> Signup with Twitter </TwitterSignupLink>
                <GoogleSignupLink> Signup with Google </GoogleSignupLink>
              </div>
              <div className='mt-8 mb-8 text-gray-500 dark:text-gray-400 relative'>
                <div className='w-full h-[1px] bg-gray-200 dark:bg-gray-500' />
                <span className='absolute top-0 translate-y-[-50%] text-sm left-[50%] translate-x-[-50%] px-4 bg-white dark:bg-primary-dark-light'>
                  or signup with email
                </span>
              </div>
              <div>
                <Suspense>
                  <SignupForm />
                </Suspense>

                <p className='mt-5 text-gray-500 dark:text-gray-300'>
                  Already have an account?{' '}
                  <Link
                    decorated
                    className='font-semibold text-base!'
                    href={URLS.login}
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className='mt-5'>
                <p className='text-sm text-gray-500 dark:text-gray-300'>
                  By creating your account, you agree to the
                  <Link
                    decorated
                    className='text-sm!'
                    href={URLS.termsOfService}
                  >
                    {' '}
                    Terms of Service{' '}
                  </Link>
                  and
                  <Link
                    decorated
                    className='text-sm!'
                    href={URLS.privacyPolicy}
                  >
                    {' '}
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className='hidden lg:flex-cc lg:flex-col w-1/2 bg-primary text-white dark:bg-[#101721] px-10'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold mt-5 text-white'>
                Amplify Your Voice with AI!
              </h2>
              <p className='mx-auto mt-4'>
                Join TweetStorm.AI to effortlessly generate viral tweets,
                trending hashtags, and the perfect Twitter bio. Let AI
                supercharge your social media presence—sign up now and start
                creating!
              </p>

              <p className='dark:text-gray-300 mt-10'>
                Already have an account?{' '}
                <Link
                  decorated
                  className='font-semibold text-white text-base!'
                  href={URLS.login}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthFormsLayout>
    </>
  );
}

export default SignupPage;
