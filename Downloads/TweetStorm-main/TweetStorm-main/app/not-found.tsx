import ClarityScript from '@/components/common/ClarityScript';
import GuestLayout from '@/components/common/GuestLayout';
import { Link } from '@/components/common/Links';

function PageNotFound() {
  return (
    <>
      <ClarityScript />
      <GuestLayout>
        <div className='flex flex-col items-center justify-center '>
          <h1 className='text-9xl font-bold mb-4'>404</h1>
          <h2 className='text-2xl font-semibold mb-8'>Page Not Found</h2>
          <p className='mb-8 text-center max-w-md'>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Link href='/'>Go back to homepage</Link>
        </div>
      </GuestLayout>
    </>
  );
}
export default PageNotFound;
