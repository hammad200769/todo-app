import {
  BIO_GENERATION_TONE,
  PLANS,
  PricingFeatureRow,
  PricingFeatures,
  PricingTableFeatureRow,
  REPLY_FILTER_TYPE,
  REPLY_TWEET_TONE,
  RepliesFilterTypeToNumberMap,
  STANDARD_TWEET_LENGTH,
  SUBSCRIPTION_NAME,
  TWEET_GENERATION_TONE,
  UserGenerationTypeToNumberMap,
} from '@/types/types';

import {
  AIIconOutlined,
  DeleteIcon,
  FollowIcon,
  HashTagIcon,
  LikeIcon,
  ProfileIcon,
  RetweetIcon,
  ScreenshotIcon,
  SearchIcon,
  TwitterHandleIcon,
  UnfollowIcon,
  UnlikeIcon,
  VideoIcon,
} from '@/components/icons';
import { DM_Sans, Inter, Poppins } from 'next/font/google';

export const MAX_PUBLIC_GENERATIONS_PER_TYPE = 3;
export const TOTAL_HASHTAGS_PER_GENERATION = 10;
export const TOTAL_HANDLES_PER_GENERATION = 5;
export const INVOICES_PER_PAGE = 5;

// Dynamic urls are not included
export const URLS = {
  blog: '/blog',
  login: '/login',
  signup: '/register',
  forgotPassword: '/forgot-password',
  publicTweetGeneration: '/ai-tweet-generator',
  publicHashtagGeneration: '/twitter-hashtag-generator',
  publicBioGeneration: '/twitter-bio-generator',
  publicHandleGeneration: '/twitter-handle-generator',
  publicTweetSearch: '/twitter-advanced-search',
  massTweetDeletionExtension: '/extensions/mass-tweet-deletion-and-more',
  tweetGeneratorExtension: '/extensions/ai-tweet-generator',
  termsOfService: '/terms-of-service',
  privacyPolicy: '/privacy-policy',
  dashboard: '/dashboard',
  tweetGeneration: '/dashboard/tweet-generator',
  hashtagGeneration: '/dashboard/hashtag-generator',
  bioGeneration: '/dashboard/bio-generator',
  handleGeneration: '/dashboard/handle-generator',
  tweetSearch: '/dashboard/tweet-search',
  myTweetSearces: '/my-tweet-searches',
  myGenerations: '/my-generations',
  billing: '/billing',
  profile: '/user/profile',
  pricing: '/pricing',
  blogAiTweetGenerator:
    'ai-tweet-generator-unleash-the-power-of-gpt-4-for-your-twitter-strategy',
  blogTwitterPresence:
    'unleashing-the-power-of-gpt-4-how-tweetstorm-ai-transforms-your-twitter-presence',
  massTweetDeletes: '/products/mass-tweet-deletes',
  twitterAutoLiker: '/products/twitter-auto-liker',
  deleteTwitterLikes: '/products/delete-twitter-likes',
  massTwitterFollows: '/products/mass-twitter-follows',
  massTwitterUnfollows: '/products/mass-twitter-unfollows',
  massRetweets: '/products/mass-retweets',
  twitter: 'https://x.com',
  videoDownloader: '/products/x-video-downloader',
  screenShot: '/products/x-post-screenshot',
  contactUs: '/contact-us',
};

export const USER_GENERATION_TYPE_TO_NUMBER_MAP: UserGenerationTypeToNumberMap =
  {
    Tweet: 0,
    Hashtags: 1,
    Bio: 2,
    Handle: 3,
    ReplyTweet: 4,
  };

export const MAX_KEYWORDS_LENGTH = 200;
export const MAX_TEXT_TO_GENERATE_LENGTH = 4000;

export const MONTHS: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const MONTHS_SHORT: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export const STANDARD_TWEET_LENGTHS_IN_NUMBER: Record<
  STANDARD_TWEET_LENGTH,
  number
> = {
  [STANDARD_TWEET_LENGTH.Short]: 280,
  [STANDARD_TWEET_LENGTH.Medium]: 1000,
  [STANDARD_TWEET_LENGTH.Long]: 2500,
};

export const SUBSCRIPTION_CREDITS: Record<SUBSCRIPTION_NAME | 'free', number> =
  {
    free: 20,
    [SUBSCRIPTION_NAME.Pro]: 250,
    [SUBSCRIPTION_NAME.Agency]: 700,
  };

export const CHROME_TWEET_GENERATOR_EXTENSION_LINK =
  'https://chromewebstore.google.com/detail/tweetstormai-ai-powered-t/pegmedmadgdhccchfceimeachnebjjoi';

export const FIREFOX_TWEET_GENERATOR_EXTENSION_LINK =
  'https://addons.mozilla.org/en-US/firefox/addon/tweetstorm-ai-tweet-generator/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search';

