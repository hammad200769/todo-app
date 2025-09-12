import { useFormFeedback } from '@/hooks/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import DialogWrapper from '../common/DialogBackground';
import FeedBack from '../common/FeedBack';
import { CrossIcon } from '../icons';
import CancelDialogButton from './CancelDialogButton';
import DialogConfirmationButton from './DialogConfirmationButton';

type ResumeSubscriptionDialogProps = {
  onClose: () => void;
};

function ResumeSubscriptionDialog({ onClose }: ResumeSubscriptionDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const pathname = usePathname();
  const { mutate } = useSWRConfig();

  async function handleConfirmation() {
    try {
      setLoading(true);
      const response = await fetch('/api/subscription/resume', {
        method: 'PUT',
      });
      if (response.ok) {
        mutate('/api/subscription');
        mutate('/api/payments/next-payment');
        router.replace(pathname!);
        onClose();
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DialogWrapper>
        <div className='bg-white dark:bg-dark-mode-gray rounded-lg px-6 py-4 grow mx-auto max-w-2xl m-auto'>
          <div className='flex-cb'>
            <h2 className='text-[20px] font-medium'>Confirm Billing Action</h2>
            <button className='pl-1 cursor-pointer' onClick={onClose}>
              <CrossIcon />
            </button>
          </div>
          <div className='mt-4'>
            <p>Are you sure you want to resume your subscription?</p>
          </div>
          {formFeedback && (
            <div className='mt-4'>
              <FeedBack
                resetFeedback={resetFeedback}
                formFeedback={formFeedback}
              />{' '}
            </div>
          )}
          <div className='flex-c justify-end gap-x-2 mt-4'>
            <CancelDialogButton onClick={onClose} />
            <DialogConfirmationButton
              onClick={handleConfirmation}
              disabled={loading}
            />
          </div>
        </div>
      </DialogWrapper>
    </>
  );
}

export default ResumeSubscriptionDialog;
