import { getAbsoluteUrl } from '@/api-utils/utils';
import EngagingTweetGuideHeading from '@/components/ai-tweet-generator/EngagingTweetGuideHeading';
import EngagingTweetGuideParagraphsContainer from '@/components/ai-tweet-generator/EngagingTweetGuideParagraphsContainer';
import H2Heading from '@/components/ai-tweet-generator/H2Heading';
import TweetGeneratorSection from '@/components/ai-tweet-generator/TweetGeneratorSection';
import ClarityScript from '@/components/common/ClarityScript';
import Faqs from '@/components/common/FaqsSection';
import { InlineLink } from '@/components/common/Links';
import ProductsSection from '@/components/common/ProductsSection';
import {
  BulbIcon,
  ClockIcon,
  CommunityIcon,
  Emojiicon,
  EmotionsIcon,
  ExtensionIcon,
  KeywordsIcon,
  OptionsIcon,
  PersonalizedContentIcon,
  ReplyIcon,
  RocketIcon,
} from '@/components/icons';
import HowToSectionStepContainer from '@/components/product-pages/HowToSectionStepContainer';
import HowToSectionStepHeading from '@/components/product-pages/HowToSectionStepHeading';
import StepHeader from '@/components/product-pages/StepHeader';
import Benefits from '@/components/public-generation/Benefits';
import Features from '@/components/public-generation/Features';
import PublicGenerationPageLayout from '@/components/public-generation/PublicGenerationPageLayout';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  FaqsTweetGenerator,
  FIREFOX_TWEET_GENERATOR_EXTENSION_LINK,
  products,
  URLS,
} from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'AI-Powered Tweet Generator - TweetStorm.ai',
  description:
    'TweetStorm is an AI Tweet Generator that helps you write tweets and replies for X. Create original tweets, generate AI responses, and manage your Twitter content.',
  alternates: {
    canonical: getAbsoluteUrl(URLS.publicTweetGeneration),
  },
};

const benefitCards: Array<{
  title: string;
  description: string;
  icon: JSX.Element;
}> = [
  {
    title: 'Time Efficiency',
    description:
      'AI tweet generator saves your time by generating posts quickly. Use the time saved to focus on other aspects of your social media marketing strategy.',
    icon: <ClockIcon />,
  },
  {
    title: 'Increased Reach',
    description:
      'Leverage AI-generated tweets tailored to your target audience, expanding your reach. Attract new followers and amplify your online presence effortlessly.',
    icon: <RocketIcon />,
  },
  {
    title: 'Consistent Engagement',
    description:
      'Keep your Twitter feed active with fresh content. AI tweet generator helps you maintain a lively Twitter presence that encourages audience interaction.',
    icon: <CommunityIcon />,
  },
  {
    title: 'Tailored Tone Control',
    description:
      'Maintain your brand voice or switch it up with tone customization feature of our AI tweet generator. The AI tweet generator lets you write tweets in a tone that suits your needs — funny, professional, sarcastic, and more.',
    icon: <Emojiicon />,
  },
  {
    title: 'Get Creative',
    description:
      'Break through creative blocks with innovative Twitter post ideas powered by AI. Spark unique, imaginative content that stands out in a crowded social feed.',
    icon: <BulbIcon />,
  },

  {
    title: 'Personalized Content',
    description:
      'Ensure personalized and engaging content with keyword inclusion. The AI-powered tweet generator integrates your user input into AI-generated tweets, aligning with your campaigns and generating relevant Twitter captions naturally.',
    icon: <PersonalizedContentIcon />,
  },
  {
    title: 'Enhanced Expressiveness',
    description:
      'Add emotional flair or boost discoverability with emojis and hashtags. Our AI tweet generator lets you include or exclude elements like AI-generated hashtags or emojis — giving you full control over your tweet generation strategy.',
    icon: <EmotionsIcon />,
  },
];

