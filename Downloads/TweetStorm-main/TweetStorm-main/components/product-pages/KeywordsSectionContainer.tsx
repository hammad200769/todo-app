import { ReactNode } from 'react';

type KeywordsSectionContainerProps = {
  children: ReactNode;
};

function KeywordsSectionContainer({ children }: KeywordsSectionContainerProps) {
  return (
    <article id='available-filters' className='mx-auto max-w-3xl mt-36'>
      {children}
    </article>
  );
}

export default KeywordsSectionContainer;
