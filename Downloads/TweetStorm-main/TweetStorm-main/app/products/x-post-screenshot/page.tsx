import { getAbsoluteUrl } from '@/api-utils/utils';
import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import ProductsSection from '@/components/common/ProductsSection';
import Toast from '@/components/common/Toast';
import { TwitterIconOutlined } from '@/components/icons';
import PricingCards from '@/components/twitter-screenshot/PricingCards';
import UrlForm from '@/components/twitter-screenshot/UrlForm';
import { NAVIGATION_HEADER_HEIGHT, products, URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Capture Twitter (X) Screen-shot in One Click, Free & Easy | TweetStormAI',
  description:
    'Capture screenshots from Twitter (X) instantly with this fast, free screen shot editor and downloader. Just paste the tweet link, edit and save screenshots in high quality.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.screenShot),
  },
};
function TwitterScreenShot() {
  return (
    <>
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>
      <div
        style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        className='mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4'
      >
        <div className='pt-12 sm:pt-16 lg:pt-20'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold flex flex-wrap items-center justify-center gap-2'>
            <span className='text-3xl sm:text-5xl lg:text-6xl'> Twitter</span>
            (<TwitterIconOutlined height='1em' width='1em' />)
            <span className='text-3xl sm:text-5xl lg:text-6xl'>ScreenShot</span>
            <span className='text-3xl sm:text-5xl lg:text-6xl'>Generator</span>
          </h1>
          <p className='text-center text-base sm:text-lg lg:text-xl mt-4 px-4'>
            Take Screenshots of Twitter (X) posts easily with our X Screenshot
            Tool.
          </p>
        </div>

        <div>
          <UrlForm />
        </div>

        <PricingCards />
        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.screenShot
          )}
        />
      </div>
      <Toast />
      <Footer />
    </>
  );
}

export default TwitterScreenShot;
