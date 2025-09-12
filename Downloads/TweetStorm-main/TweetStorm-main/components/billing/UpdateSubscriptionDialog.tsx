import { useFormFeedback } from '@/hooks/hooks';
import { SUBSCRIPTION_NAME } from '@/types/types';
import { INVOICES_PER_PAGE } from '@/utils/constants';
import { put } from '@/utils/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import DialogWrapper from '../common/DialogBackground';
import FeedBack from '../common/FeedBack';
import { CrossIcon } from '../icons';
import CancelDialogButton from './CancelDialogButton';
import DialogConfirmationButton from './DialogConfirmationButton';

type UpdateSubscriptionDialogProps = {
  onClose: () => void;
  updateTo: SUBSCRIPTION_NAME;
};

function UpdateSubscriptionDialog({
  onClose,
  updateTo,
}: UpdateSubscriptionDialogProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const { mutate } = useSWRConfig();

  async function handleUpgrade() {
    try {
      setLoading(true);
      const response = await put('/api/subscription', {
        subscriptionName: updateTo,
      });

      if (response.ok) {
        mutate('/api/subscription');
        mutate('/api/payments/next-payment');
        mutate('/api/user/credits');
        setTimeout(() => {
          mutate(`/api/user/invoices?limit=${INVOICES_PER_PAGE}`);
          mutate('/api/user/invoices/count');
        }, 500);
        router.replace(pathname + '?checkout=subscription_started');
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
        <div className='bg-white dark:bg-dark-mode-gray rounded-lg px-6 py-4 grow max-w-2xl'>
          <div className='flex-cb'>
            <h2 className='text-[20px] font-medium'>Confirm Billing Action</h2>
            <button className='pl-1 cursor-pointer' onClick={onClose}>
              <CrossIcon />
            </button>
          </div>
          <div className='mt-4'>
            <p>Are you sure you want to switch plans?</p>
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
              onClick={handleUpgrade}
              disabled={loading}
            />
          </div>
        </div>
      </DialogWrapper>
    </>
  );
}

export default UpdateSubscriptionDialog;
