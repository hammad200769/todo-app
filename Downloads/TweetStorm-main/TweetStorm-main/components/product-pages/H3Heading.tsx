import { ReactNode } from 'react';

type H3HeadingProps = {
  children: ReactNode;
  className?: string;
};

function H3Heading({ children, className }: H3HeadingProps) {
  return <h3 className={`text-2xl font-bold mb-3 ${className}`}>{children}</h3>;
}

export default H3Heading;
