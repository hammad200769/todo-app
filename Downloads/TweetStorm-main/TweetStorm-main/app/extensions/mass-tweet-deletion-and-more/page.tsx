import { getAbsoluteUrl } from '@/api-utils/utils';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import ClarityScript from '@/components/common/ClarityScript';
import H4Heading from '@/components/common/extension-pages/H4Heading';
import HowToSectionStepContainer from '@/components/common/extension-pages/HowToSectionStepContainer';
import Footer from '@/components/common/Footer';
import { InlineLink } from '@/components/common/Links';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import HeroSection from '@/components/extension-pages/HeroSection';
import {
  AutomaticIcon,
  ClockIcon,
  FilterIcon,
  ReachIcon,
  RelevanceIcon,
  SafeIcon,
} from '@/components/icons';
import H3Heading from '@/components/product-pages/H3Heading';
import Introduction from '@/components/product-pages/Introduction';
import StepHeader from '@/components/product-pages/StepHeader';
import Benefits from '@/components/public-generation/Benefits';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX,
  NAVIGATION_HEADER_HEIGHT,
  URLS,
} from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Twitter Bulk Actions Browser Extension - TweetStorm.ai',
  description:
    'Learn how to use the Mass Tweet Deletion Extension to perform bulk actions on X with ease with our step-by-step guide.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.massTweetDeletionExtension),
  },
};
const benefitCards = [
  {
    title: 'Save Time and Effort',
    description:
      'Manually deleting, liking, unliking, or retweeting posts one by one can take hours. With our extension, mass delete twitter tweets, bulk unfollow twitter accounts, mass follow twitter account and much more are just a few click away.',
    icon: <ClockIcon />,
  },
  {
    title: 'Powerful Filters',
    description:
      "You don't have to apply actions blindly. Use our advanced filters—such as keywords, date range, engagement thresholds, and specific accounts—to target exactly the tweets you want.",
    icon: <FilterIcon />,
  },
  {
    title: 'Clean Profile',
    description:
      'Easily remove outdated, irrelevant, or embarrassing tweets to keep your profile fresh and aligned with your personal or brand identity.',
    icon: <ReachIcon />,
  },
  {
    title: 'Boost Your Engagement',
    description:
      'Effortlessly like or retweet posts containing specific keywords, helping you engage with relevant content and boost your online presence.',
    icon: <RelevanceIcon />,
  },
  {
    title: 'Safe and Secure',
    description:
      'Your privacy is our priority. The extension operates directly from your browser, ensuring that your Twitter credentials remain secure.',
    icon: <SafeIcon />,
  },
  {
    title: 'Easy to Use',
    description:
      'With a simple setup process and an intuitive interface, anyone can use this extension—no technical skills required.',
    icon: <AutomaticIcon />,
  },
];

const heroSectionFeatures = [
  'Bulk actions in one click',
  'Bulk tweet deletion, unlikes, retweets and more',
  'Targeted actions using keywords, date and more',
];

