import { STANDARD_TWEET_LENGTH, SUBSCRIPTION_NAME } from '@/types/types';
import {
  BIO_TONES,
  BIO_TYPES,
  LINKS_FILTER_TYPE_TO_NUMBER_MAP,
  REPLIES_FILTER_TYPE_TO_NUMBER_MAP,
  TWEET_TONES,
} from '@/utils/constants';
import Joi from 'joi';

// TODO: adding a type disables editor property access hints.

export const validationSchemas = {
  signup: Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
  publicGeneration: Joi.object({
    promptedText: Joi.string().required().max(4000),
  }),
  publicBioGeneration: Joi.object({
    userInput: Joi.object({
      promptedText: Joi.string().required().max(4000),
      includeEmojis: Joi.boolean(),
      tone: Joi.string().valid(...BIO_TONES),
      keywords: Joi.array()
        .items(Joi.string())
        .optional()
        .custom((value, helpers) => {
          const totalLength = value.reduce(
            (sum: number, str: string) => sum + str.length,
            0
          );
          if (totalLength > 200) {
            return helpers.message({
              custom: 'Total character length of keywords must not exceed 200',
            });
          }
          return value;
        }),
      type: Joi.string()
        .valid(...BIO_TYPES)
        .allow(''),
    }),
  }),

  screenShotPreset: Joi.object({
    presetName: Joi.string().allow('').optional(),
    options: Joi.object({
      canvasBg: Joi.string().allow('').optional(),
      gradientColor: Joi.string().allow('').optional(),
      fontStyle: Joi.string().allow('').optional(),
      logoStyle: Joi.string().allow('').optional(),
      fontSize: Joi.number().optional(),
      canvasHeight: Joi.string().optional(),
      canvasWidth: Joi.string().optional(),
      tweetWidth: Joi.number().optional(),
      scale: Joi.number().optional(),
      tweetPosition: Joi.string().optional(),
      tilt: Joi.object({
        x: Joi.number().optional(),
        y: Joi.number().optional(),
      }).optional(),
      canvasAspectRatio: Joi.string().allow('').optional(),
      showRetweet: Joi.boolean().optional(),
      showLike: Joi.boolean().optional(),
      showComments: Joi.boolean().optional(),
      showMedia: Joi.boolean().optional(),
      showWatermark: Joi.boolean().optional(),
      watermarkText: Joi.string().allow('').optional(),
      watermarkPosition: Joi.string().allow('').optional(),
      watermarkColor: Joi.string().allow('').optional(),
      showDate: Joi.boolean().optional(),
      showTime: Joi.boolean().optional(),
      showViewCount: Joi.boolean().optional(),
      showVerifiedBadge: Joi.boolean().optional(),
      paddingX: Joi.number().optional(),
      paddingY: Joi.number().optional(),
      shadow: Joi.number().optional(),
      roundedness: Joi.number().optional(),
      gradientDirection: Joi.string().allow('').optional(),
      tweetBackgroundColor: Joi.string().allow('').optional(),
      secondaryColor: Joi.string().allow('').optional(),
      primaryColor: Joi.string().allow('').optional(),
      linkColor: Joi.string().allow('').optional(),
      screenShotQuality: Joi.string().valid('1', '2').optional().default('1'),
    }).optional(),
  }),

  publicTweetGeneration: Joi.object({
    userInput: Joi.object({
      promptedText: Joi.string().required().max(4000),
      includeEmojis: Joi.boolean(),
      includeHashtags: Joi.boolean(),
      tone: Joi.string().valid(...TWEET_TONES),
      keywords: Joi.array()
        .items(Joi.string())
        .optional()
        .custom((value, helpers) => {
          const totalLength = value.reduce(
            (sum: number, str: string) => sum + str.length,
            0
          );
          if (totalLength > 200) {
            return helpers.message({
              custom: 'Total character length of keywords must not exceed 200',
            });
          }
          return value;
        }),
    }),
  }),
  tweetGeneration: Joi.object({
    userInput: Joi.object({
      promptedText: Joi.string()
        .required()
        .messages({
          'string.required': 'No prompt is given.',
          'string.empty': 'Prompt text cannot be empty.',
        })
        .max(4000),
      includeEmojis: Joi.boolean(),
      includeHashtags: Joi.boolean(),
      tone: Joi.string().valid(...TWEET_TONES),
      keywords: Joi.array()
        .items(Joi.string())
        .optional()
        .custom((value, helpers) => {
          const totalLength = value.reduce(
            (sum: number, str: string) => sum + str.length,
            0
          );
          if (totalLength > 200) {
            return helpers.message({
              custom: 'Total character length of keywords must not exceed 200',
            });
          }
          return value;
        }),
    }),
    tweetLength: Joi.string()
      .required()
      .valid(
        STANDARD_TWEET_LENGTH.Short,
        STANDARD_TWEET_LENGTH.Medium,
        STANDARD_TWEET_LENGTH.Long
      ),
  }),
  tweetGenerationExtension: Joi.object({
    promptedText: Joi.string()
      .required()
      .max(4000)
      .messages({ 'any.required': 'No prompt is given.' }),
    apiKey: Joi.string().required().messages({
      'any.required': 'API Key is required.',
      'string.empty': 'API Key is required.',
    }),
    tweetSentiment: Joi.string()
      // .valid(...TWEET_TONES)
      .optional(),
    includeEmojis: Joi.boolean().optional(),
    includeHashtags: Joi.boolean().optional(),
    keywords: Joi.string().max(200).optional().allow('').max(200),
    tweetLength: Joi.string()
      .required()
      .valid(
        STANDARD_TWEET_LENGTH.Short,
        STANDARD_TWEET_LENGTH.Medium,
        STANDARD_TWEET_LENGTH.Long
      )
      .messages({
        'any.required': 'Tweet Length is required.',
        'string.empty': 'Tweet Length is required.',
      }),
  }),
  tweetReplyGenerationExtension: Joi.object({
    promptedText: Joi.string()
      .required()
      .messages({ 'any.required': 'No prompt is given.' })
      .max(4000),
    apiKey: Joi.string().required().messages({
      'any.required': 'API Key is required.',
      'string.empty': 'API Key is required.',
    }),
    tweetLength: Joi.string()
      .required()
      .valid(
        STANDARD_TWEET_LENGTH.Short,
        STANDARD_TWEET_LENGTH.Medium,
        STANDARD_TWEET_LENGTH.Long
      )
      .messages({
        'any.required': 'Tweet Length is required.',
        'string.empty': 'Tweet Length is required.',
      }),
    tweetSentiment: Joi.string()
      .required()
      // .valid(...REPLY_TONE)
      .messages({
        'any.required': 'Tweet Sentiment is required.',
        'string.empty': 'Tweet Sentiment is required.',
      }),
    includeEmojis: Joi.boolean().optional(),
    includeHashtags: Joi.boolean().optional(),
    keywords: Joi.string().max(200).optional().allow('').max(200),
  }),
  creditsExtension: Joi.object({
    apiKey: Joi.string().required().messages({
      'any.required': 'API Key is required.',
      'string.empty': 'API Key is required.',
    }),
  }),
  findApiKeyExtension: Joi.object({
    apiKey: Joi.string().required().messages({
      'any.required': 'API Key is required.',
      'string.empty': 'API Key is required.',
    }),
  }),
  openaiGeneration: Joi.object({
    promptedText: Joi.string().required().max(4000),
  }),
  bioGenerator: Joi.object({
    userInput: Joi.object({
      promptedText: Joi.string().required().max(4000),
      includeEmojis: Joi.boolean(),
      tone: Joi.string().valid(...BIO_TONES),
      keywords: Joi.array()
        .items(Joi.string())
        .optional()
        .custom((value, helpers) => {
          const totalLength = value.reduce(
            (sum: number, str: string) => sum + str.length,
            0
          );
          if (totalLength > 200) {
            return helpers.message({
              custom: 'Total character length of keywords must not exceed 200',
            });
          }
          return value;
        }),
      type: Joi.string().valid(...BIO_TYPES),
    }),
  }),
  createCheckoutSession: Joi.object({
    subscriptionName: Joi.string()
      .required()
      .equal(SUBSCRIPTION_NAME.Agency, SUBSCRIPTION_NAME.Pro),
  }),
  updateSubscription: Joi.object({
    subscriptionName: Joi.string()
      .required()
      .equal(SUBSCRIPTION_NAME.Agency, SUBSCRIPTION_NAME.Pro),
  }),
  updateUserProfile: Joi.object({
    name: Joi.string().required(),
  }),
  updatePassword: Joi.object({
    oldPassword: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8),
    confirmedNewPassword: Joi.string()
      .required()
      .min(8)
      .equal(Joi.ref('newPassword'))
      .messages({
        'any.only': 'Confirmed password must match the password.',
      }),
  }),
  deleteAccount: Joi.object({
    verificationCode: Joi.number().required().min(100000).max(999999),
  }).options({ convert: false }),
  deleteUser: Joi.object({
    password: Joi.string().required().min(8),
  }),
  verifyEmail: Joi.object({
    token: Joi.string().required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  }),
  customerMessage: Joi.object({
    subject: Joi.string().required().max(500),
    message: Joi.string().required().max(2500),
  }),
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(8),
    confirmedPassword: Joi.string()
      .required()
      .min(8)
      .equal(Joi.ref('password'))
      .messages({
        'any.only': 'Confirmed password must match the password.',
      }),
  }),
  tweetSearch: Joi.object({
    data: Joi.object({
      all_these_words: Joi.string().optional().max(1000),
      any_these_words: Joi.string().optional().max(2000),
      hashtags: Joi.string().optional().max(1000),
      location: Joi.string().optional().max(500),
      language: Joi.string().optional().max(255),
      start_date: Joi.string().isoDate().optional(),
      end_date: Joi.string().isoDate().optional(),
      min_replies: Joi.number().integer().min(0).optional(),
      min_likes: Joi.number().integer().min(0).optional(),
      min_reposts: Joi.number().integer().min(0).optional(),
      distance: Joi.number().integer().min(0).optional(),
      exact_match_phrase: Joi.string().optional().max(500),
      excluded_words: Joi.string().optional().max(1000),
      mention_accounts: Joi.string().optional().max(500),
      to_accounts: Joi.string().optional().max(500),
      from_accounts: Joi.string().optional().max(500),
      replies_filter: Joi.number()
        .optional()
        .equal(
          REPLIES_FILTER_TYPE_TO_NUMBER_MAP.with,
          REPLIES_FILTER_TYPE_TO_NUMBER_MAP.only,
          REPLIES_FILTER_TYPE_TO_NUMBER_MAP.none
        ),
      links_filter: Joi.number()
        .optional()
        .equal(
          LINKS_FILTER_TYPE_TO_NUMBER_MAP.with,
          LINKS_FILTER_TYPE_TO_NUMBER_MAP.only,
          LINKS_FILTER_TYPE_TO_NUMBER_MAP.none
        ),
      from_followed_people: Joi.boolean().optional(),
      from_nearby: Joi.boolean().optional(),
    })
      .required()
      .options({ convert: false }),
    name: Joi.string().required().max(255).label('searchName'),
  }),
  updateBulkActionsUsage: Joi.object({
    tweetDeletions: Joi.number().integer().min(0).optional(),
    tweetUnlikes: Joi.number().integer().min(0).optional(),
    tweetLikes: Joi.number().integer().min(0).optional(),
    retweets: Joi.number().integer().min(0).optional(),
    follows: Joi.number().integer().min(0).optional(),
    unfollows: Joi.number().integer().min(0).optional(),
  })
    .min(1)
    .messages({
      'object.min': 'At least one credit type must be provided',
    }),
};
