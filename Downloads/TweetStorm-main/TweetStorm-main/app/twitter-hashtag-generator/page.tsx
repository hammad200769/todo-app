import { getAbsoluteUrl } from '@/api-utils/utils';
import ProductsSection from '@/components/common/ProductsSection';
import { EyeIcon, MegaPhoneIcon, SearchIcon } from '@/components/icons';
import GenerationSubtitle from '@/components/public-generation/GenerationSubtitle';
import GenerationTitle from '@/components/public-generation/GenerationTitle';
import HashtagGeneratorArticle from '@/components/public-generation/HashtagGeneratorArticle';
import HashtagGeneratorSection from '@/components/public-generation/HashtagGeneratorSection';
import MainGenerationSection from '@/components/public-generation/MainGenerationSection';
import MoreToolsSection from '@/components/public-generation/MoreToolsSection';
import PublicGenerationPageLayout from '@/components/public-generation/PublicGenerationPageLayout';
import { products, URLS } from '@/utils/constants';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const ClarityScript = dynamic(
  () => import('@/components/common/ClarityScript'),
  { ssr: false }
);
const Benefits = dynamic(
  () => import('@/components/public-generation/Benefits')
);

export const metadata: Metadata = {
  title: 'AI Hashtag Generator - TweetStorm.ai',
  description:
    'Maximize your social media reach with AI-generated hashtags tailored to your content.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.publicHashtagGeneration),
  },
};

const benefitCards = [
  {
    title: 'Enhanced Discoverability',
    description:
      'Generate hashtags that increase the discoverability of your content, helping you reach a broader audience interested in your niche.',
    icon: <SearchIcon />,
  },
  {
    title: 'Campaign Effectiveness',
    description:
      'Generate hashtags optimized for specific marketing campaigns, maximizing the effectiveness of your promotional efforts.',
    icon: <MegaPhoneIcon />,
  },
  {
    title: 'Brand Visibility',
    description:
      "Craft branded hashtags that amplify your brand's visibility, fostering a sense of community among your followers.",
    icon: <EyeIcon />,
  },
];

function TwitterHashtagGeneratorPage() {
  return (
    <>
      <ClarityScript />
      <PublicGenerationPageLayout>
        <MainGenerationSection>
          <GenerationTitle>Twitter Hashtag Generator</GenerationTitle>
          <GenerationSubtitle>
            Enter any topic, and get a list of the best hashtags
          </GenerationSubtitle>
          <div className='mt-20 mx-auto'>
            <HashtagGeneratorSection />
          </div>
        </MainGenerationSection>
        <MoreToolsSection />
        <HashtagGeneratorArticle />
        <Benefits
          benefitCards={benefitCards}
          subheading='Explore the benefits of our AI Hashtag Generator'
        />
        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.publicHashtagGeneration
          )}
        />
      </PublicGenerationPageLayout>
    </>
  );
}

export default TwitterHashtagGeneratorPage;
