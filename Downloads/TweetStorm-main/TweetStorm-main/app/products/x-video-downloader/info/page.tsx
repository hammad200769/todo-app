import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import Toast from '@/components/common/Toast';
import UrlForm from '@/components/video-downloader/UrlForm';
import VideoDownloader from '@/components/video-downloader/VideoDownloader';
import { NAVIGATION_HEADER_HEIGHT } from '@/utils/constants';
import { Metadata } from 'next';
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
function page() {
  return (
    <>
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>
      <div
        style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4'
      >
        <VideoDownloader />
        <div>
          <UrlForm downloadAgain='Download another video' />
        </div>
      </div>
      <Toast />

      <Footer />
    </>
  );
}

export default page;
