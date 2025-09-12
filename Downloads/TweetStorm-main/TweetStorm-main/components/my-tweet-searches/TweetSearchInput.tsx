import { ChangeEvent } from 'react';

type TweetSearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
};

function TweetSearchInput({
  value,
  onChange,
  placeholder,
  id,
}: TweetSearchInputProps) {
  return (
    <input
      type='text'
      id={id}
      placeholder={placeholder}
      className='border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5'
      value={value}
      onChange={onChange}
    />
  );
}

export default TweetSearchInput;
