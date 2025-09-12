import {
  ApiKey,
  Credits,
  Invoice,
  NextPayment,
  PaymentMethod,
  Subscription,
  TweetPreset,
  User,
  UserGeneration,
  UserTweetSearch,
} from '@/types/types';
import { fetcher } from '@/utils/utils';
import useSWR from 'swr';

export function useSubscription() {
  return useSWR<{ subscription: Subscription | null }>(
    '/api/subscription',
    fetcher
  );
}

export function useCredits() {
  return useSWR<{ credits: Credits }>('/api/user/credits', fetcher);
}

export function useApiKey() {
  return useSWR<{ apiKey: ApiKey }>('/api/extension/api-key', fetcher);
}
export function useNextPayment() {
  return useSWR<{ nextPayment: NextPayment }>(
    '/api/payments/next-payment',
    fetcher
  );
}

export function useUser() {
  return useSWR<{ user: User }>('/api/user', fetcher);
}

export function usePaymentMethod() {
  return useSWR<{ pm: PaymentMethod }>('/api/user/payment-method', fetcher);
}

export function useInvoices({
  limit,
  startBefore,
  startAfter,
}: {
  limit: number;
  startAfter: string | null;
  startBefore: string | null;
}) {
  let url: string | undefined;
  if (startAfter)
    url = `/api/user/invoices?limit=${limit}&starting_after=${startAfter}`;
  else if (startBefore)
    url = `/api/user/invoices?limit=${limit}&ending_before=${startBefore}`;
  else url = `/api/user/invoices?limit=${limit}`;

  return useSWR<{ invoices: Array<Invoice> | null }>(url, fetcher);
}

export function useInvoicesCount() {
  return useSWR<{ count: number }>('/api/user/invoices/count', fetcher);
}

export function useUserGenerations({
  count = 10,
  page,
  order = 'asc',
  type,
}: {
  count?: number;
  page: string;
  order: string;
  type: number | undefined;
}) {
  return useSWR<{ generations: Array<UserGeneration> }>(
    `/api/user/generations?page=${
      page ?? 1
    }&count=${count}&type=${type}&order=${order}`,
    fetcher
  );
}

export function useUserGenerationsCount(type: number | undefined) {
  return useSWR<{ count: number }>(
    `/api/user/generations/count?type=${type}`,
    fetcher
  );
}

export function useUserTweetSearches({
  count = 10,
  page,
}: {
  count?: number;
  page: string;
}) {
  return useSWR<{ searches: Array<UserTweetSearch> }>(
    `/api/user/tweet-searches?page=${page ?? 1}&count=${count}`,
    fetcher
  );
}

export function useUserTweetSearchesCount() {
  return useSWR<{ count: number }>('/api/user/tweet-searches/count', fetcher);
}

export function usePreset() {
  return useSWR<{ presets: Array<TweetPreset> }>(
    '/api/x-screenshot/presets',
    fetcher
  );
}
