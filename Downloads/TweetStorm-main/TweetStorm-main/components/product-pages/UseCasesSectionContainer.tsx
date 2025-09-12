import { ReactNode } from 'react';

type UseCasesSectionContainerProps = {
  children: ReactNode;
};

function UseCasesSectionContainer({ children }: UseCasesSectionContainerProps) {
  return <section className='space-y-10'>{children}</section>;
}

export default UseCasesSectionContainer;
