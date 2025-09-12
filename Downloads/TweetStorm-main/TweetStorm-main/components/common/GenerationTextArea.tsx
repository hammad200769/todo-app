import { MAX_TEXT_TO_GENERATE_LENGTH } from '@/utils/constants';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

type GenerationTextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

function GenerationTextArea({
  value,
  onChange,
  placeholder,
  className,
}: GenerationTextAreaProps) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <textarea
      rows={5}
      id='comment'
      autoComplete='off'
      className={clsx(
        'block w-full dark:bg-primary-dark dark:text-white dark:placeholder-slate-500 resize-none border-0 py-3 focus:ring-0 text-sm text-black',
        className
      )}
      placeholder={placeholder}
      name='tweet'
      value={value}
      onChange={handleChange}
      maxLength={MAX_TEXT_TO_GENERATE_LENGTH}
    />
  );
}

export default GenerationTextArea;
