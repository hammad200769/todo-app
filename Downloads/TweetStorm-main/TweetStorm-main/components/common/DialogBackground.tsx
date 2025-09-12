import { ReactNode } from 'react';

type DialogWrapperProps = {
  children: ReactNode;
  onClick?: () => void;
};

function DialogWrapper({ children, onClick }: DialogWrapperProps) {
  return (
    <div
      className='fixed z-100 inset-0 bg-black/40 px-4 flex-cc'
      onClick={onClick ?? (() => '')}
    >
      {children}
    </div>
  );
}

export default DialogWrapper;
