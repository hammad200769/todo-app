'use client';
import {
  useSubscription,
  useUserGenerations,
  useUserGenerationsCount,
} from '@/hooks/swr';
import { UserGenerationTypes } from '@/types/types';
import { URLS, USER_GENERATION_TYPE_TO_NUMBER_MAP } from '@/utils/constants';
import { cutText, formatDate, pascalCaseToSpaced } from '@/utils/utils';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import 'rc-tooltip/assets/bootstrap_white.css';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { mutate } from 'swr';
import CircularLoader from '../common/CircularLoader';
import ToolTipHelper from '../common/pricing/ToolTipHelper';
import Tooltip from '../common/Tooltip';
import MyGenerationsTableHeader from './MyGenerationsTableHeader';

function getGenerationTypeName(type: number): UserGenerationTypes {
  return Object.keys(USER_GENERATION_TYPE_TO_NUMBER_MAP).find(
    key =>
      USER_GENERATION_TYPE_TO_NUMBER_MAP[key as UserGenerationTypes] === type
  ) as UserGenerationTypes;
}

const GENERATIONS_PER_PAGE = 10;

const generationTypeColors: Record<UserGenerationTypes, string> = {
  Tweet: 'text-blue-700 bg-blue-500/10',
  Hashtags: 'text-success-700 bg-success-500/10',
  Bio: 'text-warning-700 bg-warning-500/10',
  Handle: 'text-danger bg-danger/10',
  ReplyTweet: 'text-orange-700 bg-orange-500/10',
};

function MyGenerationsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams?.get('page') ?? '1';
  const typeParam = searchParams?.get('type') ?? '';
  const orderParam = searchParams?.get('order') ?? 'desc';

  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    orderParam as 'asc' | 'desc'
  );
  const [showTypeDropdown, setShowTypeDropdown] = useState<Boolean>(false);
  const [showDateDropdown, setShowDateDropdown] = useState<Boolean>(false);

  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  const { data: userGenerationsData, isLoading } = useUserGenerations({
    page: !!subscription ? currentPage : '1',
    count: !!subscription ? GENERATIONS_PER_PAGE : 5,
    type: mapType(selectedType),
    order: sortOrder,
  });
  const { data: userGenerationsCountData } = useUserGenerationsCount(
    mapType(selectedType)
  );
  const userGenerations = userGenerationsData?.generations || [];
  const userGenerationsCount = userGenerationsCountData?.count || 0;

  const totalPages = Math.ceil(userGenerationsCount / GENERATIONS_PER_PAGE);

  function mapType(type: string) {
    if (!type) return undefined;

    if (type in USER_GENERATION_TYPE_TO_NUMBER_MAP) {
      return USER_GENERATION_TYPE_TO_NUMBER_MAP[type as UserGenerationTypes];
    }

    return undefined;
  }

  function handlePageClick(pageNumber: number) {
    const params = new URLSearchParams();
    params.set('page', (pageNumber + 1).toString());

    if (selectedType) {
      params.set('type', selectedType);
    }

    if (sortOrder !== 'desc') {
      params.set('order', sortOrder);
    }

    router.push(`${URLS.myGenerations}?${params.toString()}`);
  }

  function resetFilters() {
    setSelectedType('');
    setSortOrder('desc');
    router.push(`${URLS.myGenerations}?page=1`);
  }

  function selectDateOption(order: 'asc' | 'desc') {
    setSortOrder(order);
    setShowDateDropdown(false);

    const params = new URLSearchParams();
    params.set('page', '1');

    if (selectedType) {
      params.set('type', selectedType);
    }

    if (order !== 'desc') {
      params.set('order', order);
    }
    router.push(`${URLS.myGenerations}?${params.toString()}`);
    mutate(`${URLS.myGenerations}?${params.toString()}`);
  }

  function selectTypeOption(type: string) {
    setSelectedType(type);
    setShowTypeDropdown(false);

    const params = new URLSearchParams();
    params.set('page', '1');

    if (type) {
      params.set('type', type);
    }

    if (sortOrder !== 'desc') {
      params.set('order', sortOrder);
    }
    router.push(`${URLS.myGenerations}?${params.toString()}`);
    mutate(`${URLS.myGenerations}?${params.toString()}`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTypeDropdown &&
        !(event.target as Element).closest('#typeFilterContainer')
      ) {
        setShowTypeDropdown(false);
      }

      if (
        showDateDropdown &&
        !(event.target as Element).closest('#dateFilterContainer')
      ) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTypeDropdown, showDateDropdown]);

  useEffect(() => {
    setSelectedType(typeParam);
    setSortOrder(orderParam as 'asc' | 'desc');
  }, [typeParam, orderParam]);
  return (
    <div className='space-y-10'>
      {subscription !== null ? (
        <div className='rounded-xl mb-5 bg-white dark:bg-primary-dark'>
          <div className='flex flex-col md:flex-row md:items-end md:space-x-4 w-full space-y-2 md:space-y-0'>
            <div id='typeFilterContainer' className='relative w-full md:w-1/3'>
              <div className='flex items-center justify-start mb-1'>
                <label
                  htmlFor='typeFilter'
                  className='block text-sm mr-2 font-medium text-gray-700 dark:text-gray-300'
                >
                  Generation Type
                </label>
                <ToolTipHelper
                  helpText={[
                    'Select a specific generation type for more information',
                  ]}
                />
              </div>
              <div
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className='flex items-center justify-between rounded-lg border border-gray-300 dark:border-dark-mode-border px-3 py-2 bg-white dark:bg-primary-dark hover:bg-gray-50 dark:hover:bg-primary-dark-light focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer'
              >
                {selectedType ? (
                  <span
                    className={clsx(
                      'inline-flex rounded-lg px-2 py-0.5 text-sm',
                      generationTypeColors[selectedType as UserGenerationTypes]
                    )}
                  >
                    {pascalCaseToSpaced(selectedType as UserGenerationTypes)}
                  </span>
                ) : (
                  <span className='inline-flex rounded-lg px-2 py-0.5 text-sm'>
                    All Types
                  </span>
                )}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={`transition-transform duration-200 ${
                    showTypeDropdown ? 'transform rotate-180' : ''
                  }`}
                >
                  <path d='M3 9l9 9 9-9'></path>
                </svg>
              </div>

              {showTypeDropdown && (
                <div className='absolute z-10 mt-1 w-full bg-white dark:bg-primary-dark rounded-lg border border-gray-300 dark:border-dark-mode-border shadow-lg max-h-64 overflow-auto'>
                  <ul>
                    <li
                      className='px-3 py-2 hover:bg-gray-100 dark:hover:bg-primary-dark-light cursor-pointer'
                      onClick={() => selectTypeOption('')}
                    >
                      <span className='inline-flex rounded-lg px-2 py-0.5 text-sm max-w-[150px]'>
                        All Types
                      </span>
                    </li>
                    {Object.keys(USER_GENERATION_TYPE_TO_NUMBER_MAP).map(
                      type => (
                        <li
                          key={type}
                          className='px-3 py-2 hover:bg-gray-100 dark:hover:bg-primary-dark-light cursor-pointer'
                          onClick={() => selectTypeOption(type)}
                        >
                          <span
                            className={clsx(
                              'inline-flex rounded-lg px-2 py-0.5 text-sm max-w-[150px]',
                              generationTypeColors[type as UserGenerationTypes]
                            )}
                          >
                            {pascalCaseToSpaced(type as UserGenerationTypes)}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div id='dateFilterContainer' className='relative w-full md:w-1/3'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Date
              </label>
              <div
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className='flex items-center justify-between rounded-lg border border-gray-300 text-sm dark:border-dark-mode-border px-3 py-2 bg-white dark:bg-primary-dark hover:bg-gray-50 dark:hover:bg-primary-dark-light focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer'
              >
                <span className='inline-flex rounded-lg px-2 py-0.5 text-sm'>
                  {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={`transition-transform duration-200 ${
                    showDateDropdown ? 'transform rotate-180' : ''
                  }`}
                >
                  <path d='M3 9l9 9 9-9'></path>
                </svg>
              </div>

              {showDateDropdown && (
                <div className='absolute z-10 mt-1 w-full bg-white dark:bg-primary-dark rounded-lg border border-gray-300 dark:border-dark-mode-border shadow-lg'>
                  <ul>
                    <li
                      className={`px-3 py-2 hover:bg-gray-50 mb-1 rounded-t-lg dark:hover:bg-primary-dark-light cursor-pointer ${
                        sortOrder === 'desc'
                          ? 'bg-gray-100 dark:bg-primary'
                          : ''
                      }`}
                      onClick={() => selectDateOption('desc')}
                    >
                      Newest
                    </li>
                    <li
                      className={`px-3 py-2 hover:bg-gray-50 dark:hover:bg-primary-dark-light rounded-b-lg cursor-pointer ${
                        sortOrder === 'asc' ? 'bg-gray-200 dark:bg-primary' : ''
                      }`}
                      onClick={() => selectDateOption('asc')}
                    >
                      Oldest
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className='w-full md:w-1/3 flex items-end'>
              {selectedType || sortOrder !== 'desc' ? (
                <button
                  onClick={resetFilters}
                  className='lg:w-1/2 mt-2 cursor-pointer md:mt-0 h-10 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-primary-dark dark:hover:bg-primary-dark-light rounded-lg transition-colors border border-gray-300 dark:border-dark-mode-border'
                >
                  Reset Filters
                </button>
              ) : (
                <div className='h-10 w-full'></div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div>
          <CircularLoader />
        </div>
      ) : userGenerations.length > 0 ? (
        <div className='rounded-xl border border-gray-300 dark:border-dark-mode-border shadow-xs'>
          <div className='overflow-x-auto rounded-t-xl'>
            <table className='w-full divide-y divide-gray-300 dark:divide-gray-700 text-start text-sm'>
              <thead>
                <tr className='bg-gray-100 dark:bg-primary-dark'>
                  <MyGenerationsTableHeader text='Type' />
                  <MyGenerationsTableHeader text='Prompted Text' />
                  <MyGenerationsTableHeader text='Text' />
                  {(selectedType === 'Tweet' ||
                    selectedType === 'Bio' ||
                    selectedType === 'ReplyTweet') && (
                    <>
                      <MyGenerationsTableHeader text='Tone' />
                      <MyGenerationsTableHeader text='Keywords' />
                    </>
                  )}

                  <MyGenerationsTableHeader text='Created at' />
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-300 dark:divide-dark-mode-border whitespace-nowrap'>
                {userGenerations.map(generation => {
                  const generationTypeName = getGenerationTypeName(
                    generation.type
                  );

                  return (
                    <tr key={generation.id}>
                      <td>
                        <div className='px-4 py-3'>
                          <span
                            className={clsx(
                              'inline-flex whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse',
                              generationTypeColors[generationTypeName]
                            )}
                          >
                            {pascalCaseToSpaced(generationTypeName)}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className='px-4 py-3 rtl:space-x-reverse whitespace-normal'>
                          {generation.promptedText}
                        </div>
                      </td>

                      <td>
                        <div className='px-4 py-3 whitespace-normal inline-flex rtl:space-x-reverse'>
                          <Tooltip text='Copied!'>
                            <div
                              className='cursor-pointer'
                              onClick={() => {
                                navigator.clipboard.writeText(generation.text);
                              }}
                            >
                              {cutText(generation.text, 400)}
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      {(selectedType === 'Tweet' ||
                        selectedType === 'Bio' ||
                        selectedType === 'ReplyTweet') && (
                        <>
                          <td>
                            <div className='px-4 py-3'>
                              {generation.tone &&
                              generation.tone !== 'No-Tone' &&
                              generation.tone !== null ? (
                                <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse bg-gray-100 dark:bg-primary-dark-light'>
                                  {generation.tone}
                                </span>
                              ) : (
                                <div className='px-4 py-3'>
                                  <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse'>
                                    -
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                      {(selectedType === 'Tweet' ||
                        selectedType === 'Bio' ||
                        selectedType === 'ReplyTweet') && (
                        <>
                          <td>
                            <div className='px-4 py-3'>
                              {generation.keywords !== null &&
                              generation.keywords.length > 0 ? (
                                <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse bg-gray-100 dark:bg-primary-dark-light'>
                                  {generation.keywords.join(', ')}
                                </span>
                              ) : (
                                <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse'>
                                  -
                                </span>
                              )}
                            </div>
                          </td>
                        </>
                      )}

                      <td>
                        <div className='px-4 py-3'>
                          <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-sm tracking-tight rtl:space-x-reverse bg-gray-100 dark:bg-primary-dark-light'>
                            {formatDate(generation.createdAt)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && !!subscription && (
            <div className='border-t border-gray-300 dark:border-dark-mode-border py-3 px-4 text-sm flex-cb'>
              <p>
                Showing {getPageStart(parseInt(currentPage))} to{' '}
                {getPageEnd(parseInt(currentPage), userGenerationsCount)} of{' '}
                {userGenerationsCount} results
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
        <div className='text-center py-20 px-1 rounded-xl border border-gray-300 dark:border-dark-mode-border bg-white dark:bg-primary-dark-light'>
          <h2 className='md:text-lg text-base font-medium'>
            No generation record exists.
          </h2>
        </div>
      )}
    </div>
  );
}

function getPageStart(pageNumber: number): number {
  return (pageNumber - 1) * GENERATIONS_PER_PAGE + 1;
}

function getPageEnd(pageNumber: number, totalRecords: number): number {
  return Math.min(pageNumber * GENERATIONS_PER_PAGE, totalRecords);
}

export default MyGenerationsTable;
