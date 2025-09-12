import { getAbsoluteUrl } from '@/api-utils/utils';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import { InlineLink } from '@/components/common/Links';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import ProductsSection from '@/components/common/ProductsSection';
import {
  BulbIcon,
  ClockIcon,
  FilterIcon,
  Lockicon,
  ProgressIcon,
  PuzzleIcon,
  RelevanceIcon,
  SafeIcon,
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
  title: 'Mass Delete Tweets - Remove Old Tweets in Few Clicks | TweetStorm.ai',
  description:
    'Delete unwanted tweets in bulk using our browser extension. Clean up your Twitter feed by removing tweets meeting filter conditions or delete all tweets.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.massTweetDeletes),
  },
};

const benefitCards = [
  {
    title: 'Save Time & Effort',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Skip the scroll, automate tweet deletions and focus on what actually
          matters.
        </p>
      </div>
    ),
    icon: <ClockIcon />,
  },
  {
    title: 'Protect Your Personal Brand',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Outgrown old tweets? Use bulk delete to clean the past and keep your
          timeline brand-safe, fast and easy with TweetStorm.
        </p>
      </div>
    ),
    icon: <SafeIcon />,
  },
  {
    title: 'Declutter Outdated Content',
    description: (
      <div className='space-y-4'>
        <p>
          Clear out old promos and clutter, bulk delete helps spotlight your
          best content, not outdated noise.
        </p>
      </div>
    ),
    icon: <RelevanceIcon />,
  },
  {
    title: 'Refresh Algorithmic Recommendations',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Reset Twitter&apos;s algorithm by deleting old tweets and likes, get a
          cleaner slate and better content suggestions.
        </p>
      </div>
    ),
    icon: <BulbIcon />,
  },
  {
    title: 'Avoid Account Suspension Risks',
    description: (
      <div className='space-y-4'>
        <p>
          Skip risky bots, our extension mimics real behavior and respects
          limits, keeping your account safe while you delete in bulk.
        </p>
      </div>
    ),
    icon: <Lockicon />,
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
          No need to wipe everything, TweetStorm lets you clean up by keyword,
          date or engagement so only the noise goes, not the gold.
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
          Stay in the loop with a real-time dashboard, watch your deletions
          update live, tweet by tweet.
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
          From install to delete, TweetStorm keeps it simple. No bots, no code,
          just click, filter and clean.
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
      Discover why creators, marketers and recruiters trust TweetStorm&apos;s
      Mass Delete tool to grow safely and efficiently.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Discover the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      Take control of your Twitter history, TweetStorm&apos;s mass deleter makes
      cleanup fast, safe and effortless.
    </>
  ),
};

