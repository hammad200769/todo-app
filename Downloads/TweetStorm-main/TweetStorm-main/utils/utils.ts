import {
  STANDARD_TWEET_LENGTH,
  TweetSearchType,
  VideoUrls,
} from '@/types/types';
import Joi from 'joi';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { MONTHS_SHORT, REPLIES_FILTER_TYPE_TO_NUMBER_MAP } from './constants';

export function removeKeys(obj: Record<any, any>, keysToRemove: Array<string>) {
  const newObject: Record<any, any> = {};
  Object.keys(obj).forEach(
    key => keysToRemove.includes(key) || (newObject[key] = obj[key])
  );
  return newObject;
}

export function pickKeys(obj: Record<any, any>, keysToPick: Array<string>) {
  const newObject: Record<any, any> = {};
  Object.keys(obj).forEach(
    key => keysToPick.includes(key) && (newObject[key] = obj[key])
  );
  return newObject;
}

export function getNonSpaceTokens(str: string): Array<string> {
  return str.split(' ').filter(word => word);
}

export function getCurrentForamttedDate(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const day = now.getDate().toString().padStart(2, '0');
  const month = now.toLocaleString('default', { month: 'short' });
  const year = now.getFullYear();
  return `${hours}:${minutes} · ${day} ${month} ${year}`;
}

export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  return await response.json();
}

export function jsonStringify(obj: Record<any, any>): string {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  );
}

