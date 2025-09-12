import { getAbsoluteUrl } from '@/api-utils/utils';
import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import { BackArrowIcon } from '@/components/icons';
import { handleServerError } from '@/middlewares';
import { NAVIGATION_HEADER_HEIGHT, URLS } from '@/utils/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

function getMetaDescription(slug: string) {
  if (slug.startsWith('ai-tweet-generator'))
    return 'Discover how TweetStorm.ai uses GPT-4 to revolutionize your Twitter presence. Generate captivating tweets and unique twitter handles, find trending hashtags, and create unique bios effortlessly!';
  return 'Explore the power of GPT-4 with TweetStorm.ai, transforming your Twitter presence. Craft engaging tweets and unique twitter handles, uncover trending hashtags, and craft distinctive bios effortlessly!';
}

async function getBlogPosts(slug: string) {
  const apiUrl = `${process.env.GHOST_API_URL}/ghost/api/content/posts/slug/${slug}/`;
  const apiKey = process.env.GHOST_CONTENT_API_KEY;
  const url = `${apiUrl}?key=${apiKey}&limit=5&include=tags,authors`;
  try {
    const response = await fetch(url, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let blogPost;

  try {
    blogPost = await getBlogPosts(params.slug);
    if (
      !blogPost ||
      !blogPost.posts ||
      !Array.isArray(blogPost.posts) ||
      blogPost.posts.length === 0
    ) {
      return {
        title: `Blog Post Not Found - Tweetstorm.ai`,
        description: getMetaDescription(params.slug),
        alternates: {
          canonical: getAbsoluteUrl(`${URLS.blog}/${params.slug}`),
        },
      };
    }
    const post = blogPost.posts[0];

    return {
      title: `${post.meta_title}`,
      description: post?.excerpt || getMetaDescription(params.slug),
      alternates: {
        canonical: getAbsoluteUrl(`${URLS.blog}/${params.slug}`),
      },
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || '',
        url: getAbsoluteUrl(`${URLS.blog}/${params.slug}`),
        images: [
          {
            url: post.og_image || '',
            width: 1200,
            height: 630,
            alt: 'TweetStorm.ai Blog Post',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.twitter_title || post.title,
        description: post.meta_description || post.excerpt || '',
        images: post.twitter_image ? [post.twitter_image] : [],
      },
    };
  } catch (err) {
    handleServerError({
      err,
      key: 'blog-post-page-metadata-generation',
      metadata: { slug: params.slug, blogPost },
    });
    throw err;
  }
}

async function BlogPostPage({ params }: { params: { slug: string } }) {
  let blogPost;
  try {
    blogPost = await getBlogPosts(params.slug);
    if (
      !blogPost ||
      !blogPost.posts ||
      !Array.isArray(blogPost.posts) ||
      blogPost.posts.length === 0
    ) {
      notFound();
    }
    return (
      <>
        <ClarityScript />
        <div className='bg-soft-white dark:bg-primary-dark-light dark:text-soft-white'>
          <StickyNavigationWrapper>
            <NavigationMenu />
          </StickyNavigationWrapper>

          <main
            className='responsive-pad'
            style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
          >
            <div className='max-w-[800px] mx-auto py-8 lg:py-16'>
              <section className='px-2 lg:px-10'>
                <Link href={URLS.blog} className='inline-flex items-center'>
                  <BackArrowIcon />
                  Back to Blog
                </Link>
                <article className='mt-8 py-10'>
                  <div className='prose prose-custom mb-10'>
                    <h1>{blogPost.posts[0].title}</h1>
                  </div>
                  <div
                    className='prose prose-custom'
                    dangerouslySetInnerHTML={{ __html: blogPost.posts[0].html }}
                  ></div>
                </article>
              </section>
              <div className='mt-20'>
                <article className='text-left border border-gray-700 rounded-lg p-6 md:p-12 lg:p-16 lg:flex lg:items-center lg:justify-between'>
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
  } catch (err) {
    if ((err as any).digest !== 'NEXT_NOT_FOUND') {
      handleServerError({
        err,
        key: 'blog-post-page',
        metadata: { blogPost, slug: params.slug },
      });
    }
    throw err;
  }
}

export default BlogPostPage;
