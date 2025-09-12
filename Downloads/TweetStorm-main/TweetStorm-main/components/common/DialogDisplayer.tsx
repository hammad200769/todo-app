import { useIsMounted } from '@/hooks/hooks';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type DialogDisplayerProps = {
  showDialog: boolean;
  dialogComponent: JSX.Element;
};
function DialogDisplayer({
  showDialog,
  dialogComponent,
}: DialogDisplayerProps) {
  const isMounted = useIsMounted();

  useEffect(() => {
    if (showDialog) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showDialog]);

  return (
    isMounted &&
    showDialog &&
    createPortal(dialogComponent, document.getElementById('dialog-root')!)
  );
}

export default DialogDisplayer;
