import Toast from '@/components/common/Toast';
import LimitedViewMessage from '@/components/my-tweet-searches/LimitedViewMessage';
import TweetSearchesTable from '@/components/my-tweet-searches/TweetSearchesTable';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tweet Searches',
  description: 'View your tweet searches.',
};

function MyTweetSearchesPage() {
  return (
    <>
      <main>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <section className='bg-white dark:bg-primary-dark shadow-xl sm:rounded-lg p-6'>
            <h2 className='font-semibold text-xl text-center leading-tight mb-4'>
              Tweet Searches
            </h2>

            <LimitedViewMessage />
            <Suspense>
              <TweetSearchesTable />
            </Suspense>
          </section>
        </div>
      </main>
      <Toast />
    </>
  );
}

export default withAuthenticationProtection(MyTweetSearchesPage);
