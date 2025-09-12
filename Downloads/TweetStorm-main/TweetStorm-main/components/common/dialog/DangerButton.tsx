import { ReactNode } from 'react';

type DangerButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export function DangerButton({
  children,
  onClick,
  disabled = false,
}: DangerButtonProps) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='inline-flex items-center cursor-pointer justify-center px-4 py-2 bg-danger tracking-wide rounded-md font-medium text-sm text-white hover:bg-rose-700 disabled:opacity-25 transition'
      disabled={disabled}
    >
      {children}
    </button>
  );
}
