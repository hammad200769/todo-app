import Toast from '@/components/common/Toast';
import TweetSearchForm from '@/components/private-tweet-search/TweetSearchForm';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Tweet Search',
  description: 'Use Twitters advanced search',
};

function TweetSearchPage() {
  return (
    <>
      <main className='pb-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <section>
            <h3 className='text-3xl mb-4 text-center'>Advanced Tweet Search</h3>
            <TweetSearchForm />
          </section>
        </div>
      </main>
      <Toast />
    </>
  );
}

export default withAuthenticationProtection(TweetSearchPage);
