import { getAbsoluteUrl } from '@/api-utils/utils';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import ClarityScript from '@/components/common/ClarityScript';
import HeroSectionForTweetGenerator from '@/components/common/extension-pages/HeroSectionTweetGenertor';
import HowToSectionStepContainer from '@/components/common/extension-pages/HowToSectionStepContainer';
import Footer from '@/components/common/Footer';
import { InlineLink } from '@/components/common/Links';
import NavigationMenu from '@/components/common/navigation/NavigationMenu';
import StickyNavigationWrapper from '@/components/common/navigation/StickyNavigationWrapper';
import {
  AutomaticIcon,
  ClockIcon,
  ReachIcon,
  RelevanceIcon,
  RocketIcon,
} from '@/components/icons';
import Introduction from '@/components/product-pages/Introduction';
import StepHeader from '@/components/product-pages/StepHeader';
import Benefits from '@/components/public-generation/Benefits';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  FIREFOX_TWEET_GENERATOR_EXTENSION_LINK,
  NAVIGATION_HEADER_HEIGHT,
  URLS,
} from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Tweet Generator Browser Extension - TweetStorm.ai',
  description:
    'Learn how to use the Tweet Generator Browser Extension to generate tweets and replies on X using AI with our step-by-step guide.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.tweetGeneratorExtension),
  },
};
const benefitCards = [
  {
    title: 'Save Time and Effort',
    description:
      'Stop spending hours brainstorming. With AI generated tweets, you can maintain a consistent posting schedule without sacrificing quality. The AI extension helps you publish content swiftly, giving you more time to focus on engaging with your audience.',
    icon: <ClockIcon />,
  },
  {
    title: 'Boost Engagement',
    description:
      'Create authentic conversations with responses suited to different moods and styles. Use thoughtful questions to spark discussions and affirmations to build rapport—turning casual followers into an active, engaged community.',

    icon: <RocketIcon />,
  },
  {
    title: 'Personalized Content',
    description:
      "From short and snappy to long, detailed tweets, the extension adapts to your style. Use customizable prompts and tone adjustments to match your audience's interests, ensuring every tweet feels personal and relevant.",
    icon: <ReachIcon />,
  },
  {
    title: 'Maximize Your Reach',
    description:
      "Timely and engaging responses boost your visibility on Twitter. Strategic replies via our AI tweet generator increases your chances of being noticed by influencers and appearing in trending conversations, accelerating your account's growth and reach.",
    icon: <RelevanceIcon />,
  },
  {
    title: 'Simplify Your Workflow',
    description:
      'No more juggling between tools. With a dedicated AI tweet generator input within your Twitter dashboard, you can create, and post content seamlessly—all in one place.',
    icon: <AutomaticIcon />,
  },
];