const featureCards: Array<{
  title: string;
  description: string;
  icon: JSX.Element;
}> = [
  {
    title: 'Tweet Replies Generation',
    description:
      'Generate appropriate replies to any tweet within seconds. Choose from a range of tone options to generate replies with the style of your choice.',
    icon: <ReplyIcon />,
  },
  {
    title: 'Browser Extension',
    description:
      "Our browser extension, available for both Chrome and Firefox, lets you generate tweets and replies right from Twitter's website with an intuitive interface.",
    icon: <ExtensionIcon width='1.5em' height='1.5em' />,
  },
  {
    title: 'Tweet Generations History',
    description:
      'View the history of all your tweet generations. Never worry about losing your tweets, whether generated from the website or through the browser extension.',
    icon: <ClockIcon />,
  },
  {
    title: 'Tweet Length Options',
    description:
      'Generate medium and long tweets apart from the standard short tweets. This feature is beneficial for premium X users who have the option of generating long tweets.',
    icon: <OptionsIcon />,
  },
  {
    title: 'Tone Selection',
    description:
      "Choose the tone of your tweet or reply to match your intent. Whether it's funny, professional, sarcastic, or anything in between, generate accurate and reliable tweets that reflect your voice.",
    icon: <EmotionsIcon />,
  },

  {
    title: 'Keyword Inclusion',
    description:
      "Specify keywords you'd like to appear in your generated tweets. Our AI will naturally incorporate them into the content, keeping the tweet coherent and relevant.",
    icon: <KeywordsIcon />,
  },

  {
    title: 'Include Emoji and Hashtag Options',
    description:
      "Add personality or reach to your tweets with optional emoji and hashtag checkboxes. Include them only when you want to — you're in control.",
    icon: <Emojiicon />,
  },
];

