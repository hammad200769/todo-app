import { getAbsoluteUrl } from '@/api-utils/utils';
import BlogCards from '@/components/blogs/BlogCards';
import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import { NAVIGATION_HEADER_HEIGHT, URLS } from '@/utils/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TweetStorm.ai - Blogs',
  description:
    'Read our TweetStorm blogs to unleash the power of AI for Twitter success.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.blog),
  },
};

interface BlogPageProps {
  searchParams: { page?: string };
}

function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <>
      <ClarityScript />
      <div className='bg-soft-white dark:bg-primary-dark-light'>
        <StickyNavigationWrapper>
          <NavigationMenu />
        </StickyNavigationWrapper>

        <main
          className='responsive-pad dark:text-soft-white'
          style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        >
          <div className='max-w-5xl mx-auto '>
            <section>
              <div className='py-12 lg:py-16'>
                <div className='mx-auto max-w-(--breakpoint-sm) text-center mb-16'>
                  <h1 className='mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold'>
                    The TweetStorm Blog
                  </h1>
                  <p className='font-light sm:text-xl'>
                    Read our TweetStorm blogs to unleash the power of AI for
                    Twitter success
                  </p>
                </div>

                <BlogCards searchParams={searchParams} />
              </div>
            </section>

            <div className='mt-20 pb-20'>
              <article className='text-left  border dark:bg-primary-dark-light border-gray-700 rounded-lg p-6 md:p-12 lg:p-16 lg:flex lg:items-center lg:justify-between'>
                <div className='rounded-lg'>
                  <h2 className='text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10'>
                    <span className='text-primary dark:text-indigo-500'>
                      Boost Your Twitter Success
                    </span>
                    <br />
                    Using AI Tweet Generator
                  </h2>
                  <p className='w-full mt-4 text-base leading-6 md:w-3/4'>
                    Experience the power of our AI Tweet Generator to create
                    engaging content that captivates your audience.
                  </p>
                </div>
                <div className='flex w-full md:w-auto lg:shrink-0 mt-10 lg:mt-0'>
                  <Link
                    href={URLS.signup}
                    className='transition-all text-white rounded-xl bg-linear-to-br from-primary to-blue-500 hover:bg-linear-to-bl focus:ring-1 focus:outline-hidden focus:ring-blue-300 px-8 py-4 text-lg font-bold duration-200 focus:ring-offset-2 cta-shadow'
                    role='button'
                  >
                    🚀 Get started
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default BlogPage;
