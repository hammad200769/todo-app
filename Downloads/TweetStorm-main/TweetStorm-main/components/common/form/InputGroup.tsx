import { ReactNode } from 'react';

type InputGroupProps = {
  children: ReactNode;
};

function InputGroup({ children }: InputGroupProps) {
  return <div className='space-y-1  '>{children}</div>;
}

export default InputGroup;
