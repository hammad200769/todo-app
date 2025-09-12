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
  RocketIcon,
  SafeIcon,
  ShieldIcon,
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
  title: 'Delete Twitter Likes in Bulk - TweetStorm.ai',
  description:
    'Easily remove Twitter likes in bulk with our browser extension. Clean up your activity and improve your profile appearance.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.deleteTwitterLikes),
  },
};

const benefitCards = [
  {
    title: 'Save Time & Effort',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Automate unliking with TweetStorm, clean your likes in minutes and
          focus on content and community, not manual work.
        </p>
      </div>
    ),
    icon: <SafeIcon />,
  },

  {
    title: 'Refine Content Recommendations',
    description: (
      <div className='space-y-4'>
        <p>
          Remove old or irrelevant likes to improve your feed quality and reset
          Twitter&apos;s understanding for better content.
        </p>
      </div>
    ),
    icon: <RocketIcon />,
  },
  {
    title: 'Brand Protection',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          Clean old likes to protect your professional identity, avoid
          misunderstandings and control your Twitter narrative.
        </p>
      </div>
    ),
    icon: <ShieldIcon />,
  },
  {
    title: 'Avoid Account Suspension',
    description: (
      <div className='space-y-4'>
        <p>
          {' '}
          TweetStorm protects your account by mimicking natural behavior,
          throttling actions and keeping you within Twitter&apos;s limits.
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
          TweetStorm safely automates unliking by mimicking human actions and
          limiting activity to protect your account.
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
          Use TweetStorm&apos;s filters to unlike tweets by keywords, dates,
          engagement or authors, precise cleanup, zero guesswork.
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
          Track unlikes live with TweetStorm&apos;s progress panel, see counts,
          monitor actions and stop anytime with one click.
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
          TweetStorm offers a clean, intuitive interface with no confusing
          setups, easy for casual users and pros alike.
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
      TweetStorm&apos;s Delete Twitter Likes tool offers safe, simple and
      powerful control over your like history, no manual hassle.
    </>
  ),
};

const benefitsMeta = {
  heading: 'Benefits',
  subheading: 'Discover the advantages of using our mass tweet deleter tool.',
  description: (
    <>
      TweetStorm&apos;s mass delete likes tool helps you curate your identity,
      protect your reputation and optimize your Twitter presence.
    </>
  ),
};

