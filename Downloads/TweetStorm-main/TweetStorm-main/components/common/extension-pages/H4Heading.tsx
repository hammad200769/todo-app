import { ReactNode } from 'react';

type H4HeadingProps = {
  children: ReactNode;
};

function H4Heading({ children }: H4HeadingProps) {
  return <h4 className='text-xl font-bold mb-3'>{children}</h4>;
}

export default H4Heading;
