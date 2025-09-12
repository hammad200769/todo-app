import Toast from '@/components/common/Toast';
import ApiKeyGenerationForm from '@/components/profile/ApiKeyGenerationForm';
import DeleteAccountButton from '@/components/profile/DeleteAccountButton';
import ProfileFormBlocksSeparator from '@/components/profile/ProfileFormBlocksSeparator';
import ProfileInformationForm from '@/components/profile/ProfileInformationForm';
import SettingsBlock from '@/components/profile/SettingsBlock';
import UpdatePasswordSection from '@/components/profile/UpdatePasswordSection';
import { withAuthenticationProtection } from '@/hocs';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK,
} from '@/utils/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Change your profile settings.',
};

function ProfilePage() {
  return (
    <>
      <main>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
          <SettingsBlock>
            <div>
              <h3 className='text-lg font-medium'>Profile Information </h3>

              <p className='mt-1 text-sm'>
                Update your account&apos;s profile information.
              </p>
            </div>
            <ProfileInformationForm />
          </SettingsBlock>

          <UpdatePasswordSection />
          <ProfileFormBlocksSeparator />
          <SettingsBlock>
            <div id='generate-api-key'>
              <h3 className='text-lg font-medium'>Extension API key </h3>
              <p className='mt-1 text-sm'>
                Use this API key with TweetStorm{"'"}s{' '}
                <Link
                  href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                  target='_blank'
                  className='underline'
                >
                  Tweet Generator Extension{' '}
                </Link>{' '}
                and{' '}
                <Link
                  href={MASS_TWEET_DELETIONS_EXTENSION_LINK}
                  target='_blank'
                  className='underline'
                >
                  Mass Tweet Deletions Extension
                </Link>
                .
              </p>
            </div>
            <ApiKeyGenerationForm />
          </SettingsBlock>
          <ProfileFormBlocksSeparator />
          <SettingsBlock>
            <div>
              <h3 className='text-lg font-medium'>Delete Account</h3>
              <p className='mt-1 text-sm'>Permanently delete your account.</p>
            </div>
            <div className='px-4 py-5 sm:p-6 bg-white dark:bg-primary-dark shadow-sm sm:rounded-lg'>
              <div className='max-w-xl text-sm'>
                Before deleting your account, please download any data or
                information that you wish to retain.
              </div>
              <div className='mt-5'>
                <DeleteAccountButton />
              </div>
            </div>
          </SettingsBlock>
        </div>
      </main>
      <Toast />
    </>
  );
}

export default withAuthenticationProtection(ProfilePage);
