import HashtagGeneratorSection from '@/components/hashtag-generator/HashtagGeneratorSection';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hashtags Generator',
  description: 'Generate hashtags for your next tweet.',
};

function HashtagGeneratorPage() {
  return <HashtagGeneratorSection />;
}

export default withAuthenticationProtection(HashtagGeneratorPage);
