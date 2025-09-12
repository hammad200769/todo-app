import { getAbsoluteUrl } from '@/api-utils/utils';
import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import ProductsSection from '@/components/common/ProductsSection';
import Content from '@/components/video-downloader/Content';
import Heading from '@/components/video-downloader/Heading';
import UrlForm from '@/components/video-downloader/UrlForm';
import { NAVIGATION_HEADER_HEIGHT, products, URLS } from '@/utils/constants';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Download Twitter (X) Videos in One Click, Free & Easy | TweetStormAI',
  description:
    'Download videos from Twitter (X) instantly with this fast, free video downloader. Just paste the tweet link and save videos in high quality, no login required.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.videoDownloader),
  },
};

function Video() {
  return (
    <>
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>
      <div
        style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4'
      >
        <Heading
          headingType='Video Generator'
          text=' Download videos from Twitter (X) easily with our X Video Downloader.'
        />

        <UrlForm />

        <Content />

        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.videoDownloader
          )}
          className='mt-20!'
        />
      </div>
      <Footer />
    </>
  );
}

export default Video;
