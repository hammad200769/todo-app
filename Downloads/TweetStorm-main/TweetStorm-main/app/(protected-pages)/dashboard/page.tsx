import { AIIcon, ApiKeyIcon, DeleteIcon } from '@/components/icons';
import { MASS_TWEET_DELETIONS_EXTENSION_LINK, URLS } from '@/utils/constants';
import Link from 'next/link';

function Page() {
  return (
    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4'>
        <Link
          href={`${URLS.profile}#generate-api-key`}
          className='group bg-white dark:bg-primary-dark overflow-hidden shadow-sm border border-primary rounded-lg py-10 px-4 flex-c gap-4 hover:bg-primary-hover hover:text-white dark:hover:bg-primary-disabled__dark transition-all duration-200'
        >
          <ApiKeyIcon width='4.8em' height='4.8em' />
          <div className='space-y-2'>
            <h3 className='font-bold text-lg group-hover:text-white'>
              Extension API Key
            </h3>
            <p>Get the API Key for use in browser extensions</p>
          </div>
        </Link>
        <Link
          href={`${URLS.tweetGeneration}`}
          className='group bg-white dark:bg-primary-dark overflow-hidden shadow-sm border border-primary rounded-lg py-10 px-4 flex-c gap-4 hover:bg-primary-hover hover:text-white dark:hover:bg-primary-disabled__dark transition-all duration-200'
        >
          <div className='text-primary dark:text-white'>
            <AIIcon width='4.8em' height='4.8em' />
          </div>
          <div className='space-y-2'>
            <h3 className='font-bold text-lg group-hover:text-white'>
              Generate AI Tweets
            </h3>
            <p>Instantly create quality tweets without having to think.</p>
          </div>
        </Link>
        <Link
          href={`${MASS_TWEET_DELETIONS_EXTENSION_LINK}`}
          target='_blank'
          rel='noopener noreferrer'
          className='group bg-white dark:bg-primary-dark overflow-hidden shadow-sm border border-primary rounded-lg py-10 px-4 flex-c gap-4 hover:bg-primary-hover hover:text-white dark:hover:bg-primary-disabled__dark transition-all duration-200'
        >
          <DeleteIcon width='4.8em' height='4.8em' />
          <div className='space-y-2'>
            <h3 className='font-bold text-lg group-hover:text-white'>
              Bulk Delete Tweets
            </h3>
            <p>
              Delete your old tweets in bulk to instantly get clean X profile.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
