import BioGeneratorSection from '@/components/bio-generator/BioGeneratorSection';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bio Generator',
  description: 'Generate bio for your twitter account.',
};

function BioGeneratorPage() {
  return <BioGeneratorSection />;
}

export default withAuthenticationProtection(BioGeneratorPage);
