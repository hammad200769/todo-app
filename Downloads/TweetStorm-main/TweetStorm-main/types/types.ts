export type VoidFunction = () => void;

export type BoolString = 'true' | 'false';

export type UserGenerationTypeToNumberMap = Record<
  UserGenerationTypes,
  0 | 1 | 2 | 3 | 4
>;

export type UserGenerationTypes =
  | 'Tweet'
  | 'Hashtags'
  | 'Bio'
  | 'Handle'
  | 'ReplyTweet';

export enum REPLY_FILTER_TYPE {
  With = 'with',
  Only = 'only',
  None = 'none',
}

export type MENU_ITEMS = {
  [key: string]: {
    href: string;
    icon: React.ReactNode;
    text: string;
    hiddenOnLarge?: boolean;
  }[];
};

export type RepliesFilterTypeToNumberMap = Record<REPLY_FILTER_TYPE, 0 | 1 | 2>;

export enum SUBSCRIPTION_NAME {
  Pro = 'pro',
  Agency = 'agency',
}

export enum PLANS {
  Free = 'Free',
  Pro = 'Pro',
  Agency = 'Agency',
}

export type FormFeedback = {
  type: 'error' | 'success';
  message: string;
};

export enum ERROR_TYPE {
  ValidationError = 'validation-error',
  ServerError = 'server-error',
  NotEnoughCreditsError = 'not-enough-credits',
  UserNotFound = 'user-not-found',
  EmailNotVerified = 'email-not-verified',
  NoActiveSubscription = 'no-active-subscription',
  DisallowedSubscriptionUpdate = 'disallowed-subscription-update',
  NoStripeCustomer = 'no-stripe-customer',
  PresetLimitExceeded = 'preset-limit-exceeded',
}

