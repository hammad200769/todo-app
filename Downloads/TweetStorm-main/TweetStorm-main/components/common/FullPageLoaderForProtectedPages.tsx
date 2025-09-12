import CircularLoader from './CircularLoader';

function FullPageLoaderForProtectedPages() {
  return (
    <div className='flex bg-soft-white dark:bg-primary-dark-light min-h-screen'>
      <div className='bg-gray-200 min-h-screen w-[240px] animate-pulse shadow-[1px_0px_4px_0px_#bdbdbd] dark:shadow-[1px_0px_4px_0px_#0b0c0d] dark:bg-primary-dark'></div>
      <div className='flex-1 overflow-y-auto'>
        <div className='bg-gray-200 h-[64px] border-b border-gray-300 animate-pulse dark:bg-primary-dark dark:border-0'></div>
        <div className='flex-cc' style={{ height: `calc(100vh - 64px)` }}>
          <div className='text-center'>
            <div className='flex-cc gap-x-3'>
              <CircularLoader width={24} height={24} borderWidth={3} />
              <h2 className='text-3xl font-bold'>Loading</h2>
            </div>
            <p className='mt-1'>
              Please wait patiently, your screen is loading
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoaderForProtectedPages;