export const MASS_TWEET_DELETIONS_EXTENSION_LINK =
  'https://chromewebstore.google.com/detail/mass-tweet-deletions-foll/jmjobhdjfnligapkafapabenldhajeie';

export const MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX =
  'https://addons.mozilla.org/en-US/firefox/addon/tweetstorm-mass-twitter-action';

export const NAVIGATION_HEADER_HEIGHT = 68;

export const REPLIES_FILTER_TYPE_TO_NUMBER_MAP: RepliesFilterTypeToNumberMap = {
  [REPLY_FILTER_TYPE.With]: 0,
  [REPLY_FILTER_TYPE.Only]: 1,
  [REPLY_FILTER_TYPE.None]: 2,
};

export const LINKS_FILTER_TYPE_TO_NUMBER_MAP: RepliesFilterTypeToNumberMap = {
  [REPLY_FILTER_TYPE.With]: 0,
  [REPLY_FILTER_TYPE.Only]: 1,
  [REPLY_FILTER_TYPE.None]: 2,
};

export const TWEET_TONES = [...Object.values(TWEET_GENERATION_TONE)];

export const REPLY_TONE = [...Object.values(REPLY_TWEET_TONE)];

export const BIO_TONES = [...Object.values(BIO_GENERATION_TONE)];

export const BIO_TYPES = ['Person', 'Business', 'Influencer', 'Brand'];

