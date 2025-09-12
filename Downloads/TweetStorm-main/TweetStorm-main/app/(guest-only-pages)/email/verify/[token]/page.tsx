import GuestLayout from '@/components/common/GuestLayout';
import { Link } from '@/components/common/Links';
import ResendVerificationEmailBlock from '@/components/email-verification/ResendVerificationEmailBlock';
import db from '@/DB/db';
import { handleServerError } from '@/middlewares';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TweetStorm.ai - Verify your email',
  description:
    'Please verify your email to complete account creation and continue to TweetStorm.',
};

async function EmailVerifyPage({ params }: { params: { token: string } }) {
  let user;

  try {
    user = await db('email_verifications')
      .join('users', 'email_verifications.user_id', '=', 'users.id')
      .where('email_verifications.public_token', params.token)
      .select('users.id as user_id', 'users.email', 'users.email_verified_at')
      .first();
    return (
      <GuestLayout>
        {!user && (
          <>
            <h1 className='font-semibold text-[26px] text-center leading-tight'>
              User not found
            </h1>
            <Link href={URLS.login} decorated>
              Back to Login Page.
            </Link>
          </>
        )}

        {!!user && user.email_verified_at && (
          <>
            <h1 className='font-semibold text-[26px] text-center leading-tight'>
              Email is already verified
            </h1>
            <Link href={URLS.login} decorated>
              Back to Login Page.
            </Link>
          </>
        )}

        {!!user && !user.email_verified_at && (
          <>
            <h1 className='font-semibold text-[26px] text-center leading-tight'>
              Please verify your email
            </h1>

            <div className='w-[95%] sm:w-full max-w-[550px] px-4 py-8 sm:px-8 bg-white dark:bg-primary-dark shadow-md rounded-lg text-center'>
              <p className='mb-4 leading-snug'>
                You&apos;re almost there! We sent an email to{' '}
                <span className='font-bold'> {user.email}</span>
              </p>
              <p className='mt-5 leading-snug'>
                Just click on the link in that email to complete account
                creation. If you don&apos;t see it, you may need to{' '}
                <span className='font-bold'>check your spam </span>
                folder.
              </p>
              <p className='mt-5 mb-1'>Still can&apos;t find the email?</p>
              <ResendVerificationEmailBlock token={params.token} />
              <div className='mt-5'></div>
              <Link href={URLS.login} decorated>
                Back to Login Page.
              </Link>
            </div>
          </>
        )}
      </GuestLayout>
    );
  } catch (err) {
    handleServerError({ err, key: 'email-verify-page', metadata: { user } });
    throw err;
  }
}

export default EmailVerifyPage;
