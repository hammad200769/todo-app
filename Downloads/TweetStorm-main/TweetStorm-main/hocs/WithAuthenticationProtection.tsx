import ClientAuthProtection from '@/components/common/ClientAuthProtection';
import { ComponentType } from 'react';

export function withAuthenticationProtection<T>(
  WrappedComponent: ComponentType<T>
) {
  return function Component(props: any) {
    return (
      <ClientAuthProtection>
        <WrappedComponent {...props} />
      </ClientAuthProtection>
    );
  };
}