const heroSectionFeatures = [
  'One click deletion',
  'Delete all tweets',
  'Delete original tweets, replies or retweets',
  'Targeted deletes using keywords, date and more',
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
          heading='Mass Delete Tweets'
          subheading='Clean Your X History'
          features={heroSectionFeatures}
          videoUrl='/videos/mass-delete-tweets-demo.mp4'
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                Mass Delete Tweets in Seconds, the fastest way to clean your
                Twitter/X history tired of old tweets haunting your profile?
                Mass Twitter Deletes is the ultimate bulk cleanup tool, delete
                1000s of tweets at once, scrub likes, unfollow in bulk and
                automate retweets, all from one powerful browser extension.
              </p>
              <ul className='list-disc pl-6 mt-4 space-y-2'>
                <li>Mass follow targeted users</li>
                <li>Delete tweets in bulk</li>
                <li>Mass unfollow accounts</li>
                <li>Auto-like posts</li>
                <li>Schedule smart retweets</li>
              </ul>
              <p>
                <b>Free Plan:</b> Delete 15 tweets now (no payment needed).
              </p>
              <p>
                <b>Premium:</b> Unlimited deletions.{' '}
                <InlineLink href={URLS.pricing}>[See Plans]</InlineLink>{' '}
              </p>
              <p>
                Why Wait? Politicians, job seekers and brands trust this tool to
                protect their reputation, yours should too. Install{' '}
                <InlineLink
                  decorated
                  href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                >
                  TweetStorm
                </InlineLink>{' '}
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />

            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-mass-delete.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass delete tweets using TweetStorm in 6 steps:
              install, login, activate, delete, done.'
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
                      stepTitle='Prepare Mass Delete Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Tweet Deletion from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-deletion.webp'
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
                      specific Twitter accounts for the mass deletion process.
                      (You can learn more about each filter in{' '}
                      <InlineLink decorated href='#available-filters'>
                        {' '}
                        this
                      </InlineLink>{' '}
                      section.)
                    </p>
                  </div>
                  <Image
                    src='/img/mass-deletion-filters.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm filter settings showing tweet type and keyword fields for precise mass deletion.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={6}
                      stepTitle='Start Mass Deletion'
                    />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-delete from a new tab with live progress and a Stop
                      button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-deletes-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm deleting tweets live with loading spinner, tweet count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Mass Tweet Deletion</H2Heading>
              <p className='mt-4'>
                TweetStorm&apos;s mass deletion tool uses smart filters to
                target only the most relevant users, no random deletes.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    TweetStorm supports <b>three smart keyword filters</b>, each
                    designed to pinpoint tweets based on the content inside
                    them. These filters are <b>case-insensitive</b>, so
                    “Politics” and “politics” are treated the same.
                  </p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Deletes tweets that <b>contain all the keywords</b> you
                        provide.
                      </p>
                      <p>
                        <i>Example: </i> Input: <i>launch 2022 stats</i> →
                        Deletes tweets with all three terms.
                      </p>
                    </div>

                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>

                      <p>
                        Deletes tweets that include <b>any</b> of the keywords
                        in your list.
                      </p>
                      <p>
                        <i>Example: </i> NFT, crypto, giveaway
                      </p>
                    </div>

                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>

                      <p>
                        Deletes tweets containing the <b>exact phrase</b> you
                        type in.
                      </p>
                      <p>
                        <i>Example:</i> Input: <i>“New product launch”</i> →
                        Deletes only tweets with that full phrase.
                      </p>
                    </div>
                    <p>
                      Perfect for removing posts tied to slogans, hashtags or
                      quotes, especially when combined with filters like date or
                      engagement.
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Type Filter</H3Heading>
                  <p>Control whether you delete:</p>
                  <ul className='list-disc pl-6 mt-2 space-y-2'>
                    <li>
                      Just your <b>original Tweets</b>
                    </li>
                    <li>
                      Only your <b>Retweets</b>
                    </li>
                    <li>
                      Or <b>both</b>
                    </li>
                  </ul>
                </div>

                <div>
                  <H3Heading>Date Range</H3Heading>
                  <p>Narrow down tweet deletions based on time.</p>
                  <ul className='list-disc pl-6 mt-2 space-y-2'>
                    <li>
                      <b>Start Date Only:</b> Deletes tweets posted <b>after</b>{' '}
                      the date you choose.
                    </li>
                    <li>
                      <b>End Date Only:</b> Deletes tweets posted <b>before</b>{' '}
                      the selected date.
                    </li>
                    <li>
                      Start + End Dates: Deletes tweets{' '}
                      <b>within the specified range.</b>
                    </li>
                  </ul>
                  <p>
                    Ideal for removing tweets from a specific year, campaign
                    cycle or job role.
                  </p>
                </div>
                <div>
                  <H3Heading>Minimum Replies</H3Heading>
                  <p>
                    Delete tweets with at least X replies, great for removing
                    high-discussion or controversial posts.
                  </p>
                </div>
                <div>
                  <H3Heading>Minimum Retweets</H3Heading>
                  <p>
                    Delete tweets with at least X retweets, ideal for clearing
                    viral posts or resetting your brand.
                  </p>
                </div>
                <div>
                  <H3Heading>Minimum Likes</H3Heading>
                  <p>
                    Delete tweets with at least X likes, perfect for removing
                    high-engagement posts tied to old trends or sensitive
                    topics.
                  </p>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='When to Use Mass Tweet Deleter' />

                <UseCasesListContainer>
                  <div>
                    <H3Heading>Account Transfer & Management</H3Heading>
                    <p>
                      Job hunting? Use TweetStorm to clean likes and tweets,
                      keep your feed polished, professional and red-flag free.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Legal & Compliance Audits </H3Heading>
                    <p>
                      Facing audits or legal checks? Use TweetStorm to bulk
                      delete sensitive tweets fast, keywords in, compliance out.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Seasonal Content Pruning</H3Heading>
                    <p>
                      After the holidays, clear old promos fast, delete by
                      keyword or date, then keep your feed fresh with auto-like
                      and retweet tools.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='Follow these expert tips to get the most out of your auto delete tweets tool.' />
                <p>
                  Maximize your auto delete power, TweetStorm&apos;s smart
                  filters + best practices = safe, clean, professional results.
                </p>

                <BestPracticesListContainer>
                  <div>
                    <H3Heading>Limit Number of Deletes</H3Heading>
                    <p>
                      Avoid flags, cap deletions with TweetStorm’s limits and
                      use smaller batches to stay under Twitter’s radar.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Batch by Category or Topic</H3Heading>
                    <p>
                      Don&apos;t delete blindly, sort tweets into categories and
                      clean up one batch at a time for smarter, safer results.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Choose Keywords Strategically</H3Heading>
                    <p>
                      Be precise, use targeted keywords to delete what matters
                      and keep what counts. No regrets, just smart cleanup.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.massTweetDeletes
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
