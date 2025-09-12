import Image from 'next/image';

function TweetProfile() {
  return (
    <div className='flex-cb border-b border-gray-200 dark:border-dark-mode-border p-4'>
      <div className='flex items-center'>
        <Image
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          alt='Avatar'
          className='rounded-full'
          width={44}
          height={44}
        />
        <div className='ml-2'>
          <div className='text-base font-bold'>John Doe</div>
          <div className='text-sm'>@johndoe</div>
        </div>
      </div>
      <div className='text-sm'>Now</div>
    </div>
  );
}

export default TweetProfile;
