import { ChangeEvent } from 'react';

type InputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
};

export function Input({
  type = 'text',
  name,
  value,
  onChange,
  id,
  required,
  autoFocus,
}: InputProps) {
  return (
    <input
      id={id}
      className='block w-full border-gray-300 dark:bg-transparent dark:text-soft-white dark:border-dark-mode-border focus:border-indigo-300 focus:ring-3 focus:ring-indigo-300 rounded-md shadow-xs'
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={!!required}
      autoFocus={!!autoFocus}
    />
  );
}
