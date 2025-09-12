import { TweetSearchType } from '@/types/types';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

type NumberInputProps = {
  name: keyof TweetSearchType;
  id?: string;
  placeholder: string;
  register: UseFormRegister<TweetSearchType>;
  min: string;
  hasError: boolean;
  pattern?: RegExp;
  validate?: (value: string) => boolean;
};

function NumberInput({
  name,
  placeholder,
  register,
  id,
  min,
  hasError,
  pattern,
  validate,
}: NumberInputProps) {
  return (
    <input
      {...register(name, {
        ...(pattern && { pattern: pattern }),
        ...(validate && { validate }),
      })}
      onWheel={evt => (evt.target as HTMLInputElement).blur()}
      type='number'
      id={name ?? id}
      className={clsx(
        'border border-gray-300 dark:border-dark-mode-border dark:bg-primary-dark dark:text-soft-white text-sm rounded-lg block w-full p-2.5',
        hasError && 'focus:ring-rose-600 focus:border-rose-600'
      )}
      min={min}
      placeholder={placeholder}
      // to allow decimal values
      step='any'
    />
  );
}

export default NumberInput;
