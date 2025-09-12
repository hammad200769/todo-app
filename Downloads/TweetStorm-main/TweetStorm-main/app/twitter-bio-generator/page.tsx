import { getAbsoluteUrl } from '@/api-utils/utils';
import ProductsSection from '@/components/common/ProductsSection';
import { BriefcaseIcon, ClockIcon, ProfileIcon } from '@/components/icons';
import BioGeneratorArticle from '@/components/public-generation/BioGeneratorArticle';
import BioGeneratorSection from '@/components/public-generation/BioGeneratorSection';
import GenerationSubtitle from '@/components/public-generation/GenerationSubtitle';
import GenerationTitle from '@/components/public-generation/GenerationTitle';
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
  title: 'Twitter Bio Generator - TweetStorm.ai',
  description:
    'Enhance your Twitter profile with AI-generated twitter bio tailored to your personality and interests.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.publicBioGeneration),
  },
};

const benefitCards = [
  {
    title: 'Personalized Bios',
    description:
      'Create unique Twitter bios that reflect your personality and interests, setting your profile apart from the rest.',
    icon: <ProfileIcon />,
  },
  {
    title: 'Time-saving',
    description:
      'Let our AI bio generator craft compelling bios for you, saving you time and effort in writing and editing.',
    icon: <ClockIcon />,
  },
  {
    title: 'Professional Profiles',
    description:
      'Elevate your Twitter presence with polished and professional bios that leave a lasting impression on visitors.',
    icon: <BriefcaseIcon />,
  },
];

function TwitterBioGeneratorPage() {
  return (
    <>
      <ClarityScript />
      <PublicGenerationPageLayout>
        <MainGenerationSection>
          <GenerationTitle>Twitter Bio Generator</GenerationTitle>
          <GenerationSubtitle>
            Tell us about yourself and we&apos;ll write you an awesome bio
          </GenerationSubtitle>
          <div className='mx-auto mt-16'>
            <BioGeneratorSection />
          </div>
        </MainGenerationSection>
        <MoreToolsSection />
        <BioGeneratorArticle />
        <Benefits
          benefitCards={benefitCards}
          subheading='Explore the benefits of our AI Twitter Bio Generator'
        />
        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.publicBioGeneration
          )}
        />
      </PublicGenerationPageLayout>
    </>
  );
}

export default TwitterBioGeneratorPage;
