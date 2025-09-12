'use client';
import { useUser } from '@/hooks/swr';
import { getProfilePicUrl } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import AccountDropDown from './AccountDropDown';

function PrivateNavigationProfilePic() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: userData } = useUser();
  const user = userData?.user;

  return (
    <div className='relative'>
      <button
        className='border-2 cursor-pointer border-gray-300 rounded-full focus:border-gray-400 transition'
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        {user && (
          <Image
            className='rounded-full object-cover'
            src={getProfilePicUrl(user.name ?? user.email)}
            alt='avatar'
            width={38}
            height={38}
          />
        )}
      </button>

      {isMenuOpen && <AccountDropDown onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}

export default PrivateNavigationProfilePic;
