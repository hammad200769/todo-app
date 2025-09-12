import { getAbsoluteUrl } from '@/api-utils/utils';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import { InlineLink } from '@/components/common/Links';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import ProductsSection from '@/components/common/ProductsSection';
import {
  FilterIcon,
  ProgressIcon,
  PuzzleIcon,
  ReachIcon,
  RocketIcon,
  SafeIcon,
  TrendIcon,
} from '@/components/icons';
import BestPracticesHeadingAndSubheading from '@/components/product-pages/BestPracticesHeadingAndSubheading';
import BestPracticesListContainer from '@/components/product-pages/BestPracticesListContainer';
import BestPracticesSectionContainer from '@/components/product-pages/BestPracticesSectionContainer';
import H3Heading from '@/components/product-pages/H3Heading';
import HeroSection from '@/components/product-pages/HeroSection';
import HowToSectionStepContainer from '@/components/product-pages/HowToSectionStepContainer';
import Introduction from '@/components/product-pages/Introduction';
import KeywordsSectionContainer from '@/components/product-pages/KeywordsSectionContainer';
import KeywordsSectionH4Heading from '@/components/product-pages/KeywordsSectionH4Heading';
import StepHeader from '@/components/product-pages/StepHeader';
import UseCasesHeadingAndSubheading from '@/components/product-pages/UseCasesHeadingAndSubheading';
import UseCasesListContainer from '@/components/product-pages/UseCasesListContainer';
import UseCasesSectionContainer from '@/components/product-pages/UseCasesSectionContainer';

import MassTweetCards from '@/components/public-generation/MassTweetCards';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX,
  NAVIGATION_HEADER_HEIGHT,
  products,
  URLS,
} from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mass Follow for Twitter - TweetStorm.ai',
  description:
    'Learn about the Mass Follow feature in the TweetStorm.ai browser extension to automate follows and grow your Twitter (X) audience.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.massTwitterFollows),
  },
};
const featureMeta = {
  heading: 'Features',
  subheading: 'Explore the features of our bulk follow tool.',
  description: (
    <>
      Discover why creators, marketers and recruiters trust TweetStorm&apos;s
      Mass Follow tool to grow safely and efficiently.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Explore the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      Discover how TweetStorm&apos;s auto-follow tool doesn&apos;t just save
      time, it accelerates your Twitter growth in ways manual work never could.
    </>
  ),
};
const benefitCards = [
  {
    title: 'Save Time & Effort',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          TweetStorm automates mass following, saving you hours of manual work
          so you can focus on growth and strategy.
        </p>
      </div>
    ),
    icon: <TrendIcon />,
  },
  {
    title: 'Targeted Engagement',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          With smart filters, every follow targets your niche, boosting
          follow-backs, engagement and community growth.
        </p>
      </div>
    ),
    icon: <RocketIcon />,
  },
  {
    title: 'Boost Visibility',
    description: (
      <div className='space-y-4'>
        <p>
          Auto-follow helps you follow others, so their tweets appear in your
          feed, not the other way around.
        </p>
      </div>
    ),
    icon: <ReachIcon />,
  },
];

const featureCards = [
  {
    title: 'Safe to Use',
    description: (
      <div className='space-y-4'>
        <p>
          TweetStorm safely automates mass follows by mimicking human behavior
          and letting you set session limits to stay within Twitter&apos;s
          rules.
        </p>
      </div>
    ),
    icon: <SafeIcon />,
  },
  {
    title: 'Sensible Filters',
    description: (
      <div className='space-y-4'>
        <p>
          Use smart filters to follow only relevant profiles, targeted growth
          that aligns with your brand and goals.
        </p>
      </div>
    ),
    icon: <FilterIcon />,
  },
  {
    title: 'Track Progress',
    description: (
      <div className='space-y-4'>
        <p>
          Track every follow in real time with TweetStorm&apos;s live counter,
          full transparency and control as you grow.
        </p>
      </div>
    ),
    icon: <ProgressIcon />,
  },
  {
    title: 'Easy to Use',
    description: (
      <div className='space-y-4'>
        <p>
          TweetStorm&apos;s clean, intuitive interface lets you skip the setup,
          just click, filter and grow with ease.
        </p>
      </div>
    ),
    icon: <PuzzleIcon />,
  },
];

const heroSectionFeatures = [
  'One-click bulk follows',
  'Targeted follows using keywords',
];

