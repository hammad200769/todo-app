import { TweetSearchType } from '@/types/types';
import { UseFormRegister } from 'react-hook-form';

type RadioButtonGroupProps = {
  value: string;
  id: string;
  name: keyof TweetSearchType;
  label: string;
  register: UseFormRegister<TweetSearchType>;
};

function RadioButtonGroup({
  value,
  id,
  label,
  register,
  name,
}: RadioButtonGroupProps) {
  return (
    <div className='flex-c space-x-2 leading-tight'>
      <input
        type='radio'
        className='text-slate-700 checked:text-slate-700 focus: dark:focus:ring-primary-dark  dark:focus:ring-2'
        id={id}
        value={value}
        {...register(name)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioButtonGroup;
