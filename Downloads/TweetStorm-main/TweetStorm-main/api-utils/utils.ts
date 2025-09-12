import db from '@/DB/db';
import {
  BIO_GENERATION_TONE,
  BIO_GENERATION_TYPE,
  ERROR_TYPE,
  GPT_MODEL,
  STANDARD_TWEET_LENGTH,
  SUBSCRIPTION_NAME,
  TWEET_GENERATION_TONE,
  TwitterSession,
} from '@/types/types';
import {
  STANDARD_TWEET_LENGTHS_IN_NUMBER,
  TOTAL_HANDLES_PER_GENERATION,
  TOTAL_HASHTAGS_PER_GENERATION,
} from '@/utils/constants';
import { camelCasetoLowerCase, generateRandomString } from '@/utils/utils';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import MailerLite from '@mailerlite/mailerlite-nodejs';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';
import puppeteer, { Browser, Page } from 'puppeteer';
import Stripe from 'stripe';
import {
  AWS_ACCESS_KEY,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  SERVER_ERROR_MESSAGE,
} from './constants';

import { handleServerError } from '@/middlewares';
import { validationErrors } from './validation-errors';

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

export const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_TOKEN!,
});

const sesClient = new SESClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export function getMailTransport() {
  return nodemailer.createTransport({
    SES: {
      ses: sesClient,
      aws: { SendRawEmailCommand: SendRawEmailCommand },
    },
  });
}

export function getPriceId(
  subscriptionName: SUBSCRIPTION_NAME
): string | undefined {
  if (subscriptionName === SUBSCRIPTION_NAME.Pro)
    return process.env.SPARK_STANDARD_MONTHLY_PLAN;
  if (subscriptionName === SUBSCRIPTION_NAME.Agency)
    return process.env.SPARK_AGENCY_MONTHLY_PLAN;
}

export function getSubscriptionName(priceId: string): SUBSCRIPTION_NAME {
  if (priceId === process.env.SPARK_STANDARD_MONTHLY_PLAN)
    return SUBSCRIPTION_NAME.Pro;
  if (priceId === process.env.SPARK_AGENCY_MONTHLY_PLAN)
    return SUBSCRIPTION_NAME.Agency;
  throw new Error(`The provided price "${priceId}" does not exist.`);
}

export function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET!);
}

export function logError(err: any) {
  console.error(`Error Occured at: ${new Date()}\n${err}`);
}
export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function serverErrorResponse(message?: string): Response {
  return Response.json(
    {
      error: {
        type: ERROR_TYPE.ServerError,
        message: message ?? SERVER_ERROR_MESSAGE,
      },
    },
    {
      status: 500,
    }
  );
}

export function validationErrorResponse__New(
  error: Joi.ValidationError
): Response {
  const errorData = error.details.map(detail => {
    const fieldKey =
      detail.context?.key ?? detail.path[detail.path.length - 1].toString();

    const fieldLabels = detail.context?.label?.split('.');
    const fieldLabel = fieldLabels
      ? camelCasetoLowerCase(fieldLabels[fieldLabels.length - 1])
      : fieldKey;

    if (validationErrors.hasOwnProperty(detail.type)) {
      return {
        message: validationErrors[detail.type]({
          fieldKey,
          fieldLabel,
        }),
        fieldKey,
      };
    }

    return {
      message: detail.message,
      fieldKey,
    };
  });

  return Response.json(
    {
      error: {
        type: ERROR_TYPE.ValidationError,
        data: errorData,
      },
    },
    { status: 400 }
  );
}

// TODO: remove this and use the new one
export function validationErrorResponse(error: Joi.ValidationError): Response {
  return Response.json(
    { error: { type: ERROR_TYPE.ValidationError, message: error.message } },
    { status: 400 }
  );
}

export function notEnoughCreditsResponse(message: string): Response {
  return Response.json(
    {
      error: { type: ERROR_TYPE.NotEnoughCreditsError, message },
    },
    { status: 403 }
  );
}

export function userNotFoundResponse(message: string): Response {
  return Response.json(
    {
      error: { type: ERROR_TYPE.UserNotFound, message },
    },
    { status: 404 }
  );
}

