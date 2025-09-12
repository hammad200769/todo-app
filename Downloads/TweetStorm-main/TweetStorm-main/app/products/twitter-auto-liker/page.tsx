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
  RelevanceIcon,
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
  MASS_TWEET_DELETIONS_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX,
  NAVIGATION_HEADER_HEIGHT,
  products,
  URLS,
} from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Twitter Auto Liker - TweetStorm.ai',
  description:
    'Boost your Twitter engagement with our Auto Liker: automatically like tweets matching your filters and grow your presence and visibility.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.twitterAutoLiker),
  },
};

const benefitCards = [
  {
    title: 'Save Time & Effort',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Automate liking with TweetStorm, engage 24/7, keep active effortlessly
          and focus on real connections.
        </p>
      </div>
    ),
    icon: <TrendIcon />,
  },
  {
    title: 'Targeted Visibility',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Auto-like filtered tweets with TweetStorm to get noticed by key users
          and boost intentional profile visibility.
        </p>
      </div>
    ),
    icon: <RocketIcon />,
  },
  {
    title: 'Relationship Building',
    description: (
      <div className='space-y-4'>
        <p>
          Use TweetStorm to like tweets, build rapport, spark conversations and
          foster lasting connections in your community.
        </p>
      </div>
    ),
    icon: <ReachIcon />,
  },
  {
    title: 'Avoid Account Suspension',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          TweetStorm keeps likes safe by mimicking human actions with limits,
          pauses and natural scrolling to avoid flags.
        </p>
      </div>
    ),
    icon: <RelevanceIcon />,
  },
];

const featureCards = [
  {
    title: 'Safe to Use',
    description: (
      <div className='space-y-4'>
        <p>
          Deletes in smart intervals, mimics natural activity to stay under
          Twitter&apos;s radar and avoid account flags.
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
          Use TweetStorm&apos;s filters, keywords, dates and engagement, to
          auto-like only tweets that truly matter to you.
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
          Track every like live with TweetStorm&apos;s progress panel, see
          counts, session status and stop anytime for full control.
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
          TweetStorm&apos;s clean, intuitive interface makes setup and
          automation fast, easy and fully customizable for all users.
        </p>
      </div>
    ),
    icon: <PuzzleIcon />,
  },
];

const featureMeta = {
  heading: 'Features',
  subheading: 'Explore the powerful features of our mass tweet deletion tool.',
  description: (
    <>
      TweetStorm&apos;s Auto Liker delivers effortless, safe engagement, built
      for smart users who want consistent visibility.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Discover the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      TweetStorm&apos;s Auto Liker is your shortcut to greater visibility,
      faster engagement and smarter Twitter growth.
    </>
  ),
};

