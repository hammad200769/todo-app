import { URLS } from '@/utils/constants';
import Link from 'next/link';

function SubscribeForMoreCreditsLink() {
  return (
    <Link
      href={URLS.billing}
      className='flex-cc w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-xs bg-orange-600'
    >
      ✨ Subscribe for more credits ✨
    </Link>
  );
}

export default SubscribeForMoreCreditsLink;
