import { getAbsoluteUrl } from '@/api-utils/utils';
import Toast from '@/components/common/Toast';
import ContactForm from '@/components/contact-us/ContactForm';
import { withAuthenticationProtection } from '@/hocs';
import { URLS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'TweetStorm Contact Us',
  alternates: {
    canonical: getAbsoluteUrl(URLS.contactUs),
  },
};

function ContactUsPage() {
  return (
    <div>
      <ContactForm />
      <Toast />
    </div>
  );
}

export default withAuthenticationProtection(ContactUsPage);
