'use client';
import { SWRConfig } from 'swr';

function Swr({ children }: { children: JSX.Element }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, revalidateIfStale: false }}>
      {children}
    </SWRConfig>
  );
}

export default Swr;
