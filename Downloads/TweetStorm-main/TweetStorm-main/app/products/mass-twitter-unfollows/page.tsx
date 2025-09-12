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
  Lockicon,
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
  title: 'Mass Unfollow for Twitter - TweetStorm.ai',
  description:
    'Learn how to use the Mass Unfollow feature in the TweetStorm.ai browser extension to maintain a healthy follower ratio and engaging with the right audience.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.massTwitterUnfollows),
  },
};

const benefitCards = [
  {
    title: 'Save Time & Effort',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          TweetStorm automates unfollowing, saving time and keeping your follow
          list clean for real engagement.
        </p>
      </div>
    ),
    icon: <TrendIcon />,
  },
  {
    title: 'Declutter Your Twitter Feed',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Cut the noise, unfollow irrelevant accounts to turn your feed into a
          focused, valuable space that truly matters.
        </p>
      </div>
    ),
    icon: <RocketIcon />,
  },
  {
    title: 'Improve Follower-to-Following Ratio',
    description: (
      <div className='space-y-4'>
        <p>
          Too many follows and low engagement? Use TweetStorm to rebalance your
          profile and boost credibility and reach.
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
          TweetStorm safely automates unfollows with human-like behavior,
          delays, scrolls and pauses to avoid spam flags.
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
          TweetStorm mimics human behavior and lets you set unfollow limits,
          keeping your account safe and under the radar.
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
          Don&apos;t unfollow blindly, use smart filters to remove spam, old
          campaigns or irrelevant profiles with precision.
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
          Track every unfollow in real time with a live counter and stop button
          for full control and visibility.
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
          TweetStorm&apos;s clean, beginner-friendly interface lets you paste
          your key, set filters and start unfollowing instantly.
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
      TweetStorm&apos;s Mass Unfollow lets you clean your feed confidently, with
      safety, control and ease built in.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Discover the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      TweetStorm&apos;s Mass Unfollow helps you reclaim your feed, clear clutter
      and align your follows with your goals.
    </>
  ),
};

const heroSectionFeatures = [
  'One-click bulk unfollows',
  'Unfollow all',
  'Targeted unfollows using keywords',
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
          heading='Mass Twitter Unfollows'
          subheading='Batch-remove unwanted follows'
          features={heroSectionFeatures}
          videoUrl='/videos/mass-unfollows-demo.mp4'
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                <b>Mass Twitter Unfollows</b> is a powerful automated tool built
                into the TweetStorm browser extension, designed for creators,
                professionals and marketers who need to clean up their follow
                list efficiently.
              </p>
              <p>
                This browser extension isn&apos;t just about unfollowing.
                It&apos;s a full Twitter growth toolkit that includes features
                like:
              </p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>Mass unfollow</li>
                <li>Tweet deletions</li>
                <li>Mass follows</li>
                <li>Auto likes and more</li>
              </ul>
              <p>
                With our bulk unfollow feature, you can remove multiple Twitter
                accounts at once using smart filters, allowing you to unfollow
                only the users you no longer want to stay connected with.
              </p>
              <p>
                <b>Free Plan:</b> You can unfollow up to 15 Twitter
                accounts/month using the free version.
              </p>
              <p>
                <b>Need more reach?</b> Upgrade to a paid plan to unlock higher
                limits and advanced features.{' '}
                <InlineLink decorated href={URLS.pricing}>
                  Check
                </InlineLink>{' '}
                the pricing page for details.
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />
            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-mass-unfollow.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass unfollow using TweetStorm in 6 steps: install, login, activate, unfollow, done.'
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
                      stepTitle='Prepare Mass Unfollow Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Unfollow from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-unfollows.webp'
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
                      specific Twitter accounts for the mass unfollows process.
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
                    alt='TweetStorm filter settings showing tweet type and keyword fields for precise mass unfollows.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={6}
                      stepTitle='Start Mass Unfollows'
                    />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-unfollow from a new tab with live progress and a Stop
                      button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-unfollow-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm unfollowing live with loading spinner, following count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Mass Unfollow</H2Heading>
              <p className='mt-4'>
                Be strategic with unfollows, TweetStorm&apos;s filters help you
                remove only irrelevant connections for precise cleanup after
                campaigns or shifts.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    You can use three flexible keyword-based filters to narrow
                    down the accounts you want to unfollow. These filters work
                    by checking the{' '}
                    <b>name, Twitter handle and bio/description</b> of the
                    account.
                  </p>
                  <p>
                    All keyword inputs are <b>case-insensitive</b>, meaning{' '}
                    <i>Crypto</i>,<i>crypto</i> and <i>CRYPTO</i> all match the
                    same.
                  </p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Only unfollows tweets that include <b>all</b> the
                        entered keywords.
                      </p>
                      <p>
                        <i>Example:</i> Input: <i>crypto nft marketing</i> →
                        Unfollows users with all three keywords in their bio or
                        name.{' '}
                      </p>
                    </div>

                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>

                      <p>
                        Unfollows accounts that include <b>at least one</b> of
                        the entered keywords.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>fitness gaming ai</i> →
                        Unfollows any account with one or more of these terms.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>

                      <p>
                        Targets accounts containing the <b>exact</b> phrase you
                        provide.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>content marketer</i> →
                        Unfollows only those with this specific phrase.{' '}
                      </p>
                    </div>
                    <p>
                      Use these filters to target specific types of accounts,
                      like inactive users, spammy handles or accounts from a
                      past niche you no longer engage with.
                    </p>
                  </div>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='When to Use Mass Unfollows' />

                <UseCasesListContainer>
                  <div>
                    <H3Heading>Personal Brand Cleanup</H3Heading>
                    <p>
                      As you grow, clean your feed with TweetStorm, unfollow
                      outdated profiles, refine your list and stay aligned.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Content Strategy Reset</H3Heading>
                    <p>
                      Changed niches? Use TweetStorm&apos;s keyword filters to
                      unfollow accounts that no longer fit your new focus.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Post-Campaign Cleanups</H3Heading>
                    <p>
                      After a giveaway or follow-for-follow push, use TweetStorm
                      filters to remove inactive or non-relevant accounts fast.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Competitor or Trend Research Reset</H3Heading>
                    <p>
                      Studied a trend? Use TweetStorm to unfollow competitors
                      and temporary follows once your research is done.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Avoid Spammy Accounts</H3Heading>
                    <p>
                      Clear spam fast, use TweetStorm filters like “DM for
                      collab” or “crypto pump” to unfollow shady accounts
                      instantly.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='Maximize TweetStorm’s Unfollow tool by following smart, safe practices for efficient and strategic cleanup.' />
                <BestPracticesListContainer>
                  <div>
                    <H3Heading>Limit Number of Unfollows</H3Heading>
                    <p>
                      Avoid spam flags, use TweetStorm&apos;s unfollow limits,
                      go slow and let smart automation keep your account safe.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Choose Keywords Strategically</H3Heading>
                    <p>
                      Use precise keywords (like “NFT” or “collab”) to unfollow
                      only irrelevant accounts, keep the valuable ones intact.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Regularly Audit Follows by Keyword</H3Heading>
                    <p>
                      Mass unfollow is ongoing, regular keyword audits keep your
                      feed clean, focused and aligned with your goals.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.massTwitterUnfollows
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
