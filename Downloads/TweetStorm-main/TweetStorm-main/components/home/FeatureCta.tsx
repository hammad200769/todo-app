import Link from 'next/link';
import { ReactNode } from 'react';

type FeatureCtaProps = {
  href: string;
  children: ReactNode;
  target?: string;
};

function FeatureCta({ href, children, target }: FeatureCtaProps) {
  return (
    <Link
      target={target}
      href={href}
      className='bg-primary text-white inline-block rounded-lg cta-shadow hover:bg-primary-hover link-anim px-5 py-2 focus:shadow-none'
    >
      {children}
    </Link>
  );
}

export default FeatureCta;