export function formatInvoiceAmount(amount: number): string {
  // In our case, currency is always dollar
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function getNameInitials(name: string): [string, undefined | string] {
  if (name.includes('@')) return [name.split('@')[0][0], undefined];
  const arr = name.trim().split(' ');
  const firstName = arr[0];
  const lastName = arr[arr.length - 1];
  return [firstName[0], lastName ? lastName[0] : undefined];
}

export function getValidationError(
  data: Record<any, any>,
  schema: Joi.ObjectSchema<any>
): string {
  const { error } = schema.validate(data);
  return error ? error.message : '';
}

export function getTweetCost(tweetLength: string): number {
  if (tweetLength === STANDARD_TWEET_LENGTH.Short) return 1;
  if (tweetLength === STANDARD_TWEET_LENGTH.Medium) return 3;
  if (tweetLength === STANDARD_TWEET_LENGTH.Long) return 6;
  throw new Error('Invalid tweet length');
}

export function getProfilePicUrl(name: string) {
  const firstInitial = getNameInitials(name)[0];
  const lastInitial = getNameInitials(name)[1];
  let nameInitials = firstInitial;
  if (lastInitial) nameInitials += `+${lastInitial}`;
  return `https://ui-avatars.com/api/?name=${nameInitials}&color=7F9CF5&background=EBF4FF`;
}

export const generateTwitterSearchURL = (
  searchData: TweetSearchType
): string => {
  let url = 'https://twitter.com/search?q=';

  const searchTokens: Array<string> = [];
  const {
    all_these_words,
    exact_match_phrase,
    any_these_words,
    excluded_words,
    hashtags,
    language,
    location,
    distance,
    from_accounts,
    to_accounts,
    mention_accounts,
    min_likes,
    min_replies,
    min_reposts,
    replies_filter,
    links_filter,
    from_followed_people,
    from_nearby,
    start_date,
    end_date,
  } = searchData;

  // the extra spaces between allTheseWords should be retained
  if (all_these_words.trim() !== '') {
    searchTokens.push(all_these_words.trim());
  }

  if (exact_match_phrase !== '') {
    searchTokens.push(`"${exact_match_phrase}"`);
  }

  if (any_these_words.trim() !== '') {
    searchTokens.push(`(${getNonSpaceTokens(any_these_words).join(' OR ')})`);
  }

  if (excluded_words.trim() !== '') {
    searchTokens.push(
      `${getNonSpaceTokens(excluded_words)
        .map(str => '-' + str)
        .join(' ')}`
    );
  }

  if (hashtags.trim() !== '') {
    searchTokens.push(
      `(${getNonSpaceTokens(hashtags)
        .map(word => {
          return word.startsWith('#') ? word : `#${word}`;
        })
        .join(' OR ')
        .replace(/#/g, '%23')})`
    );
  }

  if (language !== 'any-language') {
    searchTokens.push(`lang:${language}`);
  }

  if (location.trim() !== '') {
    const formattedLocation = getNonSpaceTokens(location).join(' ');
    // if location contains multiple words, then surround them with quote
    searchTokens.push(
      formattedLocation.includes(' ')
        ? `near:"${formattedLocation}"`
        : `near:${formattedLocation}`
    );
  }

  if (distance.trim() !== '' && Number(distance) > 0) {
    searchTokens.push(`within:${distance}mi`);
  }

  if (from_accounts.trim() !== '') {
    searchTokens.push(
      `(${getNonSpaceTokens(from_accounts)
        .map(word => {
          return word.startsWith('@')
            ? `from:${word.slice(1)}`
            : `from:${word}`;
        })
        .join(' OR ')})`
    );
  }

  if (to_accounts.trim() !== '') {
    searchTokens.push(
      `(${getNonSpaceTokens(to_accounts)
        .map(word => {
          return word.startsWith('@') ? `to:${word.slice(1)}` : `to:${word}`;
        })
        .join(' OR ')})`
    );
  }

  if (mention_accounts.trim() !== '') {
    searchTokens.push(
      `(${getNonSpaceTokens(mention_accounts)
        .map(word => {
          return word.startsWith('@') ? word : `@${word}`;
        })
        .join(' OR ')})`
    );
  }

  if (min_replies.trim() !== '') {
    searchTokens.push(`min_replies:${min_replies}`);
  }

  if (min_likes.trim() !== '') {
    searchTokens.push(`min_faves:${min_likes}`);
  }

  if (min_reposts.trim() !== '') {
    searchTokens.push(`min_retweets:${min_reposts}`);
  }

  if (replies_filter === REPLIES_FILTER_TYPE_TO_NUMBER_MAP.only.toString()) {
    searchTokens.push('filter:replies');
  } else if (
    replies_filter === REPLIES_FILTER_TYPE_TO_NUMBER_MAP.none.toString()
  ) {
    searchTokens.push('-filter:replies');
  }

  if (links_filter === REPLIES_FILTER_TYPE_TO_NUMBER_MAP.only.toString()) {
    searchTokens.push('filter:links');
  } else if (
    links_filter === REPLIES_FILTER_TYPE_TO_NUMBER_MAP.none.toString()
  ) {
    searchTokens.push('-filter:links');
  }

  if (start_date.trim() !== '') {
    searchTokens.push(`since:${start_date}`);
  }

  if (end_date.trim() !== '') {
    searchTokens.push(`until:${end_date}`);
  }

  url = url + searchTokens.join(' ');

  if (from_followed_people === 'true') {
    url += `&pf=on`;
  }

  if (from_nearby === 'true') {
    url += `&lf=on`;
  }

  return url;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month as it is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function stopClickPropagation(event: MouseEvent<HTMLElement>) {
  event.stopPropagation();
}

export function camelCasetoLowerCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

export function validateSchema(
  schema: Joi.ObjectSchema<any>,
  data: Record<string, any>
): Joi.ValidationResult<any> {
  return schema.validate(data, { abortEarly: false });
}

export function notifySuccess(message: string) {
  toast.success(message);
}
export function notifyError(message: string) {
  toast.error(message);
}

export async function get(url: string): Promise<Response> {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response;
}

export async function post(
  url: string,
  data?: Record<any, any>
): Promise<Response> {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function put(
  url: string,
  data: Record<any, any>
): Promise<Response> {
  return await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteReq(
  url: string,
  data?: Record<any, any>
): Promise<Response> {
  return await fetch(url, {
    method: 'DELETE',
    ...(data
      ? {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : {}),
  });
}

export function cutText(str: string, maxLength: number = 18) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}

export function pascalCaseToSpaced(pascalCaseWord: string): string {
  const words = pascalCaseWord.split(/(?=[A-Z])/);
  return words.join(' ');
}

export function formatDateOnly(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export function camelCaseToKebabCase(camelCasedWord: string): string {
  return camelCasedWord.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function validateTwitterVideoUrl(url: string | null): boolean {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function updateTweetIdInQueryParams(
  queryParams: string,
  newTweetId: string
): string {
  const urlSearchParams = new URLSearchParams(queryParams);

  const variablesParam = urlSearchParams.get('variables');
  if (variablesParam) {
    try {
      const variables = JSON.parse(variablesParam);
      variables.tweetId = newTweetId;

      urlSearchParams.set('variables', JSON.stringify(variables));
    } catch (error) {
      console.error('Error parsing variables parameter:', error);
    }
  }

  return urlSearchParams.toString();
}

export function formatTwitterDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const pad = (n: number): string => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
}

export function findBestTwitterVideoUrl(
  videoUrls: VideoUrls[]
): VideoUrls | null {
  if (!videoUrls || videoUrls.length === 0) return null;

  try {
    return videoUrls.reduce((best: VideoUrls, current: VideoUrls) => {
      // Ensure bitrate exists and is a number
      const currentBitrate = current.bitrate || 0;
      const bestBitrate = best.bitrate || 0;
      return currentBitrate > bestBitrate ? current : best;
    }, videoUrls[0]);
  } catch (error) {
    console.error('Error finding best video URL:', error);
    return videoUrls[0]; // Return first video as fallback
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
