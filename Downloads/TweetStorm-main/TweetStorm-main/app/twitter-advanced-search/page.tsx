import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import TweetSearchForm from '@/components/tweet-search/TweetSearchForm';
import { NAVIGATION_HEADER_HEIGHT } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Advanced Twitter/X Search (Free Tool) - TweetStorm.ai',
  description:
    'Use free tool for twitter/X advanced search to search for tweets by date, users, location, keywords, hashtag, likes and more.',
};

export default function TweetSearchPage() {
  return (
    <>
      <ClarityScript />
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>
      <div style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}>
        <main className='pb-8 lg:pb-24 responsive-pad dark:bg-primary-dark-light pt-[0.5px]'>
          <article className='mx-auto max-w-[1320px] select-none mt-16'>
            <div className='mb-10 text-center'>
              <h1 className='text-3xl sm:text-2xl md:text-5xl'>
                Use Twitter’s Advanced Search Conveniently
              </h1>
              <h2 className='text-lg mt-2 leading-tight'>
                Save time by tenfold - search tweets relevant to your business
                effortlessly
              </h2>
            </div>
            <div>
              <h3 className='text-3xl mb-4 text-center'>
                Advanced Tweet Search
              </h3>
              <TweetSearchForm />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
