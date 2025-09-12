import { ReactNode } from 'react';

type CancelDialogButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function CancelDialogButton({
  children,
  onClick,
}: CancelDialogButtonProps) {
  return (
    <button
      onClick={onClick}
      className='px-4 py-2 border cursor-pointer bg-white dark:bg-primary-dark-light border-gray-300 rounded-md tracking-wide text-sm shadow-xs active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition'
    >
      {children}
    </button>
  );
}
