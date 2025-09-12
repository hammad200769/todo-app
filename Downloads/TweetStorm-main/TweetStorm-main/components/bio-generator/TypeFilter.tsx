import { BIO_GENERATION_TYPE } from '@/types/types';
import { BIO_TYPES } from '@/utils/constants';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

type TypeFilterProps = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  standardType: BIO_GENERATION_TYPE;
  disable?: boolean;
};

function TypeFilter({
  onChange,
  standardType,
  disable = false,
}: TypeFilterProps) {
  return (
    <div className='flex gap-2 items-stretch text-sm'>
      <div className='flex flex-col items-start space-y-0.5'>
        <label htmlFor='type'>Type</label>
        <select
          onChange={e => {
            if (!disable) onChange(e);
          }}
          value={standardType}
          name='type'
          id='type'
          className={clsx(
            'text-sm rounded-md dark:bg-primary-dark h-[36px]',
            disable && 'cursor-not-allowed bg-gray-200 text-gray-500'
          )}
        >
          {BIO_TYPES.map(tone => {
            return (
              <option key={tone} value={tone}>
                {tone}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default TypeFilter;
