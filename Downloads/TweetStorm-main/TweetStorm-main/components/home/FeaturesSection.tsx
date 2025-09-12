import CurrentDate from '@/components/home/CurrentDate';
import Feature from '@/components/home/Feature';
import FeatureCta from '@/components/home/FeatureCta';
import FeatureDescription from '@/components/home/FeatureDescription';
import FeatureHeading from '@/components/home/FeatureHeading';
import TypedTweet from '@/components/home/TypedTweet';
import { ExternalLinkIcon } from '@/components/icons';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK,
  URLS,
} from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import H2Heading from '../ai-tweet-generator/H2Heading';

function FeaturesSection() {
  return (
    <section className='pt-20 responsive-pad' id='features'>
      <div className='max-w-5xl mx-auto text-center md:text-left'>
        <H2Heading className='text-center text-[48px]! mb-10'>
          Features
        </H2Heading>
        <div className='space-y-20'>
          <Feature>
            <div className='md:w-1/2 space-y-6'>
              <div className='space-y-2'>
                <FeatureHeading>AI Tweet Generation 📝</FeatureHeading>
                <FeatureDescription>
                  Stay ahead of the competition with AI-generated tweets that
                  keeps your Twitter feed fresh and relevant.
                </FeatureDescription>
              </div>
              <FeatureCta href={URLS.publicTweetGeneration}>
                Generate Tweet ✨
              </FeatureCta>
            </div>
            <div className='md:w-1/2 bg-white dark:text-neutral-gray rounded-lg shadow-md border'>
              <TypedTweet />
              <div className='border-t flex-c border-gray-200 p-4'>
                <CurrentDate />
              </div>
            </div>
          </Feature>

          <Feature reverse>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>AI Tweet Generator Extension</FeatureHeading>
                <FeatureDescription>
                  Get the most out of tweetstorm using our free browser
                  extension to generate engaging tweets and replies within
                  seconds from within twitter&apos;s website. No credit card
                  required.
                </FeatureDescription>
              </div>
              <Link
                href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                target='_blank'
                className='bg-primary text-white gap-2 inline-flex rounded-lg cta-shadow hover:bg-primary-hover link-anim px-5 py-2 focus:shadow-none'
              >
                <span>
                  <ExternalLinkIcon />
                </span>
                <span>Get Browser Extension</span>
              </Link>
            </div>
            <div className='md:w-1/2'>
              <Image
                src={'/img/extension-tweet.png'}
                alt='tweetstorm browser extension demo'
                width={589}
                height={447}
                sizes='(max-width: 768px) 100vw, 50vw'
                className='rounded-lg mx-auto shadow-md border'
              />
            </div>
          </Feature>
          <Feature>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>Bulk Action Extension</FeatureHeading>
                <FeatureDescription>
                  Bulk delete tweets, follow or unfollow users, like, unlike, or
                  retweet — all with smart filters for keywords, dates,
                  accounts, and engagement activity (replies, likes, retweets).
                </FeatureDescription>
              </div>
              <Link
                href={MASS_TWEET_DELETIONS_EXTENSION_LINK}
                target='_blank'
                className='bg-primary text-white gap-2 inline-flex rounded-lg cta-shadow hover:bg-primary-hover link-anim px-5 py-2 focus:shadow-none'
              >
                <span>
                  <ExternalLinkIcon />
                </span>
                <span>Get Browser Extension</span>
              </Link>
            </div>
            <div className='md:w-1/2'>
              <Image
                src={'/img/bulk-action-extension.png'}
                alt='tweetstorm browser extension demo'
                width={640}
                height={400}
                sizes='(max-width: 768px) 100vw, 50vw'
                className='rounded-lg mx-auto shadow-md border'
              />
            </div>
          </Feature>
          <Feature reverse>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>Advanced Twitter Search</FeatureHeading>
                <FeatureDescription>
                  Use Advanced X Search feature using our intuitive ui. Search
                  tweets by date, users, location and more. Save your searches
                  for later use.
                </FeatureDescription>
              </div>
              <Link
                href={URLS.publicTweetSearch}
                target='_blank'
                className='bg-primary text-white gap-2 inline-flex rounded-lg cta-shadow hover:bg-primary-hover link-anim px-5 py-2 focus:shadow-none'
              >
                <span></span>
                <span>Search Tweets ✨</span>
              </Link>
            </div>
            <div className='md:w-1/2'>
              <Image
                src={'/img/advanced-twitter-search.png'}
                alt='tweetstorm advanced twitter search demo'
                width={480}
                height={300}
                className='rounded-lg mx-auto shadow-md border'
              />
            </div>
          </Feature>

          <Feature>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>Hashtags Generator 🔥</FeatureHeading>
                <FeatureDescription>
                  Stay on top of trending topics and hashtags, seamlessly
                  incorporating them into your tweets for maximum reach and
                  visibility.
                </FeatureDescription>
              </div>
              <FeatureCta href={URLS.publicHashtagGeneration}>
                Generate Hashtags ✨
              </FeatureCta>
            </div>
            <div className='md:w-1/2 mx-auto'>
              <Image
                src='/img/hashtag.webp'
                alt='hashtag image'
                height={284}
                width={452}
              />
            </div>
          </Feature>

          <Feature reverse>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>Unique Bio Creation 🌟</FeatureHeading>
                <FeatureDescription>
                  Stand out from the crowd with distinctive and engaging twitter
                  bios that showcase your brand&apos;s personality. Attract your
                  target audience now with our AI-generated bios.
                </FeatureDescription>
              </div>
              <FeatureCta href={URLS.publicBioGeneration}>
                Generate Bio ✨
              </FeatureCta>
            </div>
            <div className='md:w-1/2'>
              <Image
                src={'/img/bio-generation.png'}
                alt='demo for bio generation using tweetstorm'
                width={480}
                height={600}
                className='rounded-lg mx-auto shadow-md border'
              />
            </div>
          </Feature>

          <Feature>
            <div className='md:w-1/2 space-y-8'>
              <div className='space-y-2'>
                <FeatureHeading>Twitter Handle Generator 💡</FeatureHeading>
                <FeatureDescription>
                  Our AI-powered generator will craft unique and catchy Twitter
                  usernames that resonate with your target audience, making your
                  brand unforgettable.
                </FeatureDescription>
              </div>
              <FeatureCta href={URLS.publicHandleGeneration}>
                Generate Handles ✨
              </FeatureCta>
            </div>
            <div className='md:w-1/2 mx-auto'>
              <Image
                src='/img/user-profile-image.webp'
                alt='user profile image'
                width={470}
                height={307}
              />
            </div>
          </Feature>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
