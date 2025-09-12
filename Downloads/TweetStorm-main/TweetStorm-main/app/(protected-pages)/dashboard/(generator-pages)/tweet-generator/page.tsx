import TweetGeneratorSection from '@/components/tweet-generator/TweetGeneratorSection';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tweet Generator',
  description: 'Generate your next tweet.',
};

function DashboardPage() {
  return <TweetGeneratorSection />;
}

export default withAuthenticationProtection(DashboardPage);
