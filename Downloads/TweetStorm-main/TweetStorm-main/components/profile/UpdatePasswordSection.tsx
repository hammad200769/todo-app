'use client';

import { useUser } from '@/hooks/swr';
import ProfileFormBlocksSeparator from './ProfileFormBlocksSeparator';
import SettingsBlock from './SettingsBlock';
import UpdatePasswordForm from './UpdatePasswordForm';

function UpdatePasswordSection() {
  const { data: userData, isLoading } = useUser();

  if (isLoading || !userData?.user?.signedInWithEmail) {
    return null;
  }

  return (
    <>
      <ProfileFormBlocksSeparator />
      <SettingsBlock>
        <div>
          <h3 className='text-lg font-medium'>Update Password</h3>
          <p className='mt-1 text-sm'>
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        <UpdatePasswordForm />
      </SettingsBlock>
    </>
  );
}

export default UpdatePasswordSection;
