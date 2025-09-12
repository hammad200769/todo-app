import clsx from 'clsx';
import { ReactNode } from 'react';
import { AIIcon } from '../icons';

type GenerateButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  isLoading: boolean;
};

function GenerateButton({
  handleClick,
  isLoading,
  children,
}: GenerateButtonProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={isLoading}
      className={clsx(
        'flex-cc w-full rounded-md cursor-pointer border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white gap-1 cta-shadow focus:shadow-none link-anim',
        isLoading
          ? 'opacity-70 cursor-not-allowed shadow-none!'
          : 'hover:bg-primary/90'
      )}
    >
      {isLoading ? (
        <div className='flex-cc gap-x-2'>
          <div className='animate-spin rounded-[50%] border-t-primary border-white border-[2px] h-5 w-5'></div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <AIIcon />
          {children}
        </>
      )}
    </button>
  );
}

export default GenerateButton;