export const LANGUAGES: Array<{ name: string; code: string }> = [
  { name: 'Any language', code: 'any-language' },
  { name: 'Amharic', code: 'am' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Arabic (Feminine)', code: 'ar-x-fm' },
  { name: 'Armenian', code: 'hy' },
  { name: 'Basque', code: 'eu' },
  { name: 'Bengali', code: 'bn' },
  { name: 'Bosnian', code: 'bs' },
  { name: 'Bulgarian', code: 'bg' },
  { name: 'Burmese', code: 'my' },
  { name: 'Catalan', code: 'ca' },
  { name: 'Croatian', code: 'hr' },
  { name: 'Czech', code: 'cs' },
  { name: 'Danish', code: 'da' },
  { name: 'Dutch', code: 'nl' },
  { name: 'English', code: 'en' },
  { name: 'Estonian', code: 'et' },
  { name: 'Finnish', code: 'fi' },
  { name: 'French', code: 'fr' },
  { name: 'Georgian', code: 'ka' },
  { name: 'German', code: 'de' },
  { name: 'Greek', code: 'el' },
  { name: 'Gujarati', code: 'gu' },
  { name: 'Haitian Creole', code: 'ht' },
  { name: 'Hebrew', code: 'he' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Icelandic', code: 'is' },
  { name: 'Indonesian', code: 'in' },
  { name: 'Italian', code: 'it' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Kannada', code: 'kn' },
  { name: 'Khmer', code: 'km' },
  { name: 'Korean', code: 'ko' },
  { name: 'Lao', code: 'lo' },
  { name: 'Latinized Hindi', code: 'hi-Latn' },
  { name: 'Latvian', code: 'lv' },
  { name: 'Lithuanian', code: 'lt' },
  { name: 'Malayalam', code: 'ml' },
  { name: 'Maldivian', code: 'dv' },
  { name: 'Marathi', code: 'mr' },
  { name: 'Nepali', code: 'ne' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Oriya', code: 'or' },
  { name: 'Punjabi', code: 'pa' },
  { name: 'Pashto', code: 'ps' },
  { name: 'Persian', code: 'fa' },
  { name: 'Polish', code: 'pl' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Romanian', code: 'ro' },
  { name: 'Russian', code: 'ru' },
  { name: 'Serbian', code: 'sr' },
  { name: 'Simplified Chinese', code: 'zh-CN' },
  { name: 'Sindhi', code: 'sd' },
  { name: 'Slovak', code: 'sk' },
  { name: 'Slovenian', code: 'sl' },
  { name: 'Sorani Kurdish', code: 'ckb' },
  { name: 'Spanish', code: 'es' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Tagalog', code: 'tl' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Telugu', code: 'te' },
  { name: 'Thai', code: 'th' },
  { name: 'Tibetan', code: 'bo' },
  { name: 'Traditional Chinese', code: 'zh-tw' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Ukrainian', code: 'uk' },
  { name: 'Urdu', code: 'ur' },
  { name: 'Uyghur', code: 'ug' },
  { name: 'Vietnamese', code: 'vi' },
  { name: 'Welsh', code: 'cy' },
];

export const FREE_PLAN_BULK_ACTIONS_USAGE = {
  tweetDeletions: 15,
  tweetUnlikes: 15,
  unfollows: 15,
  retweets: 50,
  tweetLikes: 100,
  follows: 50,
} satisfies Record<string, number>;

export const pricingFeatures: PricingFeatures = {
  free: [
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {SUBSCRIPTION_CREDITS.free}
          </strong>{' '}
          Credits / month
        </p>
      ),
      text: `${SUBSCRIPTION_CREDITS.free} Credits / month`,
      checked: true,
    },
    {
      text: 'Tweets Generator',
      checked: true,
      helpingText: ['Cost: 1 credit'],
      info: true,
    },
    {
      text: 'Medium and Long Tweet',
      checked: false,
    },
    {
      text: 'Hashtags Generator',
      checked: true,
      helpingText: ['Cost: 1 credit'],
      info: true,
    },
    {
      text: 'Bio Generator',
      checked: true,
      helpingText: ['Cost: 1 credit'],
      info: true,
    },
    {
      text: 'Handle Generator ',
      checked: true,
      helpingText: [
        'Cost: 1 credit per generation',
        'Each generation gives 5 handles',
      ],
      info: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Last 5</strong>{' '}
          generations history
        </p>
      ),
      text: 'Last 5 generations history',
      checked: true,
    },
    { text: 'Advanced Tweet Search', checked: true },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Last 5</strong>{' '}
          tweet searches history
        </p>
      ),
      text: 'Last 5 tweet searches history',
      checked: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.tweetDeletions}
          </strong>{' '}
          bulk tweet deletions
        </p>
      ),
      text: `${FREE_PLAN_BULK_ACTIONS_USAGE.tweetDeletions} bulk tweet deletions`,
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.tweetUnlikes}
          </strong>{' '}
          bulk tweet unlikes
        </p>
      ),
      text: `${FREE_PLAN_BULK_ACTIONS_USAGE.tweetUnlikes} bulk tweet unlikes`,
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.unfollows}
          </strong>{' '}
          bulk unfollows
        </p>
      ),
      text: `${FREE_PLAN_BULK_ACTIONS_USAGE.unfollows} bulk unfollows`,
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.tweetLikes}
          </strong>{' '}
          bulk likes / month
        </p>
      ),
      text: '100 bulk likes / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.follows}
          </strong>{' '}
          bulk follows / month
        </p>
      ),
      text: '50 bulk follows / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {FREE_PLAN_BULK_ACTIONS_USAGE.retweets}
          </strong>{' '}
          bulk retweets / month
        </p>
      ),
      text: '50 bulk retweets / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
  ],
  [SUBSCRIPTION_NAME.Pro]: [
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {SUBSCRIPTION_CREDITS.pro}
          </strong>{' '}
          Credits / month
        </p>
      ),
      text: `${SUBSCRIPTION_CREDITS.pro} Credits / month`,
      checked: true,
    },
    {
      text: 'Tweets Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Medium and Long Tweet',
      checked: true,
      info: true,
      helpingText: [
        'Medium tweet cost: 3 credits',
        'Long tweet cost: 6 credits',
      ],
    },
    {
      text: 'Hashtags Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Bio Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Handle Generator',
      checked: true,
      info: true,
      helpingText: [
        'Cost: 1 credit per generation',
        'Each generation gives 5 handles',
      ],
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Full</strong>{' '}
          generations history
        </p>
      ),
      text: 'Full generations history',
      checked: true,
    },
    { text: 'Advanced Tweet Search', checked: true },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Full</strong>{' '}
          tweet searches history
        </p>
      ),
      text: 'Full tweet searches history',
      checked: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk tweet deletions
        </p>
      ),
      text: 'Unlimited bulk tweet deletions',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk tweet unlikes
        </p>
      ),
      text: 'Unlimited bulk tweet unlikes',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk unfollows
        </p>
      ),
      text: 'Unlimited bulk unfollows',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>200</strong>{' '}
          bulk likes / month
        </p>
      ),
      text: '200 bulk likes / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>100</strong>{' '}
          bulk follows / month
        </p>
      ),
      text: '100 bulk follows / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>150</strong>{' '}
          bulk retweets / month
        </p>
      ),
      text: '150 bulk retweets / month',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
  ],
  [SUBSCRIPTION_NAME.Agency]: [
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            {SUBSCRIPTION_CREDITS.agency}
          </strong>{' '}
          Credits / month
        </p>
      ),
      text: `${SUBSCRIPTION_CREDITS.agency} Credits / month`,
      checked: true,
    },
    {
      text: 'Tweets Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Medium and Long Tweet',
      checked: true,
      info: true,
      helpingText: [
        'Medium tweet cost: 3 credits',
        'Long tweet cost: 6 credits',
      ],
    },
    {
      text: 'Hashtags Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Bio Generator',
      checked: true,
      info: true,
      helpingText: ['Cost: 1 credit'],
    },
    {
      text: 'Handle Generator',
      checked: true,
      info: true,
      helpingText: [
        'Cost: 1 credit per generation',
        'Each generation gives 5 handles',
      ],
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Full</strong>{' '}
          generations history
        </p>
      ),
      text: 'Full generations history',
      checked: true,
    },
    { text: 'Advanced Tweet Search', checked: true },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>Full</strong>{' '}
          tweet searches history
        </p>
      ),
      text: 'Full tweet searches history',
      checked: true,
    },

    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk tweet deletions
        </p>
      ),
      text: 'Unlimited bulk tweet deletions',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk tweet unlikes
        </p>
      ),
      text: 'Unlimited bulk tweet unlikes',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk unfollows
        </p>
      ),
      text: 'Unlimited bulk unfollows',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk likes
        </p>
      ),
      text: 'Unlimited bulk likes',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk follows
        </p>
      ),
      text: 'Unlimited bulk follows',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
    {
      component: (
        <p>
          <strong className='text-primary-dark dark:text-white'>
            Unlimited
          </strong>{' '}
          bulk retweets
        </p>
      ),
      text: 'Unlimited bulk retweets',
      checked: true,
      info: true,
      helpingText: ['Requires Mass Tweet Deletions extension'],
      hidden: true,
    },
  ],
};

