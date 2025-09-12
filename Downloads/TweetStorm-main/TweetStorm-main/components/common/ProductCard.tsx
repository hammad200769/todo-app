import Link from 'next/link';
import { ReactNode } from 'react';

type ProductCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

function ProductCard({ title, description, icon, href }: ProductCardProps) {
  return (
    <Link href={href}>
      <div className='px-5 py-4 text-wrap border border-gray-300 dark:border-dark-mode-border rounded-md hover:bg-gray-50 dark:hover:bg-primary-dark transition-colors duration-[0.3s] ease-linear max-w-[400px]'>
        <article className='flex basis-[360px] flex-col space-y-4 max-w-[700px] mx-auto'>
          <div>
            <div className='flex-c gap-x-3'>
              <div className='p-2 bg-primary rounded-full text-white'>
                {icon}
              </div>
              <h3 className='text-lg'>{title}</h3>
            </div>
            <p className='mt-2'>{description}</p>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default ProductCard;
