import React from 'react';

function GeneratorPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <section className='bg-white dark:bg-primary-dark overflow-hidden shadow-xl text-center sm:rounded-lg py-20 px-4 sm:px-6 lg:px-8'>
        {children}
      </section>
    </div>
  );
}

export default GeneratorPagesLayout;
