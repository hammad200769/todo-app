import { getAbsoluteUrl } from '@/api-utils/utils';
import PricingSection from '@/components/common/pricing/PricingSection';
import PublicGenerationPageLayout from '@/components/public-generation/PublicGenerationPageLayout';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - TweetStorm.ai',
  description: 'Choose the most appropriate pricing plan based on your needs.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.pricing),
  },
};

function PricingPage() {
  return (
    <PublicGenerationPageLayout>
      <PricingSection />
    </PublicGenerationPageLayout>
  );
}

export default PricingPage;
