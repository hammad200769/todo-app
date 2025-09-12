import { ReactNode } from 'react';

function StickyNavigationWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='responsive-pad-navigation bg-white dark:bg-primary-dark border-b dark:border-b-black shadow-[#00000040_0px_2px_3px] fixed left-0 right-0 z-20'>
      {children}
    </div>
  );
}

export default StickyNavigationWrapper;
