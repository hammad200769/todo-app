import { TweetSearchType } from '@/types/types';
import { UseFormRegister } from 'react-hook-form';

type TweetSearchInputNewProps = {
  name: keyof TweetSearchType;
  id?: string;
  placeholder: string;
  register: UseFormRegister<TweetSearchType>;
};

function TextInput({
  name,
  placeholder,
  id,
  register,
}: TweetSearchInputNewProps) {
  return (
    <input
      type='text'
      id={id ?? name}
      placeholder={placeholder}
      className='border border-gray-300 text-sm rounded-lg dark:bg-primary-dark dark:text-soft-white dark:border-dark-mode-border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      {...register(name)}
    />
  );
}

export default TextInput;
