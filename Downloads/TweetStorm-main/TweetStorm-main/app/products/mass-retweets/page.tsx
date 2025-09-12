import { getAbsoluteUrl } from '@/api-utils/utils';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import ClarityScript from '@/components/common/ClarityScript';
import Footer from '@/components/common/Footer';
import { InlineLink } from '@/components/common/Links';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import ProductsSection from '@/components/common/ProductsSection';
import {
  AutomaticIcon,
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
  title: 'Automatically retweet in bulk - TweetStorm.ai',
  description:
    'Discover how to use the Mass Retweets tool in the TweetStorm.ai browser extension to perform bulk auto retweets and grow your reach on Twitter (X).',
  alternates: {
    canonical: getAbsoluteUrl(URLS.massRetweets),
  },
};

const benefitCards = [
  {
    title: 'Trend Participation',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Auto-retweet trending niche content with TweetStorm to stay visible,
          relevant and active in real-time conversations.
        </p>
      </div>
    ),
    icon: <TrendIcon />,
  },
  {
    title: 'Enhanced Brand Authority',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Auto-retweet valuable content to build credibility, show thought
          leadership and keep your feed insightful and active.
        </p>
      </div>
    ),
    icon: <RocketIcon />,
  },
  {
    title: 'Expanded Reach',
    description: (
      <div className='space-y-4'>
        <p>
          Each retweet boosts your visibility, attract new audiences, drive
          engagement and grow your profile naturally.
        </p>
      </div>
    ),
    icon: <ReachIcon />,
  },
  {
    title: 'Sustained Relevance',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Stay consistent and visible with auto-retweets, keep your profile
          active 24/7 and maintain momentum effortlessly.
        </p>
      </div>
    ),
    icon: <RelevanceIcon />,
  },
  {
    title: 'Efficiency and Automation',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Skip the manual grind, set targeted auto-retweets with TweetStorm and
          focus on what really moves the needle.
        </p>
      </div>
    ),
    icon: <AutomaticIcon />,
  },
];

