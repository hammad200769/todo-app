import { URLS } from '@/utils/constants';
import GuestLayout from '../common/GuestLayout';
import { Link } from '../common/Links';

export default function EmailVerificationMessage({
  message,
}: {
  message: string;
}) {
  return (
    <GuestLayout>
      <h1 className='font-semibold text-[26px] text-center leading-tight'>
        {message}
      </h1>

      <Link href={URLS.login} decorated>
        Back to Login Page
      </Link>
    </GuestLayout>
  );
}
