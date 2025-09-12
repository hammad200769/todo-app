import clsx from 'clsx';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  href: string;
  children: ReactNode;
  decorated?: boolean;
  target?: string;
  className?: string;
};

export function Link({
  children,
  href,
  target,
  decorated = false,
  className,
}: LinkProps) {
  return (
    <NextLink
      className={clsx(
        'text-primary dark:text-primary-light text-sm border-b link-anim',
        decorated
          ? 'border-b-current hover:border-b-transparent'
          : 'border-b-transparent hover:border-b-current',
        className
      )}
      target={target}
      href={href}
    >
      {children}
    </NextLink>
  );
}

export function InlineLink({
  children,
  href,
  target,
  decorated = false,
}: LinkProps) {
  return (
    <NextLink
      className={clsx(
        'text-[rgb(54,43,238)] border-b link-anim dark:text-primary-light',
        decorated
          ? 'border-b-current hover:border-b-transparent'
          : 'border-b-transparent hover:border-b-current'
      )}
      target={target}
      href={href}
    >
      {children}
    </NextLink>
  );
}