function AITweetGeneratorPage() {
  return (
    <>
      <ClarityScript />
      <PublicGenerationPageLayout>
        <TweetGeneratorSection />

        <Features
          featureCards={featureCards}
          description='Explore the features of our AI Tweet Generator'
        />

        <div className='max-w-6xl mx-auto mt-36'>
          <article>
            <div className='text-center'>
              <H2Heading>How to Guide </H2Heading>
              <p className='mt-2'>
                Learn how to generate tweets with our AI Tweet Generator
              </p>
            </div>
            <div className='space-y-12 mt-16'>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader stepNumber={1} stepTitle='Login to TweetStorm' />

                  <p className='mt-4'>
                    <InlineLink decorated href={URLS.login}>
                      Login
                    </InlineLink>{' '}
                    to TweetStorm.ai. If you don&apos;t have an account, then{' '}
                    <InlineLink decorated href={URLS.signup}>
                      create an account
                    </InlineLink>
                    .
                  </p>
                </div>
                <Image
                  src='/img/login-page.webp'
                  className='rounded-md border dark:border-none'
                  alt='Login page for TweetStorm.ai'
                  width={1000}
                  height={511}
                />
              </HowToSectionStepContainer>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader stepNumber={2} stepTitle='Describe Your Tweet' />
                  <p className='mt-4'>
                    Once logged in, select the Tweet Generator page from the
                    sidebar. Here you can enter the prompt for your tweet.
                  </p>
                  <p className='mt-3'>
                    You can choose the <i>tone</i> of your tweet by selecting
                    one of the options such as professional, sarcastic, funny
                    and many more. You can select whether to include{' '}
                    <i>hashtags</i> and <i>emojis</i> in the generated tweet.
                  </p>
                  <p className='mt-3'>
                    You can also give the exact <i>keywords</i> that will be
                    added to you tweets by our AI generator.
                  </p>
                </div>
                <Image
                  src='/img/tweet-generator.png'
                  className='rounded-md border dark:border-none lg:order-[-1]'
                  alt='AI Tweet generator page with an input field for entering tweet prompt and a generate button'
                  width={1000}
                  height={508}
                />
              </HowToSectionStepContainer>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader stepNumber={3} stepTitle='Generate Your Tweet' />
                  <p className='mt-4'>
                    Once the tweet prompt is entered and you have selected all
                    the filters that you wanna include, click on the{' '}
                    <b>Generate Tweet</b> button to generate the tweet. This
                    will start the generation process.
                  </p>
                </div>
                <Image
                  src='/img/tweet-generation-loading.png'
                  className='rounded-md border dark:border-none'
                  alt='Loading message being displayed while tweet is generated in the AI tweet generator page'
                  width={800}
                  height={350}
                />
              </HowToSectionStepContainer>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader stepNumber={4} stepTitle='Get Your Tweet' />
                  <p className='mt-4'>
                    After a few seconds, your tweet will be generated and
                    visible.
                  </p>
                  <p className='mt-3'>
                    You can copy the tweet or click on the<b> Tweet this </b>
                    button that will take you to the Twitter homepage where you
                    can post your tweet.
                  </p>
                </div>
                <Image
                  src='/img/generated-tweet.png'
                  className='rounded-md border dark:border-none lg:order-[-1]'
                  alt='A section in the AI tweet generator page displaying the generated tweet and two buttons'
                  width={1000}
                  height={647}
                />
              </HowToSectionStepContainer>
            </div>
          </article>
          <article className='mt-36'>
            <div className='text-center'>
              <H2Heading>How to Guide—Browser Extension</H2Heading>
              <div className='max-w-2xl mx-auto'>
                <p className='mt-2'>
                  Learn how to generate AI tweets using our browser extension.
                  Generate engaging tweets right from the Twitter interface.
                </p>
              </div>
            </div>
            <div className='space-y-12 mt-12'>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader
                    stepNumber={1}
                    stepTitle='Install the Extension'
                  />
                  <p className='mt-4'>
                    For <b>Chrome</b>, click on this{' '}
                    <InlineLink
                      decorated
                      href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                    >
                      {' '}
                      link
                    </InlineLink>{' '}
                    to get the extension. For <b>Firefox</b>, click on{' '}
                    <InlineLink
                      decorated
                      href={FIREFOX_TWEET_GENERATOR_EXTENSION_LINK}
                    >
                      {' '}
                      this{' '}
                    </InlineLink>{' '}
                    link.
                  </p>
                  <p className='mt-3'>
                    Click the <b>Add to Chrome </b>button for Chrome to install
                    the extension. For Firefox, click the
                    <b> Add to Firefox</b> button.
                  </p>
                </div>
                <Image
                  src='/img/add-to-chrome-tweet-generator.png'
                  className='rounded-md border dark:border-none'
                  alt='The Chrome Web Store page for the AI tweet generator extension'
                  width={1000}
                  height={453}
                />
              </HowToSectionStepContainer>
              <div className='space-y-6'>
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
                    In the<b> Extension API Key</b> section in the profile page,
                    you will see your API key. Copy this key.
                  </p>
                  <Image
                    src='/img/copy-key-button.webp'
                    className='rounded-md border dark:border-none lg:order-[-1]'
                    alt='An API Key input with a highlighted copy button'
                    width={809}
                    height={193}
                  />
                </HowToSectionStepContainer>
              </div>
              <HowToSectionStepContainer>
                <div>
                  <StepHeader
                    stepNumber={3}
                    stepTitle='Activate the Extension'
                  />
                  <p className='mt-4'>
                    Open the extension popup, paste the extension API key, and
                    press <b>Save</b> button.
                  </p>
                </div>
                <Image
                  src='/img/activate-extension-tweet-generator.png'
                  className='rounded-md border dark:border-none'
                  alt='Tweet Generator extension popup asking for API Key with a button to save the key'
                  width={340}
                  height={377}
                />
              </HowToSectionStepContainer>
              <HowToSectionStepContainer>
                <div>
                  <HowToSectionStepHeading>
                    How to Generate a Tweet
                  </HowToSectionStepHeading>
                  <p className='mt-4'>
                    On your Twitter account, now you will see a separate input
                    field for generating AI tweets.
                  </p>
                  <p className='mt-3'>
                    Enter the tweet prompt, select tone of the generated tweet
                    (by default No Tone is applied), input any keywords that you
                    want to add in the response, select tweet length (short by
                    default), and select the checkboxes if you want to include
                    emojis and hashtags in the content generated by our AI tweet
                    generator. Click on the <b>Generate</b> button to get your
                    tweet.
                  </p>
                </div>
                <Image
                  src='/img/how-to-use-tweet-generator.png'
                  className='rounded-md border dark:border-none'
                  alt='A highlighted section with a tweet input prompt, a select input for choosing tweet length and a generate button'
                  width={620}
                  height={244}
                />
              </HowToSectionStepContainer>
              <HowToSectionStepContainer>
                <div>
                  <HowToSectionStepHeading>
                    How to Reply to a Tweet
                  </HowToSectionStepHeading>
                  <p className='mt-4'>
                    Once you select the tweet you want to reply to, you will see
                    the highlighted UI section for generating replies.
                  </p>
                  <p className='mt-3'>
                    Select a tone for reply from the drop down. Add the keywords
                    you want to add in the response and check the checkboxes if
                    you want to include emojis or hashtags in the generated
                    response and click on <b>Generate</b> button to generate the
                    reply.
                  </p>
                </div>
                <Image
                  src='/img/reply-tweet-generator.png'
                  className='rounded-md border dark:border-none'
                  alt='A highlighted section showing select input for tone of the tweet reply and a generate button'
                  width={304}
                  height={408}
                />
              </HowToSectionStepContainer>
            </div>
            <p className='max-w-3xl mt-12'>
              And voila 🚀! You are now ready to use our AI tweet generator
              extension to generate viral tweets and tweet replies to improve
              your Twitter game. To learn more about the extension, please visit{' '}
              <InlineLink decorated href={URLS.tweetGeneratorExtension}>
                this
              </InlineLink>{' '}
              page.
            </p>
          </article>
          <article className='mt-36'>
            <H2Heading className='text-center'>View Generated Tweets</H2Heading>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 mt-12'>
              <div className='space-y-4'>
                <p>
                  Never worry about losing your tweets. Whether you generated
                  tweets using website or browser extension, all your Twitter
                  posts and replies will be saved.
                </p>
                <p>
                  View all your history of generations in the{' '}
                  <b>My Generations</b> page that you can see in the sidebar.
                  Generations are displayed in a table. Free users can see the
                  latest 5 generations, while paid users can view them all.
                </p>
                <p>
                  Along with generated tweets, you can see other generations
                  that include hashtag generation, bio generation, handle
                  generation, and tweet replies. The table displays the
                  generation type, input prompt, the generated content, and the
                  date of content creation.
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
          <article className='max-w-3xl mx-auto mt-36'>
            <H2Heading>Best Practices for Crafting Engaging Tweets</H2Heading>
            <div className='space-y-8 mt-12'>
              <div>
                <EngagingTweetGuideHeading>
                  Start with a Hook
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Your first sentence is the first impression and has to grab
                    your audience&apos;s attention. It could be a question, a
                    statement, or a fact that makes them pause and take notice.
                    Use strong, action-oriented language that sets the scene for
                    what&apos;s to come and makes users read more.
                  </p>
                  <p>
                    A good hook can boost your tweet&apos;s engagement. Try
                    different hooks and see what works best for your followers.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>
                  Keep it Short and Sweet
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Brevity is your friend with Twitter&apos;s 280-character
                    limit, so every word counts. Focus on saying what you need
                    to say clearly and concisely and eliminate any unnecessary
                    words that dilute your core idea.
                  </p>
                  <p>
                    Use impactful language and avoid jargon that might alienate
                    some of your readers. Less is more when it comes to
                    tweeting.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>
                  Create Emojis
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Emojis can add personality to your Twitter posts and make
                    them visually and emotionally engaging. They&apos;re great
                    visual cues to convey tone, mood or a quick message without
                    needing extra words. Just balance is key—use emojis
                    sparingly so they enhance rather than overpower your
                    message.
                  </p>
                  <p>
                    A well-placed emoji can make your content more relatable and
                    human and boost overall engagement. Use them thoughtfully to
                    create a friendly and vibrant digital persona.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>Add Humor</EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    humor is a powerful way to build connections and make your
                    tweets more memorable. A good joke or witty remark can turn
                    a boring tweet into something shareable and fun. It invites
                    your audience to engage with you.
                  </p>
                  <p>
                    Be mindful of your audience—what works for one group might
                    not work for another. Avoid sensitive topics that might be
                    misinterpreted. A bit of humor can make your Twitter post
                    stand out in a sea of content.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>
                  Encourage Engagement
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Twitter posts that invite interaction are more likely to
                    create a vibrant community around your content. Ask
                    open-ended questions, create polls, or simply invite your
                    followers to share their thoughts and experiences.
                  </p>
                  <p>
                    Engaging with comments and retweets builds a two-way
                    conversation, making followers feel valued and heard. This
                    interaction will lead to a more dynamic and engaging Twitter
                    presence.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>
                  Include Relevant Hashtags
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Hashtags are an effective way to expand the reach of your
                    tweets and connect with broader conversations in your niche.
                    Research trending and trending hashtags that align with your
                    content to increase discoverability and join larger
                    discussions.
                  </p>
                  <p>
                    Use them strategically—one or two well-chosen hashtags can
                    be far more effective than a cluttered string of tags. A
                    thoughtful hashtag strategy can help in brand promotion and
                    reinforce your message with your target Twitter audience.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
              <div>
                <EngagingTweetGuideHeading>
                  Post Consistently and Analyze Performance
                </EngagingTweetGuideHeading>
                <EngagingTweetGuideParagraphsContainer>
                  <p>
                    Consistency in posting is key to maintaining your
                    audience&apos;s interest and building momentum over time.
                    Regular updates help establish a reliable presence and keep
                    your followers coming back for more.
                  </p>
                  <p>
                    Alongside consistent posting, make it a habit to review your
                    tweet performance using analytics tools. This data provides
                    insights into what content resonates most, which posting
                    times work best, and how your audience is interacting with
                    your tweets.
                  </p>
                  <p>
                    Over time, this analytical approach will help you create
                    engaging and high-quality tweets that drive sustained
                    engagement.
                  </p>
                </EngagingTweetGuideParagraphsContainer>
              </div>
            </div>
          </article>
        </div>
        <Benefits
          benefitCards={benefitCards}
          subheading='Explore the benefits of our AI Tweet Generator'
        />

        <Faqs accordionItems={FaqsTweetGenerator} />
        <ProductsSection
          products={products.filter(
            product => product.href !== URLS.publicTweetGeneration
          )}
          className='mt-20!'
        />
      </PublicGenerationPageLayout>
    </>
  );
}

export default AITweetGeneratorPage;