export function jsonErrorResponse(
  errorType: ERROR_TYPE | string,
  message: string,
  status: number
): Response {
  return Response.json(
    {
      error: {
        type: errorType,
        message,
      },
    },
    {
      status,
    }
  );
}

export function jsonErrorResponse__New(
  status: number,
  message: string,
  errorType?: ERROR_TYPE | string
): Response {
  const error: { message: string; type?: ERROR_TYPE | string } = { message };

  if (errorType) error.type = errorType;

  return Response.json(
    {
      error,
    },
    {
      status,
    }
  );
}

export function getProtocol(): string {
  return process.env.PROTOCOL!;
}

export function getDomain(): string {
  return process.env.DOMAIN!;
}

export function getAbsoluteUrl(path: string = ''): string {
  return `${getProtocol()}://${getDomain()}${path}`;
}

export function formatInvoiceAmount(amount: number): string {
  // In our case, currency is always dollar
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export async function getAffiliateId(): Promise<string> {
  let affiliate_id = generateRandomString(5);
  let user = await db('users').where({ affiliate_id }).select('id').first();
  while (user) {
    affiliate_id = generateRandomString(5);
    user = await db('users').where({ affiliate_id }).select('id').first();
  }

  return affiliate_id;
}

export function getMaxTokens(
  promptedTextLength: number,
  chatModel: GPT_MODEL
): number {
  // for gpt-4, max tokens are 8192 (promt + generation)
  if (chatModel === GPT_MODEL.GPT_4) {
    // totalTokens = promptedTextLength / 2 (To be safe we assume that token is of 2 characters, in reality it is about 4 characters)
    return 8192 - Math.floor(promptedTextLength / 2);
  }
  // for gpt-4o-mini, max tokens are 128,000 on the official documentation but to be safe we take 100,000 (promt + generation)
  return 100000 - Math.floor(promptedTextLength / 2);
}

export function getTweetPrompt({
  textPrompt,
  tweetSentiment,
  includeHashtags = false,
  includeEmojis = false,
  keywords = [],
}: {
  textPrompt: string;
  tweetSentiment: TWEET_GENERATION_TONE;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  keywords?: string[];
}): string {
  const lines: string[] = [];
  if (tweetSentiment !== 'No-Tone') {
    lines.push(`tone: ${tweetSentiment}`);
  }
  if (keywords.length > 0) {
    lines.push(`keywords: ${keywords}`);
  }
  lines.push(`include_hashtags: ${includeHashtags}`);
  lines.push(`include_emojis: ${includeEmojis}`);
  return `input: ${textPrompt}
${lines.join('\n')}
`;
}

export function getBioPrompt({
  textPrompt,
  tweetSentiment,
  includeEmojis = false,
  bioType = BIO_GENERATION_TYPE.Person,
  keywords = [],
}: {
  textPrompt: string;
  tweetSentiment: BIO_GENERATION_TONE;
  includeEmojis?: boolean;
  keywords?: string[];
  bioType?: BIO_GENERATION_TYPE;
}): string {
  const lines: string[] = [];
  if (tweetSentiment !== 'No-Tone') {
    lines.push(`tone: ${tweetSentiment}`);
  }
  if (keywords.length > 0) {
    lines.push(`keywords: ${keywords}`);
  }
  lines.push(`bio_type: ${bioType}`);
  lines.push(`include_emojis: ${includeEmojis}`);
  return `description : ${textPrompt}
${lines.join('\n')}
`;
}

export function getSystemPromptForTweetReplyGeneration(
  includeTone: boolean,
  includeKeywords: boolean
): string {
  const inputLines: string[] = [`input: <tweet_placeholder>`];
  const explanationLines: string[] = [
    '"<tweet_placeholder>" will be the actual tweet on which to generate a reply.',
  ];

  if (includeTone) {
    inputLines.push(`tone: <tone_placeholder>`);
    explanationLines.push(
      `"tone" tells what should be the tone of the reply like "Sad", "Professional" and many others.`
    );
  }

  if (includeKeywords) {
    inputLines.push(`keywords: <keywords_placeholder>`);
    explanationLines.push(
      `"keywords" is a comma separated list of keywords that should be included in the reply for a tweet.`
    );
  }

  inputLines.push(`include_hashtags: <boolean_placeholder>`);
  inputLines.push(`include_emojis: <boolean_placeholder>`);
  explanationLines.push(
    `"include_hashtags" is a boolean value that indicates whether to include hashtags in the reply or not. If it's false, then don't include hashtags.`
  );
  explanationLines.push(
    `"include_emojis" is a boolean value that indicates whether to include emojis in the reply or not. If it's false, then don't include emojis.`
  );

  return `I want you to act as a "Human Tweet Reply Writer" who creates authentic, relatable replies to tweets that sound like they're written by a real person.

You will generate a reply for a tweet based on the input given to you. Your response will be in the input language. You will be given input in the following form:
${inputLines.join('\n')}

${explanationLines.join('\n')}

IMPORTANT: Your response should ONLY contain the reply itself and NO EXTRA CONTENT. Do not put the reply in quotes. Only include the content that is asked from you.

Create replies that feel natural and human by:
- Using simple sentence structures that flow naturally
- Varying sentence length (mixing short sentences with occasional longer ones)
- Employing everyday vocabulary most of the time, with more specific or complex words only when they add genuine value
- Including natural transitions between thoughts
- Incorporating personal perspective through "I," "we," or direct address
- Adding authentic touches like rhetorical questions, brief pauses (through punctuation), or genuine reflection

Reply MUST NOT exceed ${STANDARD_TWEET_LENGTHS_IN_NUMBER.short} characters.

Always aim for replies that sound like they were written in one natural moment of expression rather than carefully crafted marketing copy.`;
}

export function getSystemPromptForHashtagsGeneration(): string {
  return `I want you to act as a "Hashtags Generator". You will generate ${TOTAL_HASHTAGS_PER_GENERATION} best possible hashtags on the topic that will be given to you as an input. Your response will be in the input language. You will be given input in the following form:\n\ninput: <topic_placeholder>\n\nThe "<topic_placeholder>" will be the topic on which to generate the hashtags. While generating the hashtags, please ensure to ONLY give me the hashtags and NO EXTRA CONTENT.`;
}

export function getSystemPromptForHandlesGeneration(): string {
  return `I want you to act as a "Twitter Handles Generator". You will generate ${TOTAL_HANDLES_PER_GENERATION} best possible twitter handles based on the description that will be given to you as an input. Your response will be in the input language. You will be given input in the following form:\n\ninput: <description_placeholder>\n\nThe "<description_placeholder>" will be the actual description. While generating the handles, please ensure to ONLY give me the handles and NO EXTRA CONTENT.`;
}

export function getSystemPromptForTweetGeneration(
  tweetLength: STANDARD_TWEET_LENGTH,
  includeTone: boolean,
  includeKeywords: boolean
): string {
  const inputLines: string[] = [`input: <user_input_placeholder>`];
  const explanationLines: string[] = [
    '"<user_input_placeholder>" will be the actual input on which to generate a tweet.',
  ];

  if (includeTone) {
    inputLines.push(`tone: <tone_placeholder>`);
    explanationLines.push(
      `"tone" tells what should be the tone of the tweet like "Sad", "Professional" and many others.`
    );
  }

  if (includeKeywords) {
    inputLines.push(`keywords: <keywords_placeholder>`);
    explanationLines.push(
      `"keywords" is a comma separated list of keywords that should be included in the tweet.`
    );
  }

  inputLines.push(`include_hashtags: <boolean_placeholder>`);
  inputLines.push(`include_emojis: <boolean_placeholder>`);

  explanationLines.push(
    `"include_hashtags" is a boolean value that indicates whether to include hashtags in the tweet or not. If its false then don't include hashtags.`
  );
  explanationLines.push(
    `"include_emojis" is a boolean value that indicates whether to include emojis in the tweet or not. If its false then don't include emojis.`
  );

  const commonPrompt = `I want you to act as a "Human Tweet Writer" who creates authentic, relatable tweets that sound like they're written by a real person.

You will generate a tweet about the input given to you. Your response will be in the input language. You will be given input in the following form:
${inputLines.join('\n')}

${explanationLines.join('\n')}

IMPORTANT: Your response should ONLY contain the tweet itself and NO EXTRA CONTENT. Do not put the tweet in quotes. Only include the content that is asked from you.

Create tweets that feel natural and human by:
- Using simple sentence structures that flow naturally
- Varying sentence length (mixing short sentences with occasional longer ones)
- Employing everyday vocabulary most of the time, with more specific or complex words only when they add genuine value
- Including natural transitions between thoughts
- Incorporating personal perspective through "I," "we," or direct address
- Adding authentic touches like rhetorical questions, brief pauses (through punctuation), or genuine reflection

Always aim for tweets that sound like they were written in one natural moment of expression rather than carefully crafted marketing copy.`;

  const tweetLengthInstructions = {
    [STANDARD_TWEET_LENGTH.Short]: `Your tweet MUST NOT exceed ${STANDARD_TWEET_LENGTHS_IN_NUMBER.short} characters.`,
    [STANDARD_TWEET_LENGTH.Medium]: `Your tweet MUST BE around ${STANDARD_TWEET_LENGTHS_IN_NUMBER.medium} characters. This character count is a CRITICAL requirement. Twitter allows premium users to tweet up to 25000 characters, so there's no issue with writing longer tweets.`,
    [STANDARD_TWEET_LENGTH.Long]: `Your tweet MUST BE around ${STANDARD_TWEET_LENGTHS_IN_NUMBER.long} characters. This character count is a CRITICAL requirement. Twitter allows premium users to tweet up to 25000 characters, so there's no issue with writing longer tweets.`,
  };

  if (!tweetLengthInstructions[tweetLength]) {
    throw new Error('invalid tweet length');
  }

  return `${commonPrompt}\n\n${tweetLengthInstructions[tweetLength]}`;
}

export function getSystemPromptForBioGeneration(
  includeTone: boolean,
  includeKeywords: boolean
): string {
  const inputLines: string[] = [`description: <description_placeholder>`];
  const explanationLines: string[] = [
    '"description" will be the actual description.',
  ];

  if (includeTone) {
    inputLines.push(`tone: <tone_placeholder>`);
    explanationLines.push(
      `"tone" tells what should be the tone of the bio like "Positive", "Professional" and many others.`
    );
  }

  if (includeKeywords) {
    inputLines.push(`keywords: <keywords_placeholder>`);
    explanationLines.push(
      `"keywords" is a comma separated list of keywords that should be included in the bio.`
    );
  }

  inputLines.push(`bio_type: <bio_type_placeholder>`);
  inputLines.push(`include_emojis: <boolean_placeholder>`);

  explanationLines.push(
    `"bio_type" is the type of bio to generate like a "Person", "Business", "Influencer", "Brand".`
  );
  explanationLines.push(
    `"include_emojis" is a boolean value that indicates whether to include emojis in the bio or not. If its false then don't include emojis.`
  );

  return `I want you to act as a "Human Twitter Bio Creator" who creates authentic, relatable, personality-filled bios that sound like they're written by a real person.

Generate a Twitter bio based on the provided description. Your response will be in the language of description. You will be given input in the following form:
${inputLines.join('\n')}

${explanationLines.join('\n')}

IMPORTANT GUIDELINES:

- Your response should ONLY contain the bio itself and NO EXTRA CONTENT. Do not put the bio in quotes.
- Twitter has a 160 character limit - respect this constraint.

Create bios that feel natural and human by:
- Using simple sentence structures that flow naturally
- Varying sentence length (mixing short sentences with occasional longer ones)
- Employing everyday vocabulary most of the time, with more specific or complex words only when they add genuine value
- Including natural transitions between thoughts
- Incorporating personal perspective through "I," "we," or direct address
- Adding authentic touches like rhetorical questions, brief pauses (through punctuation), or genuine reflection

Always remember: the aim is to create a bio that sounds like it was written in one natural moment of expression rather than carefully crafted marketing copy.`;
}

export function formatKeywordsArray(keywords: string[]): string[] {
  return keywords.map((k: string) => k.trim()).filter((k: string) => k !== '');
}

export async function getValidTwitterSession(): Promise<TwitterSession | null> {
  // Clean up expired sessions first
  db('twitter_sessions')
    .where('is_valid', false)
    .del()
    .catch(err =>
      handleServerError({
        err,
        key: 'clean-up-twitter-session',
        subject: 'Error cleaning old Twitter session stored in database',
      })
    );
  // Get the most recent valid session
  const sessions = await db('twitter_sessions')
    .where('is_valid', true)
    .orderBy('last_used', 'desc')
    .limit(1);

  if (sessions.length === 0) {
    return null;
  }

  const session = sessions[0];

  db('twitter_sessions')
    .where('id', session.id)
    .update({ last_used: new Date() })
    .catch(err =>
      handleServerError({
        err,
        key: 'update-twitter-session',
        subject: 'Error updating Twitter session last used time',
      })
    );

  return {
    id: session.id,
    headers: session.headers,
    cookies: session.cookies,
    created_at: session.created_at,
    is_valid: session.is_valid,
    last_used: new Date(),
    url: session.url,
    query_params: session.query_params,
  };
}

export async function saveSession(
  session: Omit<TwitterSession, 'id'>
): Promise<void> {
  try {
    const oldSessions = await db('twitter_sessions')
      .select('id')
      .orderBy('created_at', 'desc')
      .offset(5);

    if (oldSessions.length > 0) {
      await db('twitter_sessions')
        .whereIn(
          'id',
          oldSessions.map(s => s.id)
        )
        .del();
    }

    // Insert new session
    await db('twitter_sessions').insert({
      headers: JSON.stringify(session.headers),
      cookies: JSON.stringify(session.cookies),
      created_at: session.created_at,
      is_valid: session.is_valid,
      last_used: session.last_used,
      url: session.url,
      query_params: session.query_params,
    });
  } catch (error) {
    console.error('Error saving session:', error);
  }
}

export async function createNewTwitterSession(
  url: string
): Promise<TwitterSession> {
  let browser: Browser | null = null;
  let page: Page | null = null;
  let tweetDetailUrl = '';

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-blink-features=AutomationControlled',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--safebrowsing-disable-auto-update',
        '--ignore-certificate-errors',
        '--ignore-ssl-errors',
        '--ignore-certificate-errors-spki-list',
        '--disable-features=VizDisplayCompositor',
        '--disable-gpu-sandbox',
        '--disable-accelerated-2d-canvas',
        '--disable-accelerated-jpeg-decoding',
        '--disable-accelerated-mjpeg-decode',
        '--disable-accelerated-video-decode',
        '--disable-accelerated-video-encode',
        '--disable-app-list-dismiss-on-blur',
        '--no-zygote',
        '--memory-pressure-off',
        '--max_old_space_size=1024',
        '--disable-features=site-per-process',
        // Additional anti-detection args
        '--disable-blink-features=AutomationControlled',
        '--exclude-switches=enable-automation',
        '--disable-extensions-http-throttling',
        '--disable-component-extensions-with-background-pages',
        '--disable-default-apps',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-component-update',
        '--disable-domain-reliability',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-speech-api',
        '--disable-file-system',
        '--disable-notifications',
        '--disable-permissions-api',
        '--disable-presentation-api',
        '--disable-sensors-api',
        '--disable-wake-lock-api',
        '--disable-webaudio',
        '--disable-web-bluetooth',
        '--disable-webgl',
        '--disable-webrtc',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=user-gesture-required',
        '--disable-features=VizDisplayCompositor',
      ],
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Store intercepted headers
    let interceptedHeaders: Record<string, string> = {};
    let queryParams: string = '';

    // Enhanced anti-detection measures
    await page.evaluateOnNewDocument(() => {
      // Remove webdriver property
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // Remove automation indicator
      delete (window as any).navigator.webdriver;

      // Mock plugins with more realistic data
      Object.defineProperty(navigator, 'plugins', {
        get: () => ({
          length: 5,
          0: {
            name: 'Chrome PDF Plugin',
            description: 'Portable Document Format',
            filename: 'internal-pdf-viewer',
          },
          1: {
            name: 'Chrome PDF Viewer',
            description: '',
            filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
          },
          2: {
            name: 'Native Client',
            description: '',
            filename: 'internal-nacl-plugin',
          },
          3: {
            name: 'WebKit built-in PDF',
            description: 'Portable Document Format',
            filename: 'internal-pdf-viewer',
          },
          4: {
            name: 'Microsoft Edge PDF Plugin',
            description: 'Portable Document Format',
            filename: 'internal-pdf-viewer',
          },
        }),
      });

      // Mock languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });

      // Mock permissions
      Object.defineProperty(navigator, 'permissions', {
        get: () => ({
          query: () => Promise.resolve({ state: 'granted' }),
        }),
      });

      // Mock chrome runtime
      Object.defineProperty(window, 'chrome', {
        get: () => ({
          runtime: {
            onConnect: null,
            onMessage: null,
          },
          app: {
            isInstalled: false,
          },
        }),
      });

      // Mock notification permissions
      Object.defineProperty(Notification, 'permission', {
        get: () => 'default',
      });

      // Mock hardware concurrency
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 4,
      });

      // Mock device memory
      Object.defineProperty(navigator, 'deviceMemory', {
        get: () => 8,
      });

      // Mock connection
      Object.defineProperty(navigator, 'connection', {
        get: () => ({
          effectiveType: '4g',
          rtt: 50,
          downlink: 10,
        }),
      });

      // Override console.debug to prevent detection
      const originalDebug = console.debug;
      console.debug = function (...args) {
        if (args[0] && args[0].includes('DevTools')) return;
        originalDebug.apply(console, args);
      };

      // Mock battery API
      Object.defineProperty(navigator, 'getBattery', {
        get: () => () =>
          Promise.resolve({
            charging: true,
            chargingTime: 0,
            dischargingTime: Infinity,
            level: 1,
          }),
      });
    });

    // More realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    );

    // Enhanced headers for server environment
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0',
      'sec-ch-ua':
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    });
    // Set up request interception
    await page.setRequestInterception(true);

    page.on('request', (request: any) => {
      const requestUrl = request.url();
      if (requestUrl.includes('TweetResultByRestId')) {
        const urlParts = requestUrl.split('?');
        tweetDetailUrl = urlParts[0];
        queryParams = urlParts[1];
        interceptedHeaders = request.headers();
      }
      request.continue();
    });
    //go to the tweet URL
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 120000,
    });
    // Get context and cookies
    const context = page.browserContext();
    const cookies = await context.cookies();

    const now = new Date();

    const session: TwitterSession = {
      headers: interceptedHeaders,
      cookies: cookies,
      created_at: now,
      is_valid: true,
      last_used: now,
      url: tweetDetailUrl,
      query_params: queryParams,
    };

    await saveSession(session);

    return session;
  } catch (error) {
    console.error('❌ Error in createNewTwitterSession:', error);
    throw error;
  } finally {
    // Improved cleanup
    if (page && !page.isClosed()) {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
    if (browser && browser.process() !== null) {
      try {
        await browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    }
  }
}

export async function makeTwitterApiRequest(apiUrl: string, headers: any) {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json();
}

export function extractTweetData(data: any) {
  const tweetData = data.data?.tweetResult;
  const videoVariants =
    tweetData.result?.legacy?.extended_entities?.media?.[0]?.video_info
      ?.variants;
  const userName = tweetData.result.tweet
    ? tweetData.result.tweet.core.user_results.result.core.name
    : tweetData.result.core.user_results.result.core.name;
  const handle = tweetData.result.tweet
    ? tweetData.result.tweet.core.user_results.result.core.screen_name
    : tweetData.result.core.user_results.result.core.screen_name;
  const date = tweetData.result.tweet
    ? tweetData.result.tweet.legacy.created_at
    : tweetData.result.legacy.created_at;
  const description = tweetData.result.tweet
    ? tweetData.result?.tweet.legacy?.full_text
    : tweetData.result?.legacy?.full_text;

  const mp4Videos = videoVariants?.filter(
    (variant: any) => variant.content_type === 'video/mp4'
  );

  return {
    videoUrls: mp4Videos,
    handle: handle,
    date: date,
    userName: userName,
    description: description,
  };
}

export function extractScreenShotData(data: any) {
  const tweetData = data.data?.tweetResult;
  const videoVariants =
    tweetData.result?.legacy?.extended_entities?.media?.[0]?.video_info
      ?.variants;
  const userImage = tweetData.result.tweet
    ? tweetData.result.tweet.core.user_results.result.avatar.image_url
    : tweetData.result.core.user_results.result.avatar.image_url;
  const userName = tweetData.result.tweet
    ? tweetData.result.tweet.core.user_results.result.core.name
    : tweetData.result.core.user_results.result.core.name;
  const handle = tweetData.result.tweet
    ? tweetData.result.tweet.core.user_results.result.core.screen_name
    : tweetData.result.core.user_results.result.core.screen_name;
  const date = tweetData.result.tweet
    ? tweetData.result.tweet.legacy.created_at
    : tweetData.result.legacy.created_at;
  const description = tweetData.result.tweet
    ? tweetData.result?.tweet.legacy?.full_text
    : tweetData.result?.legacy?.full_text;
  const bookmarkCount = tweetData.result.tweet
    ? tweetData.result?.tweet.legacy?.bookmark_count
    : tweetData.result?.legacy?.bookmark_count || 0;
  const favouriteCount = tweetData.result.tweet
    ? tweetData.result?.tweet.legacy?.favorite_count
    : tweetData.result?.legacy?.favorite_count || 0;
  const replyCount = tweetData.result.tweet
    ? tweetData.result?.tweet.legacy?.reply_count
    : tweetData.result?.legacy?.reply_count || 0;
  const retweetCount = tweetData.result?.legacy?.retweet_count || 0;

  const url = tweetData.result.tweet
    ? tweetData.result.tweet.legacy.entities.urls[0]?.url
    : tweetData.result.legacy.entities.urls[0]?.url || '';
  const expandedUrl = tweetData.result.tweet
    ? tweetData.result.tweet.legacy.entities.urls[0]?.expanded_url
    : tweetData.result.legacy.entities.urls[0]?.expanded_url || '';
  const displayUrl = tweetData.result.tweet
    ? tweetData.result.tweet.legacy.entities.urls[0]?.display_url
    : tweetData.result.legacy.entities.urls[0]?.display_url || '';
  const viewCount = tweetData.result.tweet
    ? tweetData.result.tweet.views.count
    : tweetData.result.views.count;
  let image;
  if (tweetData.result.tweet) {
    image =
      tweetData.result?.tweet.legacy?.extended_entities?.media?.map(
        (mediaItem: any) => mediaItem.media_url_https
      ) || [];
  } else {
    image =
      tweetData.result?.legacy?.extended_entities?.media?.map(
        (mediaItem: any) => mediaItem.media_url_https
      ) || [];
  }

  const mp4Videos = videoVariants?.filter(
    (variant: any) => variant.content_type === 'video/mp4'
  );
  const urlObj = {
    url,
    expanded_url: expandedUrl,
    display_url: displayUrl,
  };
  const desc = formatTweetText(description, urlObj);
  return {
    videoUrls: mp4Videos,
    handle: handle,
    date: date,
    userName: userName,
    description: desc,
    userImage: userImage,
    retweetCount: retweetCount,
    replyCount: replyCount,
    favouriteCount: favouriteCount,
    bookmarkCount: bookmarkCount,
    image: image,
    viewCount: viewCount || 0,
  };
}

function formatTweetText(
  text: string,
  {
    url,
    expanded_url,
    display_url,
  }: { url: string; expanded_url: string; display_url: string }
): string {
  // Remove the trailing self-link (if present at end)
  text = text.replace(/\s*https:\/\/t\.co\/\w+$/, '').trim();

  // Replace the given url with an <a>
  const anchor = `<a href="${expanded_url}">${display_url}</a>`;
  text = text.replace(url, anchor);

  return text;
}
