import { getAbsoluteUrl } from '@/api-utils/utils';
import ProductsSection from '@/components/common/ProductsSection';
import { FaqsHomePage, products } from '@/utils/constants';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LandingPageMainSection = dynamic(
  () => import('@/components/common/LandingPageMainSection'),
  { ssr: true }
);
const FeaturesSection = dynamic(
  () => import('@/components/home/FeaturesSection'),
  { ssr: true }
);
const PricingSection = dynamic(
  () => import('@/components/home/PricingSection'),
  { ssr: true }
);
const FaqSection = dynamic(() => import('@/components/common/FaqsSection'), {
  ssr: true,
});

const ClarityScript = dynamic(
  () => import('@/components/common/ClarityScript'),
  { ssr: false }
);
const Footer = dynamic(() => import('@/components/common/Footer'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Twitter Automation, Growth and Cleanup Tools - TweetStorm.ai',
  description:
    'Increase your X productivity with AI. Generate tweets, bios, hashtags, and handles, plus smart replies, advanced search, X automation tools, and browser extensions.',
  alternates: {
    canonical: getAbsoluteUrl(),
  },
};

export default function HomePage() {
  return (
    <>
      <ClarityScript />
      <main className='dark:bg-primary-dark-light mb-20'>
        <LandingPageMainSection />
        <FeaturesSection />
        <PricingSection />

        <div className='responsive-pad'>
          <FaqSection accordionItems={FaqsHomePage} />
          <ProductsSection products={products} className='mt-20!' />
        </div>
      </main>
      <Footer />
    </>
  );
}
