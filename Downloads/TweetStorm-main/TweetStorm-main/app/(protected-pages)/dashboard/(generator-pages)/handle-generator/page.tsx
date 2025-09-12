import TwitterHandleGeneratorSection from '@/components/handle-generator/TwitterHandleGeneratorSection';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handle Generator',
  description: 'Generate handles for your twitter account.',
};

function HandleGeneratorPage() {
  return <TwitterHandleGeneratorSection />;
}

export default withAuthenticationProtection(HandleGeneratorPage);
