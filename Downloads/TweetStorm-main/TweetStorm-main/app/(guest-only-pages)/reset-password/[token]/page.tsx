import GuestLayout from '@/components/common/GuestLayout';
import PasswordResetForm from '@/components/reset-password/PasswordResetForm';
import db from '@/DB/db';
import { handleServerError } from '@/middlewares';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TweetStorm.ai - Password Reset',
  description: 'Reset your password.',
};

async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams?: { email: string };
}) {
  let token;
  try {
    token = await db('password_reset_tokens')
      .where({
        token: params.token,
      })
      .select('id')
      .first();

    if (!token) return <p>Link is no longer usable</p>;
    if (!searchParams?.email) return null;

    return (
      <GuestLayout>
        <h1 className='font-semibold text-[26px] text-center'>
          Reset password
        </h1>
        <div className='w-[95%] sm:w-full max-w-[450px] px-6 py-4 bg-white dark:bg-primary-dark shadow-md rounded-lg'>
          <PasswordResetForm email={searchParams.email} />
        </div>
      </GuestLayout>
    );
  } catch (err) {
    handleServerError({ err, key: 'reset-password-page', metadata: { token } });
    throw err;
  }
}

export default ResetPasswordPage;