export enum STANDARD_TWEET_LENGTH {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

export enum BIO_GENERATION_TYPE {
  Person = 'Person',
  Business = 'Business',
  Influencer = 'Influencer',
  Brand = 'Brand',
}

export enum TWEET_GENERATION_TONE {
  'No-Tone' = 'No-Tone',
  PositiveAndQuestion = 'Positive-and-Question',
  Question = 'Question',
  Funny = 'Funny',
  Sad = 'Sad',
  Angry = 'Angry',
  PositiveSarcasm = 'Positive-Sarcasm',
  Sarcastic = 'Sarcastic',
  Excited = 'Excited',
  Empathetic = 'Empathetic',
  Controversial = 'Controversial',
  Informative = 'Informative',
  Serious = 'Serious',
  Professional = 'Professional',
  Casual = 'Casual',
  Curious = 'Curious',
  Happy = 'Happy',
  Playful = 'Playful',
}
//TODO: Update the reply tone when the extension gets updated
// export enum REPLY_TWEET_TONE {
//   'No-Tone' = 'No-Tone',
//   Agree = 'Agree',
//   Disagree = 'Disagree',
//   Neutral = 'Neutral',
//   Questioning = 'Questioning',
//   PositiveAndQuestion = 'Positive-and-Question',
//   Critical = 'Critical',
//   Informative = 'Informative',
//   Professional = 'Professional',
//   Casual = 'Casual',
//   Thankful = 'Thankful',
//   Serious = 'Serious',
//   Empathetic = 'Empathetic',
//   Enthusiastic = 'Enthusiastic',
//   Playful = 'Playful',
//   Humorous = 'Humorous',
//   Sarcastic = 'Sarcastic',
//   'Positive Sarcasm' = 'Positive-Sarcasm',
//   Angry = 'Angry',
// }

export enum REPLY_TWEET_TONE {
  Positive = 'Positive',
  Negative = 'Negative',
  PositiveAndQuestion = 'Positive-and-Question',
  Question = 'Question',
  Short = 'Short',
  Emoji = 'Emoji',
  Helpful = 'Helpful',
  Care = 'Care',
  Praise = 'Praise',
  Love = 'Love',
  Haha = 'Haha',
  Sad = 'Sad',
  Angry = 'Angry',
  'Positive-Sarcasm' = 'Positive-Sarcasm',
  'Thank-you' = 'Thank-you',
  Disagree = 'Disagree',
}

export enum BIO_GENERATION_TONE {
  'No-Tone' = 'No-Tone',
  PositiveAndQuestion = 'Positive-and-Question',
  Question = 'Question',
  Funny = 'Funny',
  Sad = 'Sad',
  Angry = 'Angry',
  PositiveSarcasm = 'Positive-Sarcasm',
  Sarcastic = 'Sarcastic',
  Controversial = 'Controversial',
  Serious = 'Serious',
  Professional = 'Professional',
  Casual = 'Casual',
  Happy = 'Happy',
  Playful = 'Playful',
  Geeky = 'Geeky',
  Inspirational = 'Inspirational',
}

export type TweetSearchType = {
  all_these_words: string;
  exact_match_phrase: string;
  any_these_words: string;
  excluded_words: string;
  hashtags: string;
  language: string;
  location: string;
  distance: string;
  min_replies: string;
  min_likes: string;
  min_reposts: string;
  from_accounts: string;
  to_accounts: string;
  mention_accounts: string;
  replies_filter: string;
  links_filter: string;
  from_followed_people: BoolString;
  from_nearby: BoolString;
  start_date: string;
  end_date: string;
};

export type ApiValidationErrors = Array<{ fieldKey: string; message: string }>;

export enum GPT_MODEL {
  'GPT_4.1_mini' = 'gpt-4.1-mini',
  GPT_4o_mini = 'gpt-4o-mini',
  GPT_4 = 'gpt-4',
}

export type PricingFeatures = {
  [key in 'free' | SUBSCRIPTION_NAME.Pro | SUBSCRIPTION_NAME.Agency]: Array<{
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
    hidden?: boolean;
  }>;
};

export type Products = Array<Product>;

export type Product = {
  title: string;
  href: string;
  description: string;
  icon: JSX.Element | any;
};

export type PricingFeatureRow = {
  name: string | JSX.Element;
  category?: string;
  info?: boolean;
  helpingText?: string[];
  availability?: Record<SUBSCRIPTION_NAME, boolean>;
  desc?: Record<SUBSCRIPTION_NAME, string | JSX.Element>;
};

export type PricingTableFeatureRow = {
  name: string | JSX.Element;
  category?: string;
  info?: boolean;
  helpingText?: string[];
  availability?: Record<PLANS, boolean>;
  desc?: Record<PLANS, string | JSX.Element>;
};

// ************************* Types for swr api response date *******************************
export type Subscription = {
  id: string;
  name: SUBSCRIPTION_NAME;
  status: string;
  amount: string;
  endsAt: string;
  currentPeriodEnd: string;
  currentPeriodStart: string;
  error?: string;
};

export type Credits = {
  count: number;
};

export type ApiKey = {
  apiKey: string;
};

export type NextPayment = {
  date: number;
  amount: string;
};

export type User = {
  id: string;
  name?: string;
  email: string;
  signedInWithEmail?: boolean;
  email_verified_at?: string | Date;
};

export type PaymentMethod = {
  pm_type: string;
  pm_last_four: string;
  pm_expiration: string;
};

export type UserGeneration = {
  id: string;
  promptedText: string;
  text: string;
  tone: string;
  createdAt: string;
  type: number;
  keywords: string[];
};

export type Invoice = {
  id: string;
  createdAt: string;
  amount: string;
  status: string;
  amountDue: string;
  amountPaid: string;
  url: string;
};

export type InvoiceStatus = 'paid' | 'unpaid';

export type UserTweetSearch = {
  id: number;
  name: string;
  created_at: string;
  all_these_words: string | null;
  exact_match_phrase: string | null;
  any_these_words: string | null;
  excluded_words: string | null;
  hashtags: string | null;
  language: string | null;
  location: string | null;
  distance: number | null;
  min_replies: number | null;
  min_likes: number | null;
  min_reposts: number | null;
  from_accounts: string | null;
  to_accounts: string | null;
  mention_accounts: string | null;
  replies_filter: number;
  links_filter: number;
  from_followed_people: boolean;
  from_nearby: boolean;
  start_date: string | null;
  end_date: string | null;
};

export enum THEME {
  Light = 'light',
  Dark = 'dark',
}

export type BulkUsage = {
  tweetDeletions: null | number;
  retweets: null | number;
  tweetLikes: null | number;
  tweetUnlikes: null | number;
  follows: null | number;
  unfollows: null | number;
};

export type BulkUsageResponseType = {
  bulkUsage?: BulkUsage;
  bulkUsageAssigned?: BulkUsage;
};

// ************************* Types for swr api response date *******************************

export type IconSizeProps = {
  width?: string;
  height?: string;
};

export type InterceptedResponse = {
  url: string;
  status: number;
  headers: any;
  body: any;
};

export type VideoResponse = {
  videoUrls: VideoUrls[];
  handle: string;
  date: string;
  userName: string;
  description: string;
};

export type VideoUrls = {
  url: string;
  bitrate: number;
  content_type: string;
  resolution?: string; // Added resolution as optional field
};

export interface TwitterSession {
  id?: number;
  headers: Record<string, string>;
  cookies: any[];
  created_at: Date;
  is_valid: boolean;
  last_used: Date;
  url: string;
  query_params?: string; // Added queryParams to store URL query parameters
}

export interface TwitterScreenShotApiResponse {
  tweetData: TweetScreenShotData;
}

export interface TweetScreenShotData {
  userImage: string;
  userName: string;
  description: string;
  replyCount: number;
  retweetCount: number;
  videoUrls: TweetScreenShotVideourls[];
  handle: string;
  isVerified: boolean;
  favouriteCount: number;
  image: string[];
  viewCount: string;
  date: string;
  bookmarkCount: number;
  url: string;
}
export interface TweetScreenShotVideourls {
  bitrate: number;
  content_type: string;
  url: string;
}
export type TweetPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type WatermarkPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type TweetPreset = {
  id: number;
  user_id: number;
  preset_name: string;
  options: {
    tilt: {
      x: number;
      y: number;
    };
    scale: number;
    linkColor: string;
    shadow: number;
    canvasBg: string;
    fontSize: number;
    paddingX: number;
    paddingY: number;
    screenShotQuality: string;
    showDate: boolean;
    showLike: boolean;
    showTime: boolean;
    fontStyle: string;
    logoStyle: string;
    showMedia: boolean;
    tweetWidth: number;
    canvasWidth: string | number;
    roundedness: number;
    showRetweet: boolean;
    canvasHeight: string | number;
    primaryColor: string;
    showComments: boolean;
    gradientColor: string;
    showViewCount: boolean;
    showWatermark: boolean;
    tweetPosition: TweetPosition;
    watermarkText: string;
    secondaryColor: string;
    watermarkColor: string;
    canvasAspectRatio: string;
    gradientDirection: string;
    showVerifiedBadge: boolean;
    watermarkPosition: WatermarkPosition;
    tweetBackgroundColor: string;
  };

  created_at: string;
  updated_at: string;
};
