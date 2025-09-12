import clsx from 'clsx';
import { ReactNode } from 'react';
import { AIIcon } from '../icons';

type GenerateButtonProps = {
  onClick: VoidFunction;
  children: ReactNode;
  isLoading: boolean;
};

function GenerateButton({ onClick, isLoading, children }: GenerateButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        'flex-cc w-full cursor-pointer rounded-md border border-transparent bg-primary px-4 py-2 text-lg font-semibold text-white gap-2 shadow-[-2px_2px_4px_0px_#a9a9a9] dark:shadow-[-4px_4px_0px_0px_#171717c7] focus:shadow-none dark:focus:shadow-none group',
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
          <div className='group-hover:scale-[102%] flex-cc gap-x-2 transition-transform'>
            <AIIcon />
            {children}
          </div>
        </>
      )}
    </button>
  );
}

export default GenerateButton;
