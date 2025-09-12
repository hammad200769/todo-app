'use client';

import {
  ApiValidationErrors,
  ERROR_TYPE,
  TweetSearchType,
} from '@/types/types';
import {
  generateTwitterSearchURL,
  getNonSpaceTokens,
  notifySuccess,
  post,
} from '@/utils/utils';
import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import ErrorsCard from '../common/ErrorsCard';
import FormSectionsContainer from '../tweet-search/FormSectionsContainer';
import { tweetSearchFormInitialData } from '../tweet-search/TweetSearchForm';

export function formatDataForApi(data: TweetSearchType) {
  const numberTypes = new Set<string>([
    'min_likes',
    'min_replies',
    'min_reposts',
    'distance',
    'replies_filter',
    'links_filter',
  ]);
  const formattedData: Record<string, any> = {};
  for (const key in data) {
    const typedKey = key as keyof TweetSearchType;
    const value = data[typedKey];
    if (typedKey === 'language' && value === 'any-language') {
      continue;
    }
    if (numberTypes.has(typedKey) && value.trim() !== '') {
      formattedData[typedKey] = Number(value.trim());
      continue;
    }
    if (typedKey === 'exact_match_phrase' && value !== '') {
      formattedData[typedKey] = value;
      continue;
    }
    if (typedKey === 'all_these_words' && value.trim() !== '') {
      // retain whitespaces between words
      formattedData[typedKey] = value.trim();
      continue;
    }
    if (['from_followed_people', 'from_nearby'].includes(typedKey)) {
      formattedData[typedKey] = value === 'true' ? true : false;
      continue;
    }
    if (value.trim() !== '') {
      formattedData[typedKey] = getNonSpaceTokens(value).join(' ');
    }
  }
  return formattedData;
}

function TweetSearchForm() {
  const [searchName, setSearchName] = useState<string>('');
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [apiValidationErrors, setApiValidationErrors] =
    useState<ApiValidationErrors>([]);

  const { mutate } = useSWRConfig();

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors, isDirty },
    reset,
  } = useForm<TweetSearchType>({
    defaultValues: tweetSearchFormInitialData,
  });

  function handleSearch(data: TweetSearchType) {
    if (!isDirty) return;
    const url = generateTwitterSearchURL(data);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    reset();
  }

  async function handleSaveSearch(data: TweetSearchType) {
    if (!isDirty) return;

    setIsLoadingSave(true);

    try {
      const response = await post('/api/user/tweet-searches', {
        data: formatDataForApi(data),
        name: searchName.trim(),
      });
      if (response.ok) {
        notifySuccess('Tweet Search saved successfully.');
        setSearchName('');
        setApiValidationErrors([]);
        mutate((key: string) => {
          return key.startsWith('/api/user/tweet-searches?page');
        }, undefined);
      } else {
        const data = await response.json();
        if (data.error.type === ERROR_TYPE.ValidationError) {
          setApiValidationErrors(data.error.data);
        } else {
          alert(data.error.message);
        }
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsLoadingSave(false);
    }
  }

  const isSaveButtonDisabled =
    !isDirty || isLoadingSave || searchName.trim() === '';

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <div className='flex gap-x-2'>
        <input
          id='searchName'
          name='searchName'
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className={clsx(
            'border border-gray-300 grow text-sm rounded-lg dark:bg-primary-dark dark:border-dark-mode-border dark:text-soft-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          )}
          placeholder='Name your search (e.g. Marvel movie buzz)'
        />
        <button
          className={clsx(
            'text-white disabled:cursor-not-allowed disabled:bg-primary/75 dark:disabled:bg-[#8f8be5bf] font-bold py-2 px-4 rounded-sm cursor-pointer',
            !isSaveButtonDisabled &&
              'bg-primary hover:bg-primary-hover cta-shadow'
          )}
          onClick={handleSubmit(handleSaveSearch)}
          disabled={isSaveButtonDisabled}
          type='button'
        >
          Save
        </button>
      </div>
      <div className='flex-cc mt-8 space-x-1 xs:space-x-3'>
        <button
          className={clsx(
            'text-white disabled:bg-primary/75 dark:disabled:bg-[#8f8be5bf] disabled:cursor-not-allowed font-bold py-2 px-8 rounded-sm cursor-pointer',
            isDirty && 'bg-primary hover:bg-primary-hover cta-shadow'
          )}
          disabled={!isDirty}
          type='submit'
        >
          Search
        </button>
        <button
          className={clsx(
            'py-2 px-4 rounded-sm disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed border cursor-pointer',
            isDirty &&
              'hover:bg-gray-100 text-gray-600 border-gray-600 dark:text-white dark:border-gray-300 dark:hover:bg-gray-800'
          )}
          onClick={handleReset}
          disabled={!isDirty}
        >
          Reset
        </button>
      </div>
      {apiValidationErrors.length > 0 && (
        <div className='mt-3 grid lg:grid-cols-[0.25fr_1fr] gap-x-4'>
          <div></div>
          <ErrorsCard
            errors={apiValidationErrors.map(error => error.message)}
          />
        </div>
      )}
      <div className='space-y-8 lg:space-y-12 mt-8'>
        <FormSectionsContainer register={register} formErrors={formErrors} />
      </div>
    </form>
  );
}

export default TweetSearchForm;
