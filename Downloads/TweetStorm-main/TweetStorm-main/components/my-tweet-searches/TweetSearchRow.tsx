import { UserTweetSearch } from '@/types/types';
import { LANGUAGES } from '@/utils/constants';
import {
  cutText,
  formatDate,
  generateTwitterSearchURL,
  getNonSpaceTokens,
  removeKeys,
} from '@/utils/utils';
import { useMemo, useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import TweetSearchDeleteDialog from './TweetSearchDeleteDialog';
import TweetSearchEditModal, { getDefaultData } from './TweetSearchEditModal';

type SearchTableRowProps = {
  data: UserTweetSearch;
  onDelete: VoidFunction;
  onEditSuccess: VoidFunction;
};

export default function SearchTableRow({
  data,
  onDelete,
  onEditSuccess,
}: SearchTableRowProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { name, created_at, id: searchId, ...restData } = data;

  function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const url = generateTwitterSearchURL(getDefaultData(restData));
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleOpenEditModal() {
    setIsEditDialogOpen(true);
  }

  function handleOpenDeleteModal() {
    setIsDeleteDialogOpen(true);
  }

  const tweetSearchTerms = useMemo((): string => {
    const searchTerms: Array<string> = [];
    if (data.exact_match_phrase) {
      searchTerms.push(data.exact_match_phrase);
    }
    if (data.all_these_words) {
      getNonSpaceTokens(data.all_these_words).forEach(word =>
        searchTerms.push(word)
      );
    }
    if (data.any_these_words) {
      getNonSpaceTokens(data.any_these_words).forEach(word =>
        searchTerms.push(word)
      );
    }
    if (data.hashtags) {
      getNonSpaceTokens(data.hashtags).forEach(word =>
        searchTerms.push(word.startsWith('#') ? word : `#${word}`)
      );
    }
    if (data.from_accounts) {
      getNonSpaceTokens(data.from_accounts).forEach(word =>
        searchTerms.push(word.startsWith('@') ? word : `@${word}`)
      );
    }
    if (data.to_accounts) {
      getNonSpaceTokens(data.to_accounts).forEach(word =>
        searchTerms.push(word.startsWith('@') ? word : `@${word}`)
      );
    }
    if (data.mention_accounts) {
      getNonSpaceTokens(data.mention_accounts).forEach(word =>
        searchTerms.push(word.startsWith('@') ? word : `@${word}`)
      );
    }
    if (data.language) {
      searchTerms.push(
        LANGUAGES.find(lang => lang.code === data.language)?.name ?? ''
      );
    }
    if (data.location) {
      searchTerms.push(data.location);
    }

    return searchTerms.join(', ');
  }, [
    data.all_these_words,
    data.any_these_words,
    data.exact_match_phrase,
    data.from_accounts,
    data.hashtags,
    data.language,
    data.location,
    data.to_accounts,
    data.mention_accounts,
  ]);

  return (
    <>
      <tr>
        <td>
          <div className='px-4 py-3'>{cutText(name)}</div>
        </td>

        <td>
          <div className='px-4 py-3 whitespace-normal dark:text-gray-300'>
            {cutText(tweetSearchTerms, 160)}
          </div>
        </td>

        <td>
          <div className='px-4 py-3'>
            <span className='inline-block whitespace-nowrap rounded-xl px-2 py-0.5 font-medium tracking-tight rtl:space-x-reverse dark:bg-primary-dark bg-gray-100'>
              {formatDate(created_at.toString())}
            </span>
          </div>
        </td>

        <td>
          <div className='flex justify-end md:gap-2 gap-1 pr-2'>
            <button
              className='px-1 cursor-pointer py-2 rounded-md hover:bg-gray-200 dark:hover:bg-primary-dark'
              onClick={handleSearch}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={20}
                height={20}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx={11} cy={11} r={8} />
                <line x1={21} y1={21} x2='16.65' y2='16.65' />
              </svg>
            </button>
            <button
              className='px-1 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-primary-dark cursor-pointer'
              onClick={handleOpenEditModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='21'
                height='21'
                viewBox='0 0 50 50'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path d='M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z'></path>
              </svg>
            </button>

            <button
              className='px-1 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-primary-dark cursor-pointer'
              onClick={handleOpenDeleteModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='20'
                height='18'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6V21a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M10 11v6M14 11v6' />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      <DialogDisplayer
        dialogComponent={
          <TweetSearchEditModal
            tweetSearchData={
              removeKeys(data, ['created_at']) as Omit<
                UserTweetSearch,
                'created_at'
              >
            }
            onClose={() => setIsEditDialogOpen(false)}
            onEditSuccess={onEditSuccess}
          />
        }
        showDialog={isEditDialogOpen}
      />
      <DialogDisplayer
        dialogComponent={
          <TweetSearchDeleteDialog
            tweetSearchId={searchId}
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={onDelete}
          />
        }
        showDialog={isDeleteDialogOpen}
      />
    </>
  );
}