function Page() {
  return (
    <>
      <ClarityScript />
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>
      <div
        className='dark:bg-primary-dark-light'
        style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
      >
        <HeroSection
          heading='Mass Twitter Follows'
          subheading='Fast and filter-powered follows'
          features={heroSectionFeatures}
          videoUrl='/videos/mass-follows-demo.mp4'
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                <b>Mass Twitter Follows</b> is a powerful auto-follow feature
                available through the store, your all-in-one Twitter automation
                toolkit designed to simplify growth. With this extension, you
                can execute bulk actions like:
              </p>
              <ul className='list-disc list-inside mt-4 space-y-2'>
                <li>Mass follow targeted users</li>
                <li>Delete tweets in bulk</li>
                <li>Mass unfollow accounts</li>
                <li>Auto-like posts</li>
                <li>Schedule smart retweets</li>
              </ul>
              <p>
                All these tools are packaged into a seamless, browser-based
                experience built for creators, founders, recruiters and power
                users who want to scale without limits.
              </p>
              <p>
                What sets TweetStorm apart is its advanced targeting capability:
                you can follow accounts based on niche-specific filters like
                keywords, phrases or handle matches. This ensures you&apos;re
                not just growing numbers, you&apos;re growing relevant followers
                who care about your content.
              </p>
              <p>
                <b>Free Plan: </b>Follow up to 50 Twitter accounts/month using
                the free auto-follow tool.
                <br />
                <b>Need more reach? </b> Upgrade to a paid plan to unlock higher
                limits. Visit our{' '}
                <InlineLink href={URLS.pricing}>pricing page </InlineLink> for a
                detailed breakdown.
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />
            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-products.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass follow using TweetStorm in 6 steps: install, login, activate, follow, done.'
                  width={851}
                  height={315}
                />
              </div>
              <div className='space-y-12 mt-16'>
                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={1}
                      stepTitle='Install the Extension'
                    />
                    <p className='mt-4'>
                      <b>For Chrome</b>, click on{' '}
                      <InlineLink
                        target='blank'
                        decorated
                        href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                      >
                        this
                      </InlineLink>{' '}
                      link to get the extension. <b>For Firefox</b>, click on{' '}
                      <InlineLink
                        target='blank'
                        decorated
                        href={MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX}
                      >
                        this
                      </InlineLink>{' '}
                      link.
                    </p>
                    <p className='mt-3'>
                      Choose your browser and click “Add” on the extension page
                      to install TweetStorm in seconds.
                    </p>
                  </div>
                  <Image
                    src='/img/add-to-chrome.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm.ai Chrome extension page showing mass tweet deletion tool and “Add to Chrome” button.'
                    width={880}
                    height={442}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={2}
                      stepTitle='Login to TweetStorm'
                    />
                    <p className='mt-4'>
                      Visit Tweetstorm.ai to{' '}
                      <InlineLink decorated href={URLS.login}>
                        login
                      </InlineLink>{' '}
                      or{' '}
                      <InlineLink decorated href={URLS.signup}>
                        create an account
                      </InlineLink>
                      , it only takes a minute to get started.
                    </p>
                  </div>
                  <Image
                    src='/img/login-page.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm.ai login screen with options to sign in via Twitter, Google or email/password combo.  '
                    width={1916}
                    height={860}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={3}
                      stepTitle='Obtain Your Extension API Key'
                    />
                    <p className='mt-2'>
                      After logging in, head to Profile, scroll to Extension API
                      Key and copy your unique key.
                    </p>
                  </div>
                  <Image
                    src='/img/profile-page.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm.ai profile settings page showing API key for connecting extensions and user info panel.'
                    width={1000}
                    height={508}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div></div>
                  <Image
                    src='/img/copy-key-button.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm API key field with visible key and highlighted blue "COPY" and "GENERATE" buttons.'
                    width={809}
                    height={193}
                  />
                </HowToSectionStepContainer>

                <div className='space-y-6'>
                  <HowToSectionStepContainer>
                    <div>
                      <StepHeader
                        stepNumber={4}
                        stepTitle='Activate the Extension'
                      />
                      <p className='mt-4'>
                        Open the extension, paste your API key into the field
                        and hit <b>Save</b> to connect your account.
                      </p>
                    </div>

                    <Image
                      src='/img/activate-extension-mass-actions.webp'
                      className='rounded-md border dark:border-none lg:order-[-1]'
                      alt='TweetStorm.ai extension screen showing API key input field with Save button and registration links.'
                      width={450}
                      height={250}
                    />
                  </HowToSectionStepContainer>
                  <HowToSectionStepContainer>
                    <div>
                      <p>
                        Enter your Twitter handle when prompted, then click{' '}
                        <b>Save</b> to complete setup.
                      </p>
                    </div>

                    <Image
                      src='/img/twitter-handle.webp'
                      className='rounded-md border dark:border-none lg:order-[-1]'
                      alt='TweetStorm.ai extension showing Twitter handle input field with Save button to proceed.n'
                      width={450}
                      height={250}
                    />
                  </HowToSectionStepContainer>
                </div>
                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={5}
                      stepTitle='Prepare Mass Follow Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Follow from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-follows.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm.ai extension dropdown showing mass actions: delete, unlike, follow, unfollow, retweet.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <p>
                      You will see a set of filters that you can use to target
                      specific Twitter accounts for the mass follow process.
                      (You can learn more about each filter in{' '}
                      <InlineLink decorated href='#available-filters'>
                        {' '}
                        this
                      </InlineLink>{' '}
                      section.)
                    </p>
                  </div>
                  <Image
                    src='/img/mass-follows-filters.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm filter settings showing tweet type and keyword fields for precise mass follow.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader stepNumber={6} stepTitle='Start Mass Follow' />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-follow from a new tab with live progress and a Stop
                      button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-follow-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm following live with loading spinner, following count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Mass Follow</H2Heading>
              <p className='mt-4'>
                TweetStorm&apos;s bulk follow tool uses smart filters to target
                and connect only with the most relevant users, no random
                follows.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    Our keyword-based filters help you zero in on accounts that
                    matter to your brand, niche or goals. All filters are{' '}
                    <b>case-insensitive</b>, meaning “Marketing” and “marketing”
                    are treated the same.
                  </p>
                  <p>
                    Each field accepts a space-separated list of keywords and
                    you can choose how strict or broad the match should be:
                  </p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Only follows accounts that <b>contain all</b> the
                        keywords you entered.
                      </p>
                      <p>
                        Example: Input: <i>AI marketing tools</i> → Follows
                        accounts that mention all three terms.
                      </p>
                    </div>

                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>

                      <p>
                        Follow accounts that contain <b>at least one</b> of your
                        listed keywords.
                      </p>
                      <p>
                        Example: Input: <i>fitness fashion tech</i> → Follows
                        users who mention any of these.
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>
                      <p>
                        Targets accounts that include the <b>exact phrase</b>{' '}
                        you entered.
                      </p>
                      <p>
                        Example: Input: <i>UX Designer</i> → Follows only
                        accounts with that specific phrase.
                      </p>
                    </div>
                    <p>
                      These filters scan the{' '}
                      <b>name, handle and bio/description</b>
                      of Twitter accounts, giving you deep targeting capability
                      without lifting a finger.
                    </p>
                  </div>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='When to Use Mass Follow' />

                <UseCasesListContainer>
                  <div>
                    <H3Heading>Influencer & Content Creator Growth</H3Heading>
                    <p>
                      Use TweetStorm to follow niche creators and influencers,
                      grow your audience while building real connections and
                      opportunities.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Talent Sourcing & Recruiting</H3Heading>
                    <p>
                      Hiring? Use TweetStorm&apos;s keyword filters to find
                      talent, start conversations and recruit directly from
                      Twitter.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Event Promotion & Engagement</H3Heading>
                    <p>
                      Hosting an event? Use TweetStorm to mass follow attendees
                      and spark buzz, clicks, RSVPs and real-time interaction.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='Maximize TweetStorm’s Mass Follow tool with smart tips that boost growth safely, just like the pros do.' />
                <BestPracticesListContainer>
                  <div>
                    <H3Heading>Limit Number of Follows</H3Heading>
                    <p>
                      Stay under Twitter&apos;s radar by capping follows at
                      50-100/day and prioritizing consistent, high-quality
                      growth.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Follow Users in Your Niche</H3Heading>
                    <p>
                      Target followers in your niche using relevant keywords to
                      boost follow-backs, engagement and true community growth.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Engage After Following</H3Heading>
                    <p>
                      Following gets you noticed, engaging after builds real
                      connections. Like, retweet or reply to stand out.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Optimize Timing of Your Sessions</H3Heading>
                    <p>
                      Boost follow-backs by running mass follow sessions when
                      your audience is most active, timing drives visibility and
                      growth.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.massTwitterFollows
              )}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Page;
