import { getAbsoluteUrl } from '@/api-utils/utils';
import ClarityScript from '@/components/common/ClarityScript';
import ProductsSection from '@/components/common/ProductsSection';
import { BriefcaseIcon, FingerPrintIcon, SearchIcon } from '@/components/icons';
import Benefits from '@/components/public-generation/Benefits';
import GenerationSubtitle from '@/components/public-generation/GenerationSubtitle';
import GenerationTitle from '@/components/public-generation/GenerationTitle';
import HandleGeneratorArticle from '@/components/public-generation/HandleGeneratorArticle';
import MainGenerationSection from '@/components/public-generation/MainGenerationSection';
import MoreToolsSection from '@/components/public-generation/MoreToolsSection';
import PublicGenerationPageLayout from '@/components/public-generation/PublicGenerationPageLayout';
import TwitterHandleGeneratorSection from '@/components/public-generation/TwitterHandleGeneratorSection';
import { products, URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Twitter Handles Generator - TweetStorm.ai',
  description:
    'Elevate your Twitter profile with AI-generated twitter handles tailored to your interests and preferences.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.publicHandleGeneration),
  },
};

const benefitCards = [
  {
    title: 'Easy Discovery',
    description:
      "Optimize your profile's discoverability with twitter handles that are easy to remember and search for.",
    icon: <SearchIcon />,
  },
  {
    title: 'Brand Alignment',
    description:
      'Generate Twitter handles that align with your brand identity, helping to reinforce brand recognition and consistency across social media platforms.',
    icon: <BriefcaseIcon />,
  },
  {
    title: 'Unique Handles',
    description:
      'Discover unique Twitter handles that set your profile apart and make a memorable impression on followers.',
    icon: <FingerPrintIcon />,
  },
];

function TwitterHandleGeneratorPage() {
  return (
    <>
      <ClarityScript />
      <PublicGenerationPageLayout>
        <MainGenerationSection>
          <GenerationTitle>Twitter Handle Generator</GenerationTitle>
          <GenerationSubtitle>
            Write any topic on which to generate handles, and we will generate 5
            twitter handles for you
          </GenerationSubtitle>
          <div className='mx-auto mt-20'>
            <TwitterHandleGeneratorSection />
          </div>
        </MainGenerationSection>
        <MoreToolsSection />
        <HandleGeneratorArticle />
        <Benefits
          benefitCards={benefitCards}
          subheading='Explore the benefits of our AI Twitter Handle Generator'
        />
        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.publicHandleGeneration
          )}
        />
      </PublicGenerationPageLayout>
    </>
  );
}

export default TwitterHandleGeneratorPage;
