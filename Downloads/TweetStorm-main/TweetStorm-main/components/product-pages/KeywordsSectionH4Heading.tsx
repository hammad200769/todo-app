import { ReactNode } from 'react';

type KeywordsSectionH4HeadingProps = {
  children: ReactNode;
};

function KeywordsSectionH4Heading({ children }: KeywordsSectionH4HeadingProps) {
  return <h4 className='text-lg font-semibold mb-2'>{children}</h4>;
}

export default KeywordsSectionH4Heading;
