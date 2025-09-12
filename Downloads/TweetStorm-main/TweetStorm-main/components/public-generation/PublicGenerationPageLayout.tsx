import { NAVIGATION_HEADER_HEIGHT } from '@/utils/constants';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import NavigationMenu from '../common/navigation/NavigationMenu';
import StickyNavigationWrapper from '../common/navigation/StickyNavigationWrapper';
const Footer = dynamic(() => import('../common/Footer'));
type PublicGenerationPageLayoutProps = {
  children: ReactNode;
};

function PublicGenerationPageLayout({
  children,
}: PublicGenerationPageLayoutProps) {
  return (
    <>
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>

      <main
        className='pb-8 lg:pb-24 responsive-pad'
        style={{ paddingTop: NAVIGATION_HEADER_HEIGHT + 40 }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

export default PublicGenerationPageLayout;
