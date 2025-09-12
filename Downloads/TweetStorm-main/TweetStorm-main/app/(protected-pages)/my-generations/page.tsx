import GenerationsLimitMessage from '@/components/my-generations/GenerationsLimitMessage';
import MyGenerationsTable from '@/components/my-generations/MyGenerationsTable';
import { withAuthenticationProtection } from '@/hocs';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Generations',
  description: 'View your generations.',
};

function MyGenerationsPage() {
  return (
    <main>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <section className='bg-white dark:bg-primary-dark overflow-visible shadow-xl sm:rounded-lg p-6'>
          <h2 className='font-semibold text-xl text-center leading-tight mb-4'>
            Generations
          </h2>

          <GenerationsLimitMessage />
          <Suspense>
            <MyGenerationsTable />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

export default withAuthenticationProtection(MyGenerationsPage);
