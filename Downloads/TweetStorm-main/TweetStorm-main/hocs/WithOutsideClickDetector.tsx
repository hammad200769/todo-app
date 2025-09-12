'use client';

import { useOutsideClickDetector } from '@/hooks/hooks';
import { ComponentType, useRef } from 'react';

type WithLoggingProps = {
  onClose: VoidFunction;
};

export function withOutsideClickDetector<T>(
  WrappedComponent: ComponentType<T>
) {
  return function Component(props: T & WithLoggingProps) {
    const containerRef = useRef<null | HTMLDivElement>(null);
    useOutsideClickDetector({ cb: props.onClose, ignoreDom: containerRef });

    return (
      <div ref={containerRef}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
