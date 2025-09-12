'use client';

import { getCurrentForamttedDate } from '@/utils/utils';

function CurrentDate() {
  return <time className='text-sm'>{getCurrentForamttedDate()}</time>;
}

export default CurrentDate;
