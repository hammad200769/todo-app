import clsx from 'clsx';
import { ReactNode } from 'react';

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
  className?: string;
};

export function InputLabel({ children, htmlFor }: LabelProps) {
  return (
    <label className='block font-medium text-sm' htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function InputLabelLarge({ children, htmlFor, className }: LabelProps) {
  return (
    <label className={clsx('block text-base', className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
