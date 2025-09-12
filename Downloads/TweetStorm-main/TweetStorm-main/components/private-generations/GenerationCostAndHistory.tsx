import { URLS } from '@/utils/constants';
import Link from 'next/link';

type GenerationCostAndHistoryProps = {
  creditsCost: number;
};

function GenerationCostAndHistory({
  creditsCost,
}: GenerationCostAndHistoryProps) {
  return (
    <div className='flex-cb mt-2 w-full'>
      <p className='text-sm text-yellow-600 dark:text-yellow-500 italic'>
        Cost: {creditsCost} {creditsCost > 1 ? 'Credits' : 'Credit'}
      </p>
      <Link
        className='block text-right text-sm italic underline hover:text-primary-dark dark:hover:text-primary-light'
        href={URLS.myGenerations}
      >
        All my generations
      </Link>
    </div>
  );
}

export default GenerationCostAndHistory;