const heroSectionFeatures = [
  'One-click bulk likes',
  'Targeted likes using keywords, date and more',
  'Like posts from specific accounts',
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
          heading='Twitter Auto Liker'
          subheading='Auto-like targeted tweets'
          features={heroSectionFeatures}
          videoUrl='/videos/mass-likes-demo.mp4'
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                <b>Twitter Auto Liker</b> is an automated bulk-like feature
                built into the TweetStorm browser extension, designed to help
                you grow engagement by interacting with the right content at
                scale.
              </p>
              <p>
                This extension is more than just a Twitter like bot. It&apos;s
                part of a complete automation toolkit that allows you to:
              </p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>Auto-like targeted tweets</li>
                <li>Mass delete tweets</li>
                <li>Auto-follow relevant users</li>
                <li> Unlike tweets in bulk</li>
              </ul>
              <p>
                With smart targeting filters, you can choose exactly which
                tweets to like, based on keywords, engagement, author and more,
                ensuring every auto-like helps your profile reach the right
                audience.
              </p>
              <p>
                <b>Free Plan:</b> You can automatically like up to 100 tweets
                per month using the free version.
              </p>
              <p>
                <b>Need more reach?</b> Upgrade to a paid plan and scale your
                engagement. Visit the{' '}
                <InlineLink decorated href={URLS.pricing}>
                  pricing page
                </InlineLink>{' '}
                for full details.
              </p>
              <p>
                <InlineLink
                  decorated
                  href={MASS_TWEET_DELETIONS_EXTENSION_LINK}
                >
                  Install
                </InlineLink>{' '}
                the TweetStorm Mass Likes extension today and turn passive
                scrolling into powerful visibility.
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />
            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-mass-likes.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass like tweets using TweetStorm in 6 steps: install, login, activate, like, done.'
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
                      stepTitle='Prepare Mass Likes Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Tweets Like from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-likes.webp'
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
                      specific Twitter accounts for the mass auto-like process.
                      (You can learn more about each filter in{' '}
                      <InlineLink decorated href='#available-filters'>
                        {' '}
                        this
                      </InlineLink>{' '}
                      section.)
                    </p>
                  </div>
                  <Image
                    src='/img/mass-likes-filters.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm filter settings showing tweet type and keyword fields for precise mass likes.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader stepNumber={6} stepTitle='Start Mass Likes' />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-mass like tweets from a new tab with live progress
                      and a Stop button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-likes-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm liking tweets live with loading spinner, like count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Auto Likes</H2Heading>
              <p className='mt-4'>
                Why like randomly when you can like <b>strategically</b>?
              </p>
              <p>
                TweetStorm&apos;s Auto Liker puts you in full control with
                precision filters that let you decide exactly which tweets
                deserve your engagement.
              </p>
              <p>
                Whether you&apos;re targeting posts by topic, popularity or
                author, these smart filters help you{' '}
                <b>maximize the value of every like</b>.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    TweetStorm provides three types of keyword matching to
                    ensure you&apos;re liking only the most relevant tweets.
                    Each input accepts a <b>space-separated list of keywords</b>{' '}
                    and all matches are <b>case-insensitive</b>.
                  </p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Only likes tweets that include <b>all</b> the entered
                        keywords.
                      </p>
                      <p>
                        <i>Example:</i> Input: <i>growth hacking SaaS</i> →
                        Likes tweets that contain all three terms.
                      </p>
                    </div>

                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>

                      <p>
                        Likes tweets that include <b>at least one</b> of the
                        entered keywords.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>marketing crypto fitness</i> →
                        Likes tweets containing any of these words.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>

                      <p>
                        Targets tweets containing the <b>exact</b> phrase you
                        provide.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>AI content strategy</i> →
                        Likes tweets that include this precise wording.{' '}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <H3Heading>Date Range</H3Heading>
                  <p>
                    Set custom date ranges with TweetStorm to auto-like tweets
                    from recent trends or past campaigns, on your terms.
                  </p>
                </div>
                <div>
                  <H3Heading>From Account</H3Heading>
                  <p>
                    Engage with tweets from <b>a specific Twitter account</b> by
                    entering their handle (e.g., <i>@elonmusk</i>).
                  </p>
                </div>

                <div>
                  <H3Heading>Minimum Replies</H3Heading>
                  <p>
                    Only like tweets that are driving conversation. Set a{' '}
                    <b>reply threshold</b> to target tweets with at least that
                    number of replies.
                  </p>
                </div>
                <div>
                  <H3Heading>Minimum Retweets</H3Heading>
                  <p>
                    Set a <b>retweet threshold</b> to ensure you only like posts
                    that are gaining traction and spreading widely.
                  </p>
                </div>
                <div>
                  <H3Heading>Minimum Likes</H3Heading>
                  <p>
                    Only like tweets that have proven value. This filter helps
                    you auto-like tweets that have{' '}
                    <b>at least a minimum number of likes.</b>
                  </p>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='When to Use Automated Likes' />
                <p>
                  TweetStorm&apos;s Auto Liker quietly boosts visibility and
                  audience growth behind the scenes, letting you focus on what
                  matters.
                </p>
                <UseCasesListContainer>
                  <div>
                    <H3Heading>Increase Engagement & Visibility</H3Heading>
                    <p>
                      Use TweetStorm to auto-like niche tweets, stay active and
                      boost profile impressions and follower growth
                      effortlessly.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Event Promotion & Hype Generation</H3Heading>
                    <p>
                      Hosting an event? Auto-like hashtagged tweets with
                      TweetStorm to boost buzz and engagement without lifting a
                      finger.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Hashtag Campaign Amplification</H3Heading>
                    <p>
                      Boost your hashtag campaign, auto-like every tagged post
                      with TweetStorm to reward engagement and keep momentum
                      alive.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='Follow these tips to maximize TweetStorm’s Auto Liker for safe, strategic and effective engagement.' />
                <BestPracticesListContainer>
                  <div>
                    <H3Heading>Limit Number of Likes</H3Heading>
                    <p>
                      Avoid flags, limit likes per session, space them out and
                      keep your activity consistent with TweetStorm.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Choose Keywords Strategically</H3Heading>
                    <p>
                      Target likes precisely with relevant keywords, avoid vague
                      terms to boost meaningful engagement with TweetStorm.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Rotate & Refine Keywords</H3Heading>
                    <p>
                      Refresh keywords often, track performance and optimize
                      your filters to sustain steady Twitter growth with
                      TweetStorm.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.twitterAutoLiker
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
