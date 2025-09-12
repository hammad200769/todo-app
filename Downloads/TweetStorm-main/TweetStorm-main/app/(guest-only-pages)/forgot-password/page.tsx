import { getAbsoluteUrl } from '@/api-utils/utils';
import GuestLayout from '@/components/common/GuestLayout';
import { Link } from '@/components/common/Links';
import ForgotPasswordForm from '@/components/forgot-password/ForgotPasswordForm';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TweetStorm.ai - Forgot Password',
  description:
    "Forgot your password? No problem. Enter the email address associated with your account and we'll send you instructions to reset your password.",
  alternates: {
    canonical: getAbsoluteUrl(URLS.forgotPassword),
  },
};

function ForgotPasswordPage() {
  return (
    <GuestLayout>
      <h1 className='font-semibold text-[26px] text-center'>
        Forgot Password?
      </h1>
      <div className='w-[95%] sm:w-full max-w-[450px] px-6 py-4 dark:bg-primary-dark shadow-md rounded-lg'>
        <p className='mb-4 text-sm'>
          Enter the email address associated with your account and we&apos;ll
          send you instructions to reset your password.
        </p>
        <ForgotPasswordForm />

        <div className='mt-4'></div>
        <Link href={URLS.login} decorated>
          Back to login
        </Link>
      </div>
    </GuestLayout>
  );
}

export default ForgotPasswordPage;
