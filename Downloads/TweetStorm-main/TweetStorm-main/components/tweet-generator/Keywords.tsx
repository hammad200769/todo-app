import { MAX_KEYWORDS_LENGTH } from '@/utils/constants';
import clsx from 'clsx';
import React from 'react';

type KeywordsProps = {
  keywords?: string;
  setKeywords?: React.Dispatch<React.SetStateAction<string>>;
  disable?: boolean;
};
function Keywords({ keywords, setKeywords, disable = false }: KeywordsProps) {
  return (
    <div className='flex flex-col items-start text-sm w-full space-y-0.5'>
      <label
        htmlFor='keywords'
        className='flex items-center gap-2 justify-between w-full'
      >
        <span>Keywords</span>
        {!disable && <span>({keywords?.length}/200)</span>}
      </label>
      <input
        type='text'
        disabled={disable}
        name='keywords'
        id='keywords'
        maxLength={MAX_KEYWORDS_LENGTH}
        value={keywords}
        onChange={e => setKeywords && setKeywords(e.target.value)}
        placeholder='Comma separated keywords'
        className={clsx(
          'border rounded-md p-2 dark:text-soft-white text-primary-dark text-sm w-full dark:bg-primary-dark dark:placeholder:text-gray-500',
          disable && 'cursor-not-allowed bg-gray-200'
        )}
      />
    </div>
  );
}

export default Keywords;