const heroSectionFeatures = [
  'One-click bulk unlikes',
  'Unlike all tweets',
  'Targeted unlikes using keywords, date and more',
  'Unlike tweets from specific accounts',
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
          heading='Mass Tweets Unlike'
          subheading='Remove irrelevant likes in seconds.'
          videoUrl='/videos/mass-unlikes-demo.mp4'
          features={heroSectionFeatures}
        />

        <main className='responsive-pad my-20'>
          <div className='max-w-6xl mx-auto'>
            <Introduction className='text-center'>
              <p>
                <b>Delete Twitter Likes</b> is a powerful automated tool built
                into the TweetStorm browser extension, designed to help you
                clean up your Twitter activity fast and effortlessly.
              </p>
              <p>
                This browser extension is more than just a tweet unliker.
                It&apos;s part of a complete Twitter automation suite that
                includes:
              </p>
              <ul className='list-disc pl-6 mt-2 space-y-2'>
                <li>Tweet deletion</li>
                <li>Mass follows and unlikes</li>
                <li>Auto-liking</li>
                <li>
                  Now, a <b>mass unlike</b> feature for decluttering your
                  profile in minutes.
                </li>
              </ul>
              <p>
                With TweetStorm, you can bulk unlike tweets by applying advanced
                filters, like keywords, date ranges or engagement metrics,
                allowing you to target specific likes that no longer serve your
                goals.
              </p>
              <p>
                Whether you&apos;re looking to remove <b>all past likes</b> or
                just clean up <b>specific interactions</b>, this tool gives you
                the flexibility to do both without the hassle of unliking tweets
                one-by-one.
              </p>
              <p>
                <b>Free Plan:</b> Unlike up to 15 tweets using the free version.
              </p>
              <p>
                <b>Need more reach?</b> Unlock full access with a paid plan.
                Check the{' '}
                <InlineLink decorated href={URLS.pricing}>
                  pricing page{' '}
                </InlineLink>{' '}
                for details.
              </p>
            </Introduction>
            <MassTweetCards Cards={featureCards} meta={featureMeta} />

            <MassTweetCards Cards={benefitCards} meta={benefitsMeta} />

            <article className='max-w-6xl mx-auto mt-36'>
              <div className='text-center mt-36'>
                <H2Heading>How to Guide</H2Heading>

                <Image
                  src='/img/how-to-mass-delete-likes.webp'
                  className='rounded-md border dark:border-none mt-6 mx-auto'
                  alt='How to mass delete likes using TweetStorm in 6 steps: install, login, activate, unlike, done.'
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
                      alt='TweetStorm.ai extension showing Twitter handle input field with Save button to proceed.'
                      width={450}
                      height={250}
                    />
                  </HowToSectionStepContainer>
                </div>
                <HowToSectionStepContainer>
                  <div>
                    <StepHeader
                      stepNumber={5}
                      stepTitle='Prepare Auto Unlikes Action'
                    />
                    <p className='mt-4'>
                      Log into Twitter, open the TweetStorm extension and select
                      Mass Unlike from the dropdown menu.
                    </p>
                  </div>
                  <Image
                    src='/img/select-mass-unlikes.webp'
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
                      specific Twitter accounts for the mass unlikes process.
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
                    alt='TweetStorm filter settings showing tweet type and keyword fields for precise tweets unlike.'
                    width={415}
                    height={359}
                  />
                </HowToSectionStepContainer>

                <HowToSectionStepContainer>
                  <div>
                    <StepHeader stepNumber={6} stepTitle='Start Auto Unlikes' />
                    <p className='mt-4'>
                      After setting filters, click Start, TweetStorm will
                      auto-unlike tweets from a new tab with live progress and a
                      Stop button.
                    </p>
                  </div>
                  <Image
                    src='/img/mass-unlikes-progress.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='TweetStorm unliking tweets live with loading spinner, tweet count and red stop operation button.'
                    width={1060}
                    height={580}
                  />
                </HowToSectionStepContainer>
              </div>
            </article>

            <KeywordsSectionContainer>
              <H2Heading>Available Filters for Auto Unlikes</H2Heading>
              <p className='mt-4'>
                Clean likes precisely with TweetStorm&apos;s filters or unlike
                all tweets at once, full control, no guesswork.
              </p>

              <div className='space-y-8 mt-8'>
                <div>
                  <H3Heading>Keyword Filters</H3Heading>
                  <p>
                    Target tweets based on the words used in them. All keyword
                    filters accept <b>space-separated words</b> and are
                    <b>case-insensitive</b> (e.g., “Politics” is treated the
                    same as “politics”).
                  </p>

                  <div className='space-y-4 mt-4'>
                    <div>
                      <KeywordsSectionH4Heading>
                        All Keywords
                      </KeywordsSectionH4Heading>
                      <p>
                        Unlikes tweets that contain <b>all</b> the entered
                        keywords.
                      </p>
                      <p>
                        <i>Example:</i> Input: <i>crypto giveaway 2024</i> →
                        Only tweets with all three keywords will be unliked.
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Any Keyword
                      </KeywordsSectionH4Heading>
                      fitness wellness health
                      <p>
                        Unlikes tweets containing <b>at least one</b> of the
                        entered keywords.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>nft startup bitcoin</i> →
                        Matches tweets that mention any of the terms.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Exact Phrase
                      </KeywordsSectionH4Heading>

                      <p>
                        Unlikes tweets that match the <b>exact</b> phrase you
                        provide.
                      </p>
                      <p>
                        {' '}
                        <i>Example:</i> Input: <i>daily motivation </i> → Only
                        tweets with that specific phrase are unliked.{' '}
                      </p>
                    </div>
                    <div>
                      <KeywordsSectionH4Heading>
                        Date Range
                      </KeywordsSectionH4Heading>

                      <p>
                        Remove likes by date, set start, end or range to clean
                        old campaigns or past interactions precisely.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        From Account
                      </KeywordsSectionH4Heading>

                      <p>Only want to unlike tweets from a specific user?</p>
                      <p>
                        {' '}
                        Enter their Twitter handle (e.g., <i>@john_doe</i>) and
                        the tool will remove likes on tweets from that account
                        alone.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Replies
                      </KeywordsSectionH4Heading>

                      <p>
                        Unlikes tweets that have{' '}
                        <b>at least X number of replies</b>, useful when
                        clearing likes from high-engagement conversations.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Retweets
                      </KeywordsSectionH4Heading>

                      <p>
                        Target tweets that went viral. Set a minimum retweet
                        threshold to remove likes from overly amplified or
                        outdated posts.
                      </p>
                    </div>{' '}
                    <div>
                      <KeywordsSectionH4Heading>
                        Minimum Likes
                      </KeywordsSectionH4Heading>

                      <p>
                        Only unlike tweets that reached a certain popularity
                        level. This filter is helpful when reversing likes from
                        overhyped content or campaign posts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </KeywordsSectionContainer>

            <div className='mx-auto max-w-3xl mt-36 space-y-24'>
              <UseCasesSectionContainer>
                <UseCasesHeadingAndSubheading subheading='Pivot your brand or declutter your profile quickly and easily with TweetStorm’s Delete Likes tool, stress-free cleanup in seconds.' />

                <UseCasesListContainer>
                  <div>
                    <H3Heading>Post-Campaign Reset</H3Heading>
                    <p>
                      Clear giveaway and campaign likes fast with TweetStorm,
                      restore a clean history and prep for your next push.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Content Strategy Realignment</H3Heading>
                    <p>
                      Shift niches? Delete old likes with TweetStorm to refresh
                      your feed and get content that matches your new focus.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Reputation Management</H3Heading>
                    <p>
                      Remove outdated likes instantly with TweetStorm to avoid
                      controversy and maintain a clean, intentional public
                      image.
                    </p>
                  </div>

                  <div>
                    <H3Heading>Algorithmic Feed Refresh</H3Heading>
                    <p>
                      Unlike old or irrelevant posts to help Twitter relearn
                      your interests and refresh your feed with relevant
                      content.
                    </p>
                  </div>
                </UseCasesListContainer>
              </UseCasesSectionContainer>
              <BestPracticesSectionContainer>
                <BestPracticesHeadingAndSubheading subheading='' />
                <BestPracticesListContainer>
                  <p>
                    Follow these best practices to use TweetStorm&apos;s Mass
                    Delete Likes tool safely, smartly and effectively.
                  </p>
                  <div>
                    <H3Heading>Limit Number of Unlikes</H3Heading>
                    <p>
                      Avoid Twitter flags by limiting unlikes per session with
                      TweetStorm, spread actions to stay safe and clean smart.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Choose Keywords Strategically</H3Heading>
                    <p>
                      Use precise keywords and exact phrases with TweetStorm
                      filters for targeted, smart and laser-focused cleanup.
                    </p>
                  </div>
                  <div>
                    <H3Heading>Refine & Rotate Keyword Lists</H3Heading>
                    <p>
                      Make unliking a routine, update keywords monthly, track
                      patterns and refine filters for a cleaner, sharper Twitter
                      presence.
                    </p>
                  </div>
                </BestPracticesListContainer>
              </BestPracticesSectionContainer>
            </div>

            <ProductsSection
              products={products.filter(
                product => product.href !== URLS.deleteTwitterLikes
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
