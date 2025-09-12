import { ReactNode } from 'react';

type InputLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

function InputLabel({ htmlFor, children }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className='text-base font-medium leading-tight'>
      {children}
    </label>
  );
}

export default InputLabel;
