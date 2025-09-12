import { ReactNode } from 'react';

export function FormFieldError({ children }: { children: ReactNode }) {
  return <p className='text-sm font-bold text-rose-600'>{children}</p>;
}