export const screenShotPricingFeatures: PricingFeatures = {
  free: [
    {
      text: `Unlimited screenshots`,
      checked: true,
    },
    {
      text: 'Update canvas background color (solid + gradients + custom)',
      checked: true,
    },
    {
      text: 'Update tweet background color (solid + custom)',
      checked: true,
    },
    {
      text: 'Pre-built canvas sizes',
      checked: true,
    },
    {
      text: 'Custom padding',
      checked: true,
    },
    {
      text: 'Adjust tweet size and width',
      checked: true,
    },
    {
      text: 'Customize metric display (replies, retweets, likes, views)',
      checked: true,
    },
    { text: 'Show/Hide date and time', checked: true },

    {
      text: 'Adjust font size (for all content)',
      checked: true,
    },

    {
      text: (
        <span>
          {' '}
          <span className='font-extrabold text-black dark:text-white'>
            Normal quality
          </span>{' '}
          image download
        </span>
      ),
      checked: true,
    },

    {
      text: 'Customize download format',
      checked: true,
    },
    {
      text: 'Customize font family',
      checked: false,
    },
    { text: 'Show/Hide media (images/videos)', checked: false },
    {
      text: 'Add custom canvas image',
      checked: false,
    },
    {
      text: (
        <span>
          <span className='font-extrabold text-black dark:text-white'>No </span>
          presets
        </span>
      ),
      checked: false,
    },
    {
      text: 'Update link color (solid  + custom)',
      checked: false,
    },
  ],
  [SUBSCRIPTION_NAME.Pro]: [
    {
      text: `Unlimited screenshots`,
      checked: true,
    },
    {
      text: 'Update canvas background color (solid + gradients + custom)',
      checked: true,
    },
    {
      text: 'Update tweet background color (solid + custom)',
      checked: true,
    },
    {
      text: 'Pre-built canvas sizes',
      checked: true,
    },
    {
      text: 'Custom padding',
      checked: true,
    },
    {
      text: 'Adjust tweet size and width',
      checked: true,
    },
    {
      text: 'Customize metric display (replies, retweets, likes, views)',
      checked: true,
    },
    { text: 'Show/Hide date and time', checked: true },

    {
      text: 'Adjust font size (for all content)',
      checked: true,
    },

    {
      text: (
        <span>
          <span className='font-extrabold text-black dark:text-white'>
            High quality
          </span>{' '}
          image download
        </span>
      ),
      checked: true,
    },

    {
      text: 'Customize download format',
      checked: true,
    },
    {
      text: 'Customize font family',
      checked: true,
    },
    { text: 'Show/Hide media (images/videos)', checked: true },
    {
      text: 'Add custom canvas image',
      checked: true,
    },
    {
      text: (
        <span>
          <span className='font-extrabold text-black dark:text-white'>5</span>{' '}
          presets
        </span>
      ),
      checked: true,
    },
    {
      text: 'Update link color (solid  + custom)',
      checked: true,
    },
  ],
  [SUBSCRIPTION_NAME.Agency]: [
    {
      text: `Unlimited screenshots`,
      checked: true,
    },
    {
      text: 'Update canvas background color (solid + gradients + custom)',
      checked: true,
    },
    {
      text: 'Update tweet background color (solid + custom)',
      checked: true,
    },
    {
      text: 'Pre-built canvas sizes',
      checked: true,
    },
    {
      text: 'Custom padding',
      checked: true,
    },
    {
      text: 'Adjust tweet size and width',
      checked: true,
    },
    {
      text: 'Customize metric display (replies, retweets, likes, views)',
      checked: true,
    },
    { text: 'Show/Hide date and time', checked: true },

    {
      text: 'Adjust font size (for all content)',
      checked: true,
    },

    {
      text: (
        <span>
          <span className='font-extrabold text-black dark:text-white'>
            High Quality
          </span>{' '}
          Image Download
        </span>
      ),
      checked: true,
    },

    {
      text: 'Customize download format',
      checked: true,
    },
    {
      text: 'Customize font family',
      checked: true,
    },
    { text: 'Show/Hide media (images/videos)', checked: true },
    {
      text: 'Add custom canvas image',
      checked: true,
    },
    {
      text: (
        <span>
          <span className='font-extrabold text-black dark:text-white'>
            Unlimited
          </span>{' '}
          Presets
        </span>
      ),
      checked: true,
    },
    {
      text: 'Update Link Color (Solid  + Custom)',
      checked: true,
    },
  ],
};

