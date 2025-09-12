import { URLS } from '@/utils/constants';
import Link from 'next/link';
import { ReactNode } from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-16 responsive-pad bg-warm-light-gray dark:bg-primary-dark text-[15px] text-center xs:text-left'>
      <div className='max-content-w mx-auto space-y-20'>
        <div className='grid gap-x-[40px] gap-y-12 xs:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] items-start xs:justify-between'>
          <div>
            <h6 className='text-xl font-medium mb-6'>Bulk Actions</h6>
            <ul className='grid gap-y-3'>
              <li>
                <FooterLink href={URLS.massTweetDeletes}>
                  Mass Delete Tweets
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.deleteTwitterLikes}>
                  Delete Twitter Likes
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.massTwitterUnfollows}>
                  Mass Twitter Unfollows
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.massRetweets}>Mass Retweets</FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.twitterAutoLiker}>
                  Twitter Auto Liker
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.massTwitterFollows}>
                  Mass Twitter Follows
                </FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h6 className='text-xl font-medium mb-6'>Generators</h6>
            <ul className='grid gap-y-3'>
              <li>
                <FooterLink href={URLS.publicTweetGeneration}>
                  Tweet Generator
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.publicHashtagGeneration}>
                  Hashtag Generator
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.publicBioGeneration}>
                  Bio Generator
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.publicHandleGeneration}>
                  Handle Generator
                </FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h6 className='text-xl font-medium mb-6'>Other Tools</h6>
            <ul className='grid gap-y-3'>
              <li>
                <FooterLink href={URLS.publicTweetSearch}>
                  Advanced Twitter Search
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.videoDownloader}>
                  X Video Downloader
                </FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.screenShot}>
                  X Post Screenshot
                </FooterLink>
              </li>
            </ul>
          </div>
          <div className='space-y-12'>
            <div>
              <h6 className='text-xl font-medium mb-6'>Extensions</h6>
              <ul className='grid gap-y-3'>
                <li>
                  <FooterLink href={URLS.tweetGeneratorExtension}>
                    Tweet Generator
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={URLS.massTweetDeletionExtension}>
                    Mass Tweet Deletion
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h6 className='text-xl font-medium mb-6'>Resources</h6>
            <ul className='grid gap-y-3'>
              <li>
                <FooterLink href={URLS.blog}>Blog</FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.pricing}>Pricing</FooterLink>
              </li>
              <li>
                <FooterLink href='/#faqs'>FAQs</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h6 className='text-xl font-medium mb-6'>Company</h6>
            <ul className='grid gap-y-3'>
              <li>
                <FooterLink href={URLS.termsOfService}>Terms</FooterLink>
              </li>
              <li>
                <FooterLink href={URLS.privacyPolicy}>
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink href={`mailto:${process.env.MAIL_FROM_ADDRESS}`}>
                  Contact Us
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
          <div>
            <Link
              href='/'
              className='text-2xl font-bold leading-none text-primary-dark dark:text-white'
            >
              TweetStorm.ai
            </Link>
            <p className='text-sm mt-1.5 mx-auto'>
              Elevate your Twitter game with TweetStorm - <br />
              your ultimate AI Tweet Generator solution.
            </p>
          </div>
          <div className='text-sm'>
            <p>Copyright © {currentYear} TweetStorm.ai</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className='border-b border-b-transparent hover:border-b-current link-anim'
    >
      {children}
    </Link>
  );
}

export default Footer;
