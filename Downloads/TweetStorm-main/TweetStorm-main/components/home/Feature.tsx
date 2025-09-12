import clsx from 'clsx';
import { ReactNode } from 'react';

function Feature({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section
      className={clsx(
        'flex flex-col gap-10 md:flex-row md:items-center md:gap-16',
        reverse && 'md:flex-row-reverse'
      )}
    >
      {children}
    </section>
  );
}

export default Feature;
