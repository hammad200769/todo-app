import { ThemeContext } from '@/components/common/ThemeProvider';
import { FormFeedback } from '@/types/types';
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export function useFormFeedback() {
  const [formFeedback, setFormFeedback] = useState<FormFeedback | null>(null);

  const setError = useCallback((message: string, interval?: number) => {
    setFormFeedback({ type: 'error', message });
    if (interval) {
      setTimeout(() => {
        setFormFeedback(null);
      }, interval);
    }
  }, []);

  const setSuccess = useCallback((message: string, interval?: number) => {
    setFormFeedback({ type: 'success', message });
    if (interval) {
      setTimeout(() => {
        setFormFeedback(null);
      }, interval);
    }
  }, []);

  const resetFeedback = useCallback(() => setFormFeedback(null), []);

  return useMemo(
    () => ({
      formFeedback,
      setError,
      setSuccess,
      resetFeedback,
    }),
    [formFeedback, resetFeedback, setError, setSuccess]
  );
}

export function useOutsideClickDetector({
  cb,
  ignoreDom,
}: {
  cb: VoidFunction;
  ignoreDom: MutableRefObject<HTMLElement | null>;
}) {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!e.target) return;
      if (
        e.target === ignoreDom.current ||
        ignoreDom.current?.contains(e.target as Node)
      ) {
        return false;
      } else {
        cb();
      }
    },
    [cb, ignoreDom]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return null;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
