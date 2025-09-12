import { BIO_GENERATION_TONE, TWEET_GENERATION_TONE } from '@/types/types';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

type SentimentFiltersType = {
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  standardTone?: TWEET_GENERATION_TONE;
  disable?: boolean;
  tones: TWEET_GENERATION_TONE[] | BIO_GENERATION_TONE[];
};

function SentimentFilters({
  onChange,
  standardTone,
  disable = false,
  tones,
}: SentimentFiltersType) {
  return (
    <div className='flex gap-2 items-stretch text-sm'>
      <div className='flex flex-col items-start space-y-0.5'>
        <label htmlFor='sentiment'>Tone</label>
        <select
          onChange={e => {
            if (!disable && onChange) onChange(e);
          }}
          name='sentiment'
          id='sentiment'
          value={standardTone}
          className={clsx('text-sm rounded-md h-[36px] px-2 outline-hidden', {
            'dark:bg-primary-dark text-gray-500 cursor-not-allowed bg-gray-200':
              disable,
            'bg-inherit dark:bg-primary-dark cursor-pointer': !disable,
          })}
        >
          {tones.map(tone => {
            const isNoTone = tone === TWEET_GENERATION_TONE['No-Tone'];
            return (
              <option
                key={tone}
                value={isNoTone ? 'No-Tone' : tone}
                className={clsx(
                  'text-sm',
                  disable && 'dark:bg-slate-800 text-gray-500'
                )}
              >
                {isNoTone ? 'No Tone' : tone}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default SentimentFilters;
