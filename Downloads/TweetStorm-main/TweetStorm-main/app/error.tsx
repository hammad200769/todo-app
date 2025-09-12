'use client';

import ClarityScript from '@/components/common/ClarityScript';
import GuestLayout from '@/components/common/GuestLayout';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <>
      <ClarityScript />
      <GuestLayout>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-9xl font-extrabold'>Error</h1>
            <p className='text-2xl mt-4'>Something Went Wrong!</p>
            <button
              onClick={reset}
              className='mt-6 cursor-pointer inline-block px-8 py-4 text-lg font-semibold rounded-full bg-primary-twitter hover:bg-blue-600 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Try Again
            </button>
          </div>
        </div>
      </GuestLayout>
    </>
  );
}
