import { Products } from '@/types/types';
import clsx from 'clsx';
import H2Heading from '../ai-tweet-generator/H2Heading';
import ProductCard from './ProductCard';

type ProductsSectionProps = {
  products: Products;
  className?: string;
};

function ProductsSection({ products, className }: ProductsSectionProps) {
  return (
    <section className={clsx('max-w-6xl mx-auto mt-36', className)}>
      <div className='text-center'>
        <H2Heading>Explore Our Other Products</H2Heading>
        <p className='max-w-2xl mx-auto mt-2'>
          Discover more innovative tools designed to improve your Twitter
          experience
        </p>
      </div>
      <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-fit mx-auto mt-20'>
        {products.map(product => (
          <ProductCard
            key={product.href}
            title={product.title}
            href={product.href}
            description={product.description}
            icon={product.icon}
          />
        ))}
      </ul>
    </section>
  );
}

export default ProductsSection;
