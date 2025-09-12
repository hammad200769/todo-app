'use client';
import CircularLoader from '@/components/common/CircularLoader';
import { InlineLink } from '@/components/common/Links';
import TweetSearchesTableHeader from '@/components/my-tweet-searches/TweetSearchesTableHeader';
import SearchTableRow from '@/components/my-tweet-searches/TweetSearchRow';
import {
  useSubscription,
  useUserTweetSearches,
  useUserTweetSearchesCount,
} from '@/hooks/swr';
import { URLS } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { useSWRConfig } from 'swr/_internal';

const TWEET_SEARCHES_PER_PAGE = 10;

function TweetSearchesTable() {
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get('page') ?? '1';
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;
  const { mutate } = useSWRConfig();

  const {
    data: userTweetSearchesData,
    isLoading,
    mutate: mutateTweetSearchesForCurrentPage,
  } = useUserTweetSearches({
    page: !!subscription ? currentPage : '1',
    count: !!subscription ? 10 : 5,
  });

  const { data: userTweetSearchesCountData, mutate: mutateTweetSearchesCount } =
    useUserTweetSearchesCount();
  const router = useRouter();

  function handlePageClick(pageNumber: number) {
    router.push(`${URLS.myTweetSearces}?page=${pageNumber + 1}`);
  }

  function onDeleteSuccess() {
    mutate((key: string) => {
      return key.startsWith('/api/user/tweet-searches?page');
    }, undefined);
    mutateTweetSearchesCount();
  }

  function onEditSuccess() {
    mutateTweetSearchesForCurrentPage();
  }

  const userTweetSearches = userTweetSearchesData?.searches;
  const userTweetSearchesCount = userTweetSearchesCountData?.count;

  let totalPages: number = 0;
  if (userTweetSearchesCount !== undefined) {
    totalPages = Math.ceil(userTweetSearchesCount / TWEET_SEARCHES_PER_PAGE);
  }

  if (isLoading) return <CircularLoader />;

  return userTweetSearches && userTweetSearches.length > 0 ? (
    <div className='rounded-xl border border-gray-300 dark:border-dark-mode-border shadow-xs'>
      <div className='overflow-x-auto rounded-t-xl'>
        <table className='w-full divide-y divide-gray-300 dark:divide-gray-700 text-start text-sm'>
          <thead>
            <tr className='bg-gray-100 dark:bg-primary-dark'>
              <TweetSearchesTableHeader text='Search Name' />
              <TweetSearchesTableHeader text='Search Terms' />
              <TweetSearchesTableHeader text='Created at' />
              <TweetSearchesTableHeader text='Actions' align='right' />
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-300 dark:divide-dark-mode-border whitespace-nowrap'>
            {userTweetSearches?.map(search => (
              <SearchTableRow
                key={search.id}
                data={search}
                onDelete={onDeleteSuccess}
                onEditSuccess={onEditSuccess}
              />
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && !!subscription && (
        <div className='border-t border-gray-300 dark:border-dark-mode-border py-3 px-4 text-sm flex-cb'>
          <p className='dark:text-gray-300'>
            Showing {getPageStart(parseInt(currentPage))} to{' '}
            {getPageEnd(parseInt(currentPage), userTweetSearchesCount ?? 0)} of{' '}
            {userTweetSearchesCount} results
          </p>
          <ReactPaginate
            breakLabel=' . . . '
            nextLabel='>'
            onPageChange={e => {
              handlePageClick(e.selected);
            }}
            containerClassName='flex border border-gray-300 dark:border-dark-mode-border rounded-lg divide-x divide-gray-300 dark:divide-gray-700'
            pageLinkClassName='flex-cc py-1 px-2 dark:text-gray-300'
            nextLinkClassName='flex-cc py-1 px-2 dark:text-gray-300'
            previousLinkClassName='flex-cc py-1 px-2 dark:text-gray-300'
            activeLinkClassName='bg-gray-200 dark:bg-primary-dark-light'
            pageRangeDisplayed={7}
            pageCount={totalPages}
            previousLabel='<'
            renderOnZeroPageCount={null}
            forcePage={parseInt(currentPage) - 1}
          />
        </div>
      )}
    </div>
  ) : (
    <p className='dark:text-white'>
      You have no searches yet. You can{' '}
      <InlineLink href={URLS.tweetSearch} decorated>
        search tweets here
      </InlineLink>
    </p>
  );
}

function getPageStart(pageNumber: number): number {
  return (pageNumber - 1) * TWEET_SEARCHES_PER_PAGE + 1;
}

function getPageEnd(pageNumber: number, totalRecords: number): number {
  return pageNumber * TWEET_SEARCHES_PER_PAGE <= totalRecords
    ? pageNumber * TWEET_SEARCHES_PER_PAGE
    : totalRecords;
}

export default TweetSearchesTable;