const featureCards = [
  {
    title: 'Safe to Use',
    description: (
      <div className='space-y-4'>
        <p>
          TweetStorm mimics real behavior with smart delays and limits, keeping
          your retweets safe, natural and under the radar.
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
          TweetStorm lets you auto-retweet only what matters, using filters like
          keywords, dates and accounts for smart, relevant resharing.
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
          Stay in control with TweetStorm&apos;s live dashboard, track retweets,
          monitor progress and stop anytime with one click.
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
          TweetStorm&apos;s simple, time-saving interface lets you set filters
          and automate retweets, no clutter, no confusion.
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
      TweetStorm&apos;s Auto Retweet tool makes staying active effortless and
      safe, built for sharp, strategic growth.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Discover the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      TweetStorm&apos;s Auto Retweet tool saves time while boosting your reach,
      voice and 24/7 profile activity.
    </>
  ),
};

const heroSectionFeatures = [
  'One-click bulk retweets',
  'Targeted retweets using keywords, date and more',
  'Retweet posts from specific accounts',
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
          heading='Mass Retweets'
          subheading='Smartly reshare tweets'
          features={heroSectionFeatures}
          videoUrl='/videos/mass-retweets-demo.mp4'
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                <b>Mass Retweets</b> is an automated retweeting tool built into
                the TweetStorm browser extension, designed to help you amplify
                your presence on Twitter (X) without manual effort.
              </p>
              <p>
                This powerful extension isn&apos;t just about retweets.
                It&apos;s part of a full Twitter automation suite that includes:
              </p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>Mass follows</li>
                <li>Auto likes and unlikes</li>
                <li>Bulk tweet deletions</li>
                <li>And, of course, mass retweets</li>
              </ul>
              <p>
                With the Auto Retweet feature, you can automatically reshare
                tweets that align with your interests, niche or brand. Apply
                smart filters to target exactly which tweets to retweet, based
                on keywords, dates, engagement levels or specific accounts.
              </p>
              <p>
                <b>Free Plan:</b> Retweet up to 50 tweets per month with our
                free version.
              </p>
              <p>
                <b>Need more reach?</b> Upgrade to a paid plan for higher limits
                and advanced capabilities. Check the{' '}
                <InlineLink decorated href={URLS.pricing}>
                  pricing page{' '}
                </InlineLink>{' '}
                for details.
              </p>
              <p>
                <InlineLink
                  decorated
                  href={MASS_TWEET_DELETIONS_EXTENSION_LINK}
                >
                  Install
                </InlineLink>{' '}
                the Mass Retweets extension today and watch your Twitter
                strategy evolve, with less work and more results.
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />
            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-mass-retweets.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass retweets using TweetStorm in 6 steps: install, login, activate, retweet, done.'
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
                      stepTitle='Prepare Auto Retweets Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Retweets from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-retweets.webp'
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
                      specific Twitter accounts for the mass auto-retweet
                      process. (You can learn more about each filter in{' '}
                      <InlineLink decorated href='#available-filters'>
                        {' '}
                        this
                      </InlineLink>{' '}
                      section.)
                    </p>
                  </div>
                  <Image
                    src='/img/mass-retweets-filters.webp'
                    className='rounded-md border dark:border-none'
                    alt='TweetStorm filter settings showing tweet type and keyword fields for mass retweets.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={6}
                      stepTitle='Start Auto Retweets'
                    />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-retweet from a new tab with live progress and a Stop
                      button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-retweets-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm retweeting live with loading spinner, following count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Mass Retweets</H2Heading>
              <p className='mt-4'>
                Retweet smarter with TweetStorm&apos;s precision filters,
                control what and who you reshare for maximum impact.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    Our keyword filters help you retweet tweets that match your
                    interests, audience or brand voice. Each input accepts a
                    <b>space-separated list of keywords</b> and all matches are
                    <b>case-insensitive</b> (e.g., “Crypto” = “crypto”).
                  </p>
                  <p>Choose from:</p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Retweets only those tweets that contain <b>all</b> the
                        entered keywords.
                      </p>
                      <p>
                        <i>Example:</i> Input: <i>startup funding AI</i> →
                        Retweets tweets that mention all three terms.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>
                      fitness wellness health
                      <p>
                        Retweets tweets containing <b>at least one</b> of the
                        entered keywords.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>fitness wellness health</i> →
                        Retweets any tweet that contains one or more of those
                        words.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>

                      <p>
                        Retweets only tweets that match the <b>exact</b> phrase
                        you provide.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>web3 gaming </i> → Retweets
                        only tweets with that specific phrase.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Date Range
                      </KeywordsSectionH4Heading>

                      <p>
                        Target tweets by date with TweetStorm, perfect for
                        launches, events or evergreen campaigns needing timely
                        retweets.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        From Account
                      </KeywordsSectionH4Heading>

                      <p>
                        Want to retweet only from a trusted creator, client or
                        team member?
                      </p>
                      <p>
                        {' '}
                        Just enter their Twitter handle (e.g., <i>@elonmusk</i>)
                        and the extension will target tweets from that account.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Replies
                      </KeywordsSectionH4Heading>

                      <p>
                        Only retweet tweets that have <b>at least X replies</b>,
                        helping you focus on tweets that are sparking
                        conversations.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Retweets
                      </KeywordsSectionH4Heading>

                      <p>
                        Set a threshold so only tweets with strong virality are
                        considered for auto-retweeting.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Likes
                      </KeywordsSectionH4Heading>

                      <p>
                        Want to retweet only content that&apos;s been well
                        received?
                      </p>
                      <p>
                        Use this filter to set a minimum number of likes before
                        a tweet qualifies for retweeting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='When to Use Mass Retweets' />

                <UseCasesListContainer>
                  <div>
                    <H3Heading>For Influencers</H3Heading>
                    <p>
                      Deepen audience ties with TweetStorm, retweet follower
                      content and niche voices using smart filters for authentic
                      presence.
                    </p>
                  </div>

                  <div>
                    <H3Heading>For Businesses & Brands</H3Heading>
                    <p>
                      Turn fans into advocates, auto-retweet testimonials,
                      mentions and news that align with your brand using
                      TweetStorm.
                    </p>
                  </div>

                  <div>
                    <H3Heading>For Community Managers</H3Heading>
                    <p>
                      Keep your community engaged, auto-retweet member wins and
                      milestones with TweetStorm to boost visibility and
                      connection.
                    </p>
                  </div>

                  <div>
                    <H3Heading>For Marketers</H3Heading>
                    <p>
                      Drive campaign visibility with TweetStorm, auto-retweet
                      high-performing, aligned content to boost momentum and
                      impact.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='' />
                <BestPracticesListContainer>
                  <p>
                    Maximize TweetStorm&apos;s Auto Retweet tool with smart
                    practices that ensure safe, consistent growth and a
                    professional feed.
                  </p>
                  <div>
                    <H3Heading>Don&apos;t Over-Retweet</H3Heading>
                    <p>
                      Avoid spam, space out retweets, let each post shine and
                      keep your feed balanced and engaging with TweetStorm.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Target Relevant Hashtags</H3Heading>
                    <p>
                      Use keyword filters to retweet hashtag-rich content,
                      boosting reach, relevance and visibility in your niche.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Mix Retweets with Original Content</H3Heading>
                    <p>
                      Balance is key, mix your own tweets with retweets to
                      maintain your voice and keep your feed authentic.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Use Advanced Filters</H3Heading>
                    <p>
                      Use TweetStorm&apos;s advanced filters to retweet only
                      high-quality, high-performing content, build trust with
                      precision.
                    </p>
                  </div>{' '}
                  <div>
                    <H3Heading>Stay Authentic</H3Heading>
                    <p>
                      Stay authentic, retweet only what aligns with your brand
                      and values, because every retweet reflects you.
                    </p>
                  </div>{' '}
                  <div>
                    <H3Heading>Engage Beyond the Retweet</H3Heading>
                    <p>
                      Go beyond retweets, add quotes, reply with insights or tag
                      creators to build real connections and stand out.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.massRetweets
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
