'use client';

import { TweetSearchType } from '@/types/types';
import {
  LINKS_FILTER_TYPE_TO_NUMBER_MAP,
  REPLIES_FILTER_TYPE_TO_NUMBER_MAP,
} from '@/utils/constants';
import { generateTwitterSearchURL } from '@/utils/utils';
import clsx from 'clsx';
import 'rc-tooltip/assets/bootstrap_white.css';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import DialogDisplayer from '../common/DialogDisplayer';
import FormSectionsContainer from './FormSectionsContainer';
import SaveDialog from './SaveDialog';

export const tweetSearchFormInitialData: TweetSearchType = {
  all_these_words: '',
  any_these_words: '',
  hashtags: '',
  exact_match_phrase: '',
  excluded_words: '',
  language: 'any-language',
  location: '',
  distance: '',
  from_accounts: '',
  to_accounts: '',
  mention_accounts: '',
  min_likes: '',
  min_replies: '',
  min_reposts: '',
  replies_filter: REPLIES_FILTER_TYPE_TO_NUMBER_MAP.with.toString(),
  links_filter: LINKS_FILTER_TYPE_TO_NUMBER_MAP.with.toString(),
  from_followed_people: 'false',
  from_nearby: 'false',
  start_date: '',
  end_date: '',
};

function TweetSearchForm() {
  const [showFeedbackDialog, setShowFeedbackDialog] = useState<boolean>(false);

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

  function handleSaveButtonClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowFeedbackDialog(true);
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className='flex gap-1 md:gap-3 my-2 justify-center items-center border-y border-gray-300 py-2'>
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
              'text-white disabled:cursor-not-allowed disabled:bg-primary/75 dark:disabled:bg-[#8f8be5bf] font-bold py-2 px-4 rounded-sm cursor-pointer',
              isDirty && 'bg-primary hover:bg-primary-hover cta-shadow'
            )}
            onClick={handleSaveButtonClick}
            disabled={!isDirty}
            type='button'
          >
            Save
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
        <div className='space-y-8 lg:space-y-12 mt-8'>
          <FormSectionsContainer formErrors={formErrors} register={register} />
        </div>
      </form>
      {showFeedbackDialog && (
        <DialogDisplayer
          dialogComponent={
            <SaveDialog onClose={() => setShowFeedbackDialog(false)} />
          }
          showDialog={showFeedbackDialog}
        />
      )}
    </>
  );
}

export default TweetSearchForm;
