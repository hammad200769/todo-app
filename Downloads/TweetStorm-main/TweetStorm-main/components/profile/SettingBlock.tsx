import { ReactNode } from 'react';

function SettingsBlock({ children }: { children: ReactNode }) {
  return (
    <div className='grid md:grid md:grid-cols-[1fr_2fr] gap-4 md:gap-6'>
      {children}
    </div>
  );
}

export default SettingsBlock;