function Page() {
  return (
    <>
      <ClarityScript />
      <div className='dark:bg-primary-dark-light'>
        <StickyNavigationWrapper>
          <NavigationMenu />
        </StickyNavigationWrapper>

        <main
          className='responsive-pad'
          style={{ paddingTop: NAVIGATION_HEADER_HEIGHT }}
        >
          <div className='max-w-6xl mx-auto pb-12 lg:pb-16 '>
            <article className='max-w-none text-decoration-none'>
              <HeroSectionForTweetGenerator
                heading='Generate AI Tweets - Browser Extension'
                subheading='Generate engaging tweets in seconds with AI'
              />
              <Introduction>
                <div className='prose prose-custom'>
                  <p>
                    Our &quot;AI Tweet Generator&quot; extension, part of the AI
                    tools by <Link href='/'>TweetStorm.ai</Link>, empowers you
                    to grow your Twitter audience effortlessly. Quickly create
                    tweets or replies while streamlining your content process to
                    save time and boost engagement. You can have the following
                    benefits:
                  </p>
                  <p>
                    🚀 <strong>Generate Tweets on Demand:</strong> Unleash your
                    creativity with the power of AI. Quickly produce tweets of
                    any length—from catchy one-liners to detailed, long
                    tweets—tailored to captivate your audience and drive
                    conversations.
                  </p>
                  <p>
                    💬 <strong>Smart Response Options: </strong>
                    Engage your audience with concise, impactful replies—from
                    positive affirmations to thoughtful questions—designed to
                    spark conversations and drive interactions.
                  </p>
                </div>
              </Introduction>
              <div className='text-base/relaxed'>
                <div id='how-to-get-started' className='scroll-mt-20 my-20'>
                  <div className='text-center my-20'>
                    <H2Heading>How to Guide</H2Heading>
                    <div className='max-w-2xl mx-auto mt-4'>
                      <p>
                        Learn how to generate AI tweets using our browser
                        extension. Generate engaging tweets right from the
                        Twitter interface.
                      </p>
                    </div>
                  </div>{' '}
                  <div>
                    <HowToSectionStepContainer>
                      <div>
                        <StepHeader
                          stepNumber={1}
                          stepTitle='Install the Extension'
                        />
                        <p className='mt-4'>
                          For <b>Chrome</b>, click on{' '}
                          <Link
                            href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                            target='_blank'
                          >
                            this
                          </Link>{' '}
                          link to get the extension. For <b>Firefox</b>, click
                          on{' '}
                          <Link
                            href={FIREFOX_TWEET_GENERATOR_EXTENSION_LINK}
                            target='_blank'
                          >
                            this
                          </Link>{' '}
                          link. Click <b>Add to Chrome</b> button for Chrome to
                          install the extension. For Firefox, click{' '}
                          <b>Add to Firefox</b> button.
                        </p>
                      </div>
                      <Image
                        src={'/img/add-to-chrome-tweet-generator.png'}
                        alt='button that tells to add the extension to chrome'
                        className='rounded-md border dark:border-none'
                        width={913}
                        height={413}
                      />
                    </HowToSectionStepContainer>
                    <HowToSectionStepContainer>
                      <div>
                        <StepHeader
                          stepNumber={2}
                          stepTitle='Obtain Your Extension API Key'
                        />
                        <p className='mt-4'>
                          <InlineLink decorated href={URLS.login}>
                            Login
                          </InlineLink>{' '}
                          to your account on TweetStorm.{' '}
                          <InlineLink decorated href={URLS.signup}>
                            Register
                          </InlineLink>{' '}
                          if you don&apos;t have an account.
                        </p>
                        <p className='mt-3'>
                          After logging in, go to the Profile page.
                        </p>
                      </div>
                      <Image
                        src='/img/profile-page.webp'
                        className='rounded-md border dark:border-none lg:order-[-1]'
                        alt='Highlighted profile page in sidebar'
                        width={1000}
                        height={508}
                      />
                    </HowToSectionStepContainer>
                    <HowToSectionStepContainer>
                      <p>
                        In the<b> Extension API Key</b> section in the profile
                        page, you will see your API key. Copy this key.
                      </p>
                      <Image
                        src='/img/copy-key-button.webp'
                        className='rounded-md border dark:border-none lg:order-[-1]'
                        alt='An API Key input with a highlighted copy button'
                        width={809}
                        height={193}
                      />
                    </HowToSectionStepContainer>
                    <HowToSectionStepContainer>
                      <div>
                        <StepHeader
                          stepNumber={3}
                          stepTitle='Activate the Extension'
                        />
                        <p className='mt-4'>
                          Open the extension popup by clicking the installed
                          extension in the browser. Paste the Extension API key
                          and press save.
                        </p>
                      </div>

                      <Image
                        src={'/img/activate-extension-tweet-generator.png'}
                        alt='an input field asking for api key'
                        className='rounded-md border dark:border-none'
                        width={340}
                        height={377}
                      />
                    </HowToSectionStepContainer>
                  </div>
                  <p>
                    {' '}
                    And Voila 🚀! You are good to go and ready for using the
                    extension.
                  </p>
                </div>
                <div>
                  <div className='text-center'></div>

                  <HowToSectionStepContainer>
                    <div>
                      <H2Heading>How to Generate a Tweet</H2Heading>

                      <div className='space-y-4 mt-4'>
                        <p>
                          On your Twitter dashboard, you&apos;ll now see a new
                          input field to generate tweets.
                        </p>
                        <p>
                          You can write a custom prompt, choose a tone (like
                          Funny, Serious, or Controversial), and add specific
                          keywords you want in the tweet.
                        </p>

                        <p>
                          Select the tweet length — 280 characters (1 credit),
                          ~1000 characters (3 credits), or ~2500 characters (6
                          credits).
                        </p>

                        <p>
                          Use checkboxes to include emojis or hashtags for more
                          engagement.
                        </p>
                        <p>
                          Hit the “Generate” button to create your tweet based
                          on the options you selected.
                        </p>
                      </div>
                    </div>
                    <Image
                      src={'/img/how-to-use-tweet-generator.png'}
                      alt='a start button'
                      className='rounded-md border dark:border-none lg:order-[-1]'
                      width={620}
                      height={244}
                    />
                  </HowToSectionStepContainer>
                </div>
                <div>
                  <HowToSectionStepContainer>
                    <div>
                      <H2Heading> How to Reply to a Tweet</H2Heading>

                      <div className='space-y-4 mt-4'>
                        <p>
                          Once you select the tweet you want to reply to, you
                          will see a section at the bottom for generating
                          replies.
                        </p>
                        <p>
                          Replying to a tweet only costs &quot;1 credit&quot;.
                          The content of the section is as follows:
                        </p>
                        <ol>
                          <li>
                            Dropdown to select the tone of the reply. You have
                            multiple options to choose from like positive,
                            negative, neutral, etc.
                          </li>
                          <li>
                            Inlcude Emojis checkbox to include emojis in the
                            generated tweets
                          </li>
                          <li>
                            Inlcude Hashtags checkbox to include emojis in the
                            generated tweets
                          </li>
                          <li>Generate Button</li>
                        </ol>

                        <p>
                          Select the tone for your reply and click on the
                          generate button to get the reply. Its that simple.
                        </p>
                      </div>
                    </div>
                    <Image
                      src={'/img/reply-tweet-generator.png'}
                      alt='how to reply to a tweet'
                      className='rounded-md border dark:border-none'
                      width={523}
                      height={415}
                    />
                  </HowToSectionStepContainer>
                </div>
                <article className='mt-36'>
                  <H2Heading className='text-center'>
                    View Generated Tweets
                  </H2Heading>
                  <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 mt-12'>
                    <div className='space-y-4'>
                      <p>
                        Never worry about losing your tweets. Whether you
                        generated tweets using website or browser extension, all
                        your Twitter posts and replies will be saved.
                      </p>
                      <p>
                        View all your history of generations in the{' '}
                        <b>My Generations</b> page that you can see in the
                        sidebar. Generations are displayed in a table. Free
                        users can see the latest 5 generations, while paid users
                        can view them all.
                      </p>
                      <p>
                        Along with generated tweets, you can see other
                        generations that include hashtag generation, bio
                        generation, handle generation, and tweet replies. The
                        table displays the generation type, input prompt, the
                        generated content, and the date of content creation.
                      </p>
                    </div>
                    <Image
                      src='/img/generations-history.png'
                      className='rounded-md border dark:border-none'
                      alt='A table showing all the AI generated tweets'
                      width={1850}
                      height={945}
                    />
                  </div>
                </article>
              </div>
              <section>
                <Benefits
                  benefitCards={benefitCards}
                  subheading='Discover the advantages of our Tweet Generation Extension'
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