export const pricingCoreFeatures: PricingFeatureRow[] = [
  {
    name: 'Credits / month',
    desc: {
      [SUBSCRIPTION_NAME.Pro]: '250',
      [SUBSCRIPTION_NAME.Agency]: '750',
    },
  },
  {
    name: 'Tweets Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Medium and Long Tweet',
    info: true,
    helpingText: ['Medium tweet cost: 3 credits', 'Long tweet cost: 6 credits'],
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Hashtags Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Bio Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Handle Generator',
    info: true,
    helpingText: [
      'Cost: 1 credit per generation',
      'Each generation gives 5 handles',
    ],
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Full generations history',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Advanced Tweet Search',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Full tweet searches history',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
];

export const pricingWithFreeCoreFeatures: PricingTableFeatureRow[] = [
  {
    name: 'Credits / month',
    desc: {
      [PLANS.Free]: '20',
      [PLANS.Pro]: '250',
      [PLANS.Agency]: '750',
    },
  },
  {
    name: 'Tweets Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Medium and Long Tweet',
    info: true,
    helpingText: ['Medium tweet cost: 3 credits', 'Long tweet cost: 6 credits'],
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Hashtags Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Bio Generator',
    info: true,
    helpingText: ['Cost: 1 credit'],
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Handle Generator',
    info: true,
    helpingText: [
      'Cost: 1 credit per generation',
      'Each generation gives 5 handles',
    ],
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Full generations history',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Advanced Tweet Search',
    availability: {
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
      [PLANS.Free]: true,
    },
  },
  {
    name: 'Full tweet searches history',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
];

export const pricingScreenshotFeatures: PricingFeatureRow[] = [
  {
    name: 'Number of screenshots',
    desc: {
      [SUBSCRIPTION_NAME.Pro]: 'Unlimited',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Update canvas background color (solid + gradients + custom)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Update tweet background color (solid + custom)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Pre-built cavas sizes',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Custom padding',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Adjust tweet size and width',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },

  {
    name: 'Customize metric display (replies, retweets, likes, views)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Show/Hide date and time',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Adjust font size (for all content)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Image download quality',
    desc: {
      [SUBSCRIPTION_NAME.Pro]: ' High quality',
      [SUBSCRIPTION_NAME.Agency]: ' High quality',
    },
  },
  {
    name: 'Customize download format',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Customize font family',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Show/Hide media (images/videos)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
  {
    name: 'Add custom canvas image',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },

  {
    name: 'Presets limit',
    desc: {
      [SUBSCRIPTION_NAME.Pro]: '5',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Update link color (solid + custom)',
    availability: {
      [SUBSCRIPTION_NAME.Pro]: true,
      [SUBSCRIPTION_NAME.Agency]: true,
    },
  },
];

export const pricingWithFreeScreenshotFeatures: PricingTableFeatureRow[] = [
  {
    name: 'Number of screenshots',
    desc: {
      [PLANS.Free]: 'Unlimited',
      [PLANS.Pro]: 'Unlimited',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Update canvas background color (solid + gradients + custom)',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Update tweet background color (solid + custom)',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Pre-built cavas sizes',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Custom padding',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Adjust tweet size and width',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },

  {
    name: 'Customize metric display (replies, retweets, likes, views)',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Show/Hide date and time',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Adjust font size (for all content)',
    availability: {
      [PLANS.Free]: true,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Image download quality',
    desc: {
      [PLANS.Free]: ' Normal',
      [PLANS.Pro]: ' High',
      [PLANS.Agency]: ' High',
    },
  },
  {
    name: 'Customize download format',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Customize font family',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Show/Hide media (images/videos)',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
  {
    name: 'Add custom canvas image',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },

  {
    name: 'Presets limit',
    desc: {
      [PLANS.Free]: '0',
      [PLANS.Pro]: '5',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Update link color (solid + custom)',
    availability: {
      [PLANS.Free]: false,
      [PLANS.Pro]: true,
      [PLANS.Agency]: true,
    },
  },
];

export const pricingBulkActionsFeatures: PricingFeatureRow[] = [
  {
    name: 'Bulk tweet deletions',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: 'Unlimited',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk tweet unlikes',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: 'Unlimited',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk unfollows',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: 'Unlimited',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk likes / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: '200',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk follows / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: '100',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk retweets / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [SUBSCRIPTION_NAME.Pro]: '150',
      [SUBSCRIPTION_NAME.Agency]: 'Unlimited',
    },
  },
];
export const pricingWithFreeBulkActionsFeatures: PricingTableFeatureRow[] = [
  {
    name: 'Bulk tweet deletions',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '15',
      [PLANS.Pro]: 'Unlimited',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk tweet unlikes',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '15',
      [PLANS.Pro]: 'Unlimited',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk unfollows',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '15',
      [PLANS.Pro]: 'Unlimited',
      [PLANS.Agency]: 'Unlimited',
    },
  },

  {
    name: 'Bulk likes / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '100',
      [PLANS.Pro]: '200',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk follows / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '50',
      [PLANS.Pro]: '100',
      [PLANS.Agency]: 'Unlimited',
    },
  },
  {
    name: 'Bulk retweets / month',
    info: true,
    helpingText: ['Requires Mass Tweet Deletions extension'],
    desc: {
      [PLANS.Free]: '50',
      [PLANS.Pro]: '150',
      [PLANS.Agency]: 'Unlimited',
    },
  },
];

export const gradientDirections = [
  { label: 'Top to Bottom', value: 'to-b', icon: '↓' },
  { label: 'Bottom to Top', value: 'to-t', icon: '↑' },
  { label: 'Left to Right', value: 'to-r', icon: '→' },
  { label: 'Right to Left', value: 'to-l', icon: '←' },
  { label: 'Top-Left to Bottom-Right', value: 'to-br', icon: '↘' },
  { label: 'Top-Right to Bottom-Left', value: 'to-bl', icon: '↙' },
  { label: 'Bottom-Left to Top-Right', value: 'to-tr', icon: '↗' },
  { label: 'Bottom-Right to Top-Left', value: 'to-tl', icon: '↖' },
  { label: 'Radial (Center)', value: 'radial', icon: '○' },
];
export const gradientPresets = [
  {
    name: 'Sunset',
    startColor: '#ff7e5f',
    endColor: '#feb47b',
    direction: 'to-br',
  },
  {
    name: 'Ocean',
    startColor: '#667eea',
    endColor: '#764ba2',
    direction: 'to-r',
  },
  {
    name: 'Forest',
    startColor: '#11998e',
    endColor: '#38ef7d',
    direction: 'to-tr',
  },
  {
    name: 'Purple Haze',
    startColor: '#667db6',
    endColor: '#0082c8',
    direction: 'to-br',
  },
  {
    name: 'Fire',
    startColor: '#f12711',
    endColor: '#f5af19',
    direction: 'to-r',
  },
  {
    name: 'Ice',
    startColor: '#a8edea',
    endColor: '#fed6e3',
    direction: 'to-bl',
  },
  {
    name: 'Mint',
    startColor: '#d299c2',
    endColor: '#fef9d7',
    direction: 'to-t',
  },
  {
    name: 'Cherry',
    startColor: '#eb3349',
    endColor: '#f45c43',
    direction: 'to-br',
  },
  {
    name: 'Lavender',
    startColor: '#a8caba',
    endColor: '#5d4e75',
    direction: 'to-r',
  },
  {
    name: 'Gold Rush',
    startColor: '#ffd89b',
    endColor: '#19547b',
    direction: 'to-bl',
  },
];
export const products: Array<{
  title: string;
  href: string;
  description: string;
  icon: JSX.Element | any;
}> = [
  {
    title: 'AI Tweet Generator',
    href: URLS.publicTweetGeneration,
    icon: <AIIconOutlined />,
    description:
      'Generate engaging tweets using either website or browser extension.',
  },
  {
    title: 'AI Hashtag Generator',
    href: URLS.publicHashtagGeneration,
    icon: <HashTagIcon />,
    description: 'Generate relevant hashtags to get more Twitter engagement.',
  },
  {
    title: 'AI Twitter Handle Generator',
    href: URLS.publicHandleGeneration,
    icon: <TwitterHandleIcon />,
    description: 'Generate relevant Twitter handles based on a description.',
  },
  {
    title: 'AI Twitter Bio Generator',
    href: URLS.publicBioGeneration,
    icon: <ProfileIcon />,
    description: 'AI tool to generate captivating Twitter bios effortlessly.',
  },
  {
    title: 'Advanced Tweet Search',
    href: URLS.publicTweetSearch,
    icon: <SearchIcon />,
    description: 'Find exact Twitter posts with an intuitive search interface.',
  },
  {
    title: 'Mass Tweet Deletions',
    href: URLS.massTweetDeletes,
    icon: <DeleteIcon />,
    description: 'Bulk delete tweets and clean up your profile effortlessly.',
  },
  {
    title: 'Mass Tweet Unlikes',
    href: URLS.deleteTwitterLikes,
    icon: <UnlikeIcon />,
    description: 'Unlike multiple tweets at once using advanced filters.',
  },
  {
    title: 'Mass Twitter Follows',
    href: URLS.massTwitterFollows,
    icon: <FollowIcon />,
    description: 'Follow multiple Twitter accounts that match your criteria.',
  },
  {
    title: 'Mass Retweets',
    href: URLS.massRetweets,
    icon: <RetweetIcon />,
    description: 'Bulk retweet posts that match your specified filters.',
  },
  {
    title: 'Mass Tweet Likes',
    href: URLS.twitterAutoLiker,
    icon: <LikeIcon />,
    description: 'Like multiple tweets at once based on set criteria.',
  },
  {
    title: 'Mass Twitter Unfollows',
    href: URLS.massTwitterUnfollows,
    icon: <UnfollowIcon />,
    description: 'Unfollow Twitter profiles in bulk based on your filters.',
  },
  {
    title: 'X Video Downloader',
    href: URLS.videoDownloader,
    icon: <VideoIcon />,
    description: 'Download videos from X (Twitter) effortlessly with our tool.',
  },
  {
    title: 'X Post Screenshot',
    href: URLS.screenShot,
    icon: <ScreenshotIcon height='1.5em' width='1.5em' />,
    description:
      'Download screenshots from X (Twitter) effortlessly with our tool.',
  },
];

export const POSITIVE_INTEGER_REGEX = /^([0-9]*)$/;

export const SUBSCRIPTION_STATUS = {
  Incomplete: 'incomplete',
  IncompleteExpired: 'incomplete_expired',
  Active: 'active',
  PastDue: 'past_due',
  Canceled: 'canceled',
} as const;

export const PaddingOptionsPostEditor = [16, 32, 64, 128];
export const FontOptionsPostEditor = [
  'Inter',
  'Poppins',
  'DM Sans',
  'Work Sans',
];

export const TwitterUrlFieldToggles = {
  withArticleRichContentState: true,
  withArticlePlainText: false,
  withGrokAnalyze: false,
  withDisallowedReplyControls: false,
};

export const FaqsHomePage = [
  {
    question: 'What is Tweetstorm.ai?',
    answer:
      'Tweetstorm.ai is an AI-powered tool that helps you generate tweets, hashtags, twitter bios, and twitter handles. Our platform uses large language models (LLMs) to create high-quality content based on your prompts, enhancing your social media presence.',
  },
  {
    question: 'How does Tweetstorm.ai work?',
    answer:
      'Tweetstorm.ai leverages the power of large language models to understand user inputs and generate relevant, coherent tweets. Users can provide a specific topic or query, and our AI model will create tweet-like responses based on the input. Simply choose the type of content you want to generate (tweet, hashtag, bio, or handles), enter your prompt and let the AI produce tailored outputs.',
  },
  {
    question: 'What are the tweet length options available?',
    answer:
      'Tweetstorm.ai offers three tweet length options: short tweets (up to 280 characters), medium tweets (around 1000 characters), and long tweets (around 2500 characters). Medium and long tweet options are available only to paid plan users and are especially useful for premium twitter.',
  },
  {
    question:
      'What features are available in the tweetstorm.ai browser extension?',
    answer:
      "The tweetstorm.ai browser extension allows you to generate tweets and replies directly on Twitter's website. You can create tweets of different lengths and generate replies with various tones (agree, disagree, or question, etc.).",
  },
  {
    question: 'When will I be charged for a paid plan?',
    answer:
      'You will be charged immediately upon subscribing to a paid plan and subsequently at the beginning of each month.',
  },
  {
    question: 'What are the costs of generations?',
    answer:
      'Per generation costs are as follows:\nShort Tweet: 1 credit, Medium Tweet: 3 credits, Long Tweet: 5 credits\nHashtags: 1 credit\nTwitter Bio: 1 credit\nTwitter Handles: 1 credit',
  },
  {
    question: "I'm not happy with the tweet generation, what should I do?",
    answer:
      'Avoid using single words. Try to be as specific as possible - the more specific your query, is the better generation you will get.',
  },
  {
    question: 'Who is TweetStorm for?',
    answer:
      "Tweetstorm.ai is designed for individuals, brands, and businesses aiming to build a strong Twitter presence and achieve various goals, such as increasing sales or gaining followers. Whether you're starting a Twitter account from scratch or looking to grow an established account with thousands of followers, tweetstorm.ai provides the tools you need to create engaging and relevant content. Our platform caters to all audience sizes, making it perfect for both beginners and seasoned Twitter users.",
  },
  {
    question:
      'How accurate and reliable are the tweets generated by TweetStorm?',
    answer:
      'Tweetstorm.ai aims to produce accurate and reliable tweets by leveraging advanced AI models. However, as with any AI-generated content, the tweets are based on patterns and information the model has learned. While we strive to ensure high-quality outputs, some tweets may benefit from human review and verification.',
  },
  {
    question: 'Can TweetStorm be used for commercial purposes?',
    answer:
      "Yes, tweetstorm.ai can be used for commercial purposes, including content creation, social media marketing, and brand promotion. However, it's crucial to comply with the terms and conditions of Twitter and any other relevant platforms where the tweets will be published, as well as adhering to applicable laws and regulations.",
  },
];

export const FaqsTweetGenerator = [
  {
    question: 'What are the costs of generations?',
    answer:
      'Per generation costs are as follows:\nShort Tweet: 1 credit\nMedium Tweet: 3 credits\n Long Tweet: 5 credits',
  },
  {
    question: 'Not happy with the tweet generation. What to do?',
    answer:
      'Avoid using single words when providing a prompt for generating a tweet. Try to be as specific as possible—the more specific your query is, the better the output of the tweet generator.',
  },
  {
    question: 'How does the AI Tweet Generator work?',
    answer:
      'Our AI tweet generator leverages the power of large language models to understand user inputs and generate relevant, coherent tweets. Simply input your prompt, and our AI analyzes it to generate creative and engaging tweets.',
  },
  {
    question: 'Browser extension or website for post generation?',
    answer:
      'You can use either the browser extension or our website, as both allow you to create AI tweets. However, the extension also offers tweet reply generation that is not possible through the website.',
  },
  {
    question: 'On which browsers is the extension available?',
    answer:
      'The extension is available for Chrome and Firefox. Since the Chrome Web Store is available in Microsoft Edge, Opera, and Brave browsers also, you can use the extension in these browsers as well. In short, the extension is available for all major browsers.',
  },
  {
    question: 'What are the tweet length options available?',
    answer:
      'Tweetstorm.ai offers three tweet length options: short tweets (up to 280 characters), medium tweets (around 1000 characters), and long tweets (around 2500 characters). Medium and long tweet options are available only to paid plan users and are especially useful for premium twitter.',
  },
];
// Initialize the fonts properly
export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const canvasSizes = [
  { label: 'Auto', width: 'auto', height: 'auto', aspectRatio: null },

  { label: 'YouTube Thumbnail', width: 1280, height: 720, aspectRatio: '16:9' },

  { label: 'Tweet', width: 600, height: 335, aspectRatio: '1.79:1' },

  { label: 'Insta Post', width: 1080, height: 1080, aspectRatio: '1:1' },

  { label: 'Insta Story', width: 1080, height: 1920, aspectRatio: '9:16' },

  { label: 'Dribbble', width: 1600, height: 1200, aspectRatio: '4:3' },

  {
    label: 'App Store (6.5 inch)',
    width: 1242,
    height: 2688,
    aspectRatio: '9:19.5',
  },

  {
    label: 'App Store (5.8 inch)',
    width: 1125,
    height: 2436,
    aspectRatio: '9:19.5',
  },

  {
    label: 'App Store (5.5 inch)',
    width: 1242,
    height: 2208,
    aspectRatio: '9:16',
  },

  {
    label: 'App Store (4.7 inch)',
    width: 750,
    height: 1334,
    aspectRatio: '9:16',
  },

  { label: 'Product Hunt', width: 2400, height: 1260, aspectRatio: '1.9:1' },

  { label: 'Pinterest Pin', width: 1000, height: 1500, aspectRatio: '2:3' },

  { label: 'LinkedIn Post', width: 1200, height: 627, aspectRatio: '1.91:1' },

  {
    label: 'Chrome Extension Store Image',
    width: 1400,
    height: 560,
    aspectRatio: '2.5:1',
  },

  { label: 'Open Graph', width: 1200, height: 630, aspectRatio: '1.91:1' },

  { label: 'Square (1:1)', width: 1080, height: 1080, aspectRatio: '1:1' },

  { label: 'Wide (16:9)', width: 1280, height: 720, aspectRatio: '16:9' },
];

export const defaultColors: Record<
  string,
  {
    tweetBg: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  }
> = {
  light: {
    tweetBg: '#FFFFFF',
    primaryColor: '#000000',
    secondaryColor: '#6B7280',
    backgroundColor: '#FFFFFF',
  },
  dark: {
    tweetBg: '#000000',
    primaryColor: '#FFFFFF',
    secondaryColor: '#D1D5DB',
    backgroundColor: '#000000',
  },
};