function Page() {
  return (
    <>
      <ClarityScript />
      <StickyNavigationWrapper>
        <NavigationMenu />
      </StickyNavigationWrapper>

      <div>
        <main
          className='dark:bg-primary-dark-light'
          style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        >
          <div className='mx-auto pb-12 lg:pb-16'>
            <HeroSection
              heading='Mass Actions for Twitter - Browser Extension'
              subheading='Perform tweet deletions, unfollows, and more in just a few clicks.'
              features={heroSectionFeatures}
              videoUrl='/videos/mass-delete-tweets-demo.mp4'
            />
          </div>
          <div className='max-w-6xl mx-auto pb-12 lg:pb-16'>
            <article className='max-w-none text-decoration-none'>
              <Introduction>
                <div className='prose prose-custom'>
                  <p>
                    Our &quot;Mass Tweet Deletion & More&quot; extension, part
                    of the AI tools by{' '}
                    <InlineLink href='/'>TweetStorm.ai</InlineLink>, streamlines
                    bulk actions on Twitter to save your time and effort.
                    Whether you need to mass delete tweets, unlike posts, mass
                    unfollow on twitter, or perform other mass actions, our
                    extension eliminates the hassle of manual work. With an
                    intuitive interface and powerful filters, you can precisely
                    target the tweets you want—making bulk management faster and
                    more efficient than ever.
                  </p>
                </div>
              </Introduction>
              <div className='text-base/relaxed'>
                <div id='how-to-get-started' className='scroll-mt-20'>
                  <article className='mt-36'>
                    <div className='text-center'>
                      <H2Heading>How to Guide</H2Heading>
                      <div className='max-w-2xl mx-auto mt-4'>
                        <p>
                          Learn how to perform Mass Actions using our browser
                          extension.
                        </p>
                      </div>
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
                            link to get the extension. <b>For Firefox</b>, click
                            on{' '}
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
                            Click the <b>Add to Chrome</b> button for Chrome to
                            install the extension. For Firefox, click the{' '}
                            <b>Add to Firefox</b> button.
                          </p>
                        </div>
                        <Image
                          src='/img/add-to-chrome.webp'
                          className='rounded-md border dark:border-none'
                          alt='The Chrome Web Store page for the mass delete tweets extension'
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
                            <InlineLink decorated href={URLS.login}>
                              Login
                            </InlineLink>{' '}
                            to TweetStorm.ai. If you don&apos;t have an account,
                            then{' '}
                            <InlineLink decorated href={URLS.signup}>
                              create an account
                            </InlineLink>
                            .
                          </p>
                        </div>
                        <Image
                          src='/img/login-page.webp'
                          className='rounded-md border dark:border-none lg:order-[-1]'
                          alt='Login page for TweetStorm.ai'
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
                            After logging in, go to the Profile page.
                          </p>
                        </div>
                        <Image
                          src='/img/profile-page.webp'
                          className='rounded-md border dark:border-none'
                          alt='Highlighted profile page in sidebar'
                          width={1000}
                          height={508}
                        />
                      </HowToSectionStepContainer>

                      <HowToSectionStepContainer>
                        <div>
                          <p>
                            In the<b> Extension API Key</b> section in the
                            profile page, you will see your API key. Copy this
                            key.
                          </p>
                        </div>
                        <Image
                          src='/img/copy-key-button.webp'
                          className='rounded-md border dark:border-none'
                          alt='An API Key input with a highlighted copy button'
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
                              Open the extension popup, paste the extension API
                              key, and press the <b>Save</b> button.
                            </p>
                          </div>

                          <Image
                            src='/img/activate-extension-mass-actions.webp'
                            className='rounded-md border dark:border-none lg:order-[-1]'
                            alt='bulk delete tweets extension popup asking for API Key with a button to save the key'
                            width={450}
                            height={250}
                          />
                        </HowToSectionStepContainer>
                        <HowToSectionStepContainer>
                          <div>
                            <p>
                              After that, you&apos;ll be prompted to enter your
                              Twitter handle or username. Enter your handle and
                              press the <b> Save </b>
                              button.
                            </p>
                          </div>

                          <Image
                            src='/img/twitter-handle.webp'
                            className='rounded-md border dark:border-none lg:order-[-1]'
                            alt='A section in bulk delete tweets extension popup, with an input field asking for twitter handle and a save button'
                            width={450}
                            height={250}
                          />
                        </HowToSectionStepContainer>
                      </div>
                      <HowToSectionStepContainer>
                        <div>
                          <StepHeader
                            stepNumber={5}
                            stepTitle='How to Perform a Mass Action'
                          />
                          <p className='mt-4'>
                            In the extension popup, you&apos;ll find a dropdown
                            menu to select the type of mass action you want to
                            perform.
                          </p>
                          <p className='mt-3'>
                            <b>Available Actions:</b>
                          </p>
                          <ol className='list-decimal list-inside space-y-3 mt-3'>
                            <li>Mass Tweet Deletion</li>
                            <li>Mass Tweet Unlike</li>
                            <li>Mass Tweet Like</li>
                            <li>Mass Follow</li>
                            <li>Mass Unfollow</li>
                            <li>Mass Retweets</li>
                          </ol>
                        </div>
                        <Image
                          src='/img/select-mass-deletion.webp'
                          className='rounded-md border dark:border-none'
                          alt='A drop down showing all the available mass actions in the mass deletion browser extension and mass tweet deletion is highlighted among the options'
                          width={415}
                          height={359}
                        />
                      </HowToSectionStepContainer>

                      <HowToSectionStepContainer>
                        <div>
                          <p>
                            You will see a set of filters that you can use to
                            target specific tweets for the bulk action process.
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
                          alt='Filters for the auto deletion tool in the browser extension'
                          width={415}
                          height={359}
                        />
                      </HowToSectionStepContainer>

                      <HowToSectionStepContainer>
                        <div>
                          <StepHeader
                            stepNumber={6}
                            stepTitle='Start Mass Action'
                          />
                          <p className='mt-4'>
                            Once you click start, a new tab will open where the
                            bulk action will take place. The process may take
                            some time depending on the number of tweets
                            selected. Do not close this tab. A progress popup
                            will show the number of tweets processed in real
                            time and a Stop Operation button to terminate the
                            action.
                          </p>
                        </div>
                        <Image
                          src='/img/mass-deletes-progress.webp'
                          className='rounded-md border dark:border-none lg:order-[-1]'
                          alt='A popup showing the progress of bulk delete action. It displays the number of tweets deleted and a stop button to stop the operation'
                          width={1060}
                          height={580}
                        />
                      </HowToSectionStepContainer>
                      <HowToSectionStepContainer>
                        <div>
                          <StepHeader
                            stepNumber={7}
                            stepTitle='Mass Action Completion'
                          />
                          <p className='mt-4'>
                            You can continue other tasks while the operation
                            runs in the background, as long as the tab remains
                            open. After the bulk action is completed, a success
                            popup will appear in the tab where action is taking
                            place. The popup will display the total number of
                            tweets affected (e.g., deleted tweets in case of
                            bulk deletion).
                          </p>
                        </div>
                        <Image
                          src='/img/mass-action-completion.png'
                          className='rounded-md border dark:border-none'
                          alt='A popup showing the progress of bulk delete action. It displays the number of tweets deleted and a stop button to stop the operation'
                          width={298}
                          height={232}
                        />
                      </HowToSectionStepContainer>
                      <div>
                        <HowToSectionStepContainer>
                          <div>
                            <H2Heading>
                              &quot;No Credits Available&quot; Issue in Firefox
                            </H2Heading>
                            <p className='mt-4'>
                              If you encounter the &quot;No Credits
                              Available&quot; error while performing a bulk
                              action, even when you have available usage, the
                              issue may be caused by opening the extension popup
                              in the same tab where the bulk action is running.
                            </p>
                            <div className='mt-3'>
                              <H3Heading> How to Fix It</H3Heading>
                              <p className='mt-4'>
                                To avoid this issue, do not open the extension
                                popup in the tab where the bulk action is in
                                progress. Instead, use a different tab if you
                                need to access the extension.
                              </p>
                              <p className='mt-3'>
                                This is a known bug and will be addressed in a
                                future update.
                              </p>
                            </div>
                          </div>
                          <div>
                            <Image
                              src={'/img/mass-action-error.png'}
                              alt='no credits available'
                              className='rounded-md border dark:border-none'
                              width={598}
                              height={355}
                            />
                          </div>
                        </HowToSectionStepContainer>{' '}
                      </div>
                    </div>
                  </article>
                </div>

                <section className='max-w-3xl mx-auto'>
                  <div
                    id='available-filters'
                    className='my-32 mx-auto scroll-mt-32'
                  >
                    <div>
                      {' '}
                      <H2Heading>
                        Available Filters for Mass Tweet Deletion
                      </H2Heading>
                      <p className='mt-4'>
                        Each mass action comes with a set of filters that help
                        you precisely target the tweets you want to modify. For
                        example, you can retweet only those posts that contain
                        specific keywords. Below are the available filters:
                      </p>
                    </div>
                    <div className='space-y-6 mt-10'>
                      <H3Heading>Keywords Filters</H3Heading>
                      <p>
                        We provide three types of keyword filters. Each filter
                        input field accepts a space-separated list of keywords,
                        and all matches are case-insensitive (e.g.,
                        &quot;Politics&quot; is the same as
                        &quot;politics&quot;). The filters are:
                      </p>
                      <H4Heading>All Keywords</H4Heading>
                      <p>
                        Targets posts that contain <b>all</b> the provided
                        keywords. If any keyword is missing from a post, it
                        won&apos;t be selected.
                      </p>
                      <H4Heading>Any Keyword</H4Heading>
                      <p>
                        Targets posts that contain <b>at least one</b> of the
                        provided keywords.
                      </p>
                      <H4Heading>Exact Phrase</H4Heading>
                      <p>
                        Targets posts that contain the <b>exact phrase</b> as
                        entered.
                      </p>
                      <H3Heading>Date Range</H3Heading>
                      <p>
                        This filter lets you select posts within a specific date
                        range.
                      </p>
                      <ul>
                        <li>
                          If only a <b>start date</b> is provided, it selects
                          posts <b>after</b> that date.
                        </li>
                        <li>
                          If only an <b>end date</b> is provided, it selects
                          posts <b>before</b> that date.
                        </li>
                        <li>
                          If both are provided, it selects posts <b>within</b>{' '}
                          the specified range.
                        </li>
                      </ul>
                      <H3Heading>From Account</H3Heading>
                      <p>
                        This filter allows you to target posts from a specific
                        Twitter account. Simply enter the handle (e.g.,
                        @john_doe), and the action will apply only to tweets
                        from that account. A common use case is liking tweets
                        from a particular user.
                      </p>
                      <H3Heading>Minimum Replies</H3Heading>
                      <p>
                        Selects posts that have at least the specified number of
                        replies.
                      </p>
                      <H3Heading>Minimum Retweets</H3Heading>
                      <p>
                        Selects posts that have at least the specified number of
                        retweets.
                      </p>
                      <H3Heading>Minimum Likes</H3Heading>
                      <p>
                        Selects posts that have at least the specified number of
                        likes.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=''>
                      {' '}
                      <H2Heading>Why Bulk Actions Take Time</H2Heading>
                    </div>
                    <div className='mt-5'>
                      <p className='mt-4'>
                        While bulk actions are automated and significantly
                        faster than doing them manually, they still take some
                        time to complete. This is because we perform action on
                        tweets one by one by scrolling through them, mimicking
                        real user behavior. This approach is necessary for two
                        key reasons:
                      </p>
                      <p className='mt-4'>
                        <b>1. Avoiding X Platform&apos;s Rate Limits</b>
                      </p>
                      <p className='mt-3'>
                        X imposes limits on actions like tweet deletions, likes,
                        and retweets. These limits define how many actions can
                        be performed per second or minute. Executing actions too
                        quickly may exceed these limits, causing errors or
                        failed actions.
                      </p>
                      <p className='mt-4'>
                        <b>2. Protecting Your Account from Suspension</b>
                      </p>
                      <p className='mt-3'>
                        If actions are performed too quickly or all at once, X
                        may detect bot-like behavior and flag your account. In
                        the worst-case scenario, this could lead to temporary
                        restrictions or even account suspension. To avoid this,
                        we perform each action one at a time and introduce a
                        small random delay between actions to mimic natural user
                        behavior.
                      </p>
                      <p className='mt-3'>
                        Due to second reason, we strongly recommend splitting
                        large bulk actions into multiple smaller sessions with
                        short breaks in between. You can do this by providing
                        the maximum number of tweets to perform the action on.
                        If you want to delete x number of tweets, instead of
                        deleting all at once, delete x/2 tweets in one session
                        and the remaining x/2 tweets in another session.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
              <section>
                <Benefits
                  benefitCards={benefitCards}
                  subheading='Discover the advantages of our Bulk Action Extension'
                />
              </section>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Page;
