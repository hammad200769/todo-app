import { ReactNode } from 'react';

type UseCasesListContainerProps = {
  children: ReactNode;
};

function UseCasesListContainer({ children }: UseCasesListContainerProps) {
  return <div className='space-y-8'>{children}</div>;
}

export default UseCasesListContainer;
