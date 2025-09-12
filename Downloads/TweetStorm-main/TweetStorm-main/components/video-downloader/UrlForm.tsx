'use client';

import { isValidUrl, notifyError } from '@/utils/utils';
import { useState } from 'react';
interface UrlFormProps {
  downloadAgain?: string;
}
function UrlForm({ downloadAgain }: UrlFormProps) {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleClick() {
    setIsLoading(true);

    if (url.trim() === '' || !isValidUrl(url)) {
      notifyError('Please enter a valid Twitter video URL');
      setIsLoading(false);

      return;
    }
    setIsLoading(false);

    window.location.href = `/products/x-video-downloader/info?url=${encodeURIComponent(
      url
    )}`;
  }
  return (
    <div className='bg-white/10 p-6 sm:p-12 lg:p-20 mt-6 sm:mt-8 lg:mt-10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg'>
      <div className='flex flex-col gap-4 sm:gap-6 items-center justify-center'>
        {downloadAgain && (
          <h2 className='font-semibold text-gray-600 text-xl'>
            {downloadAgain}
          </h2>
        )}
        <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-2 text-center justify-center w-full'>
          <input
            type='url'
            value={url}
            className='border border-gray-300 rounded p-2 sm:p-3 w-full sm:w-4/5 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter Twitter video link (https://x.com/JonDoe/status/1234567890123456)'
            onChange={e => setUrl(e.target.value)}
          />
          <button
            className='bg-primary cursor-pointer hover:bg-primary/90 transition-colors duration-200 rounded w-full sm:w-1/5 text-white p-2 sm:p-3 text-sm sm:text-base font-medium min-w-[100px]'
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UrlForm;
