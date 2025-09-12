import { STANDARD_TWEET_LENGTH } from '@/types/types';
import { ChangeEvent } from 'react';

type TweetLengthFiltersType = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  standardTweetLength: STANDARD_TWEET_LENGTH | 'custom';
};

function TweetLengthFilters({
  onChange,
  standardTweetLength,
}: TweetLengthFiltersType) {
  return (
    <div className='flex gap-2 text-sm'>
      <div className='flex flex-col items-start space-y-0.5'>
        <label htmlFor='standardTweetLength'>Tweet length</label>
        <select
          onChange={onChange}
          value={standardTweetLength}
          name='standardTweetLength'
          id='standardTweetLength'
          className='text-xs rounded-md bg-inherit dark:bg-primary-dark h-[36px]'
        >
          <option value='short'>Default</option>
          <option value='medium'>Medium Tweet (about 1000 characters)</option>
          <option value='long'>Long Tweet (about 2500 characters)</option>
        </select>
      </div>
    </div>
  );
}

export default TweetLengthFilters;
