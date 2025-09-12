import { useFormFeedback } from '@/hooks/hooks';
import { post, stopClickPropagation } from '@/utils/utils';
import { useState } from 'react';
import {
  CancelDialogButton,
  DangerButton,
  DialogHeader,
} from '../common/dialog';
import DialogWrapper from '../common/DialogBackground';
import FeedBack from '../common/FeedBack';
import ConfirmDeleteSSOAccount from './ConfirmDeleteSSOAccount';
type DeleteSSOAccountDialogProps = {
  onClose: VoidFunction;
};

function DeleteSSOAccountDialog({ onClose }: DeleteSSOAccountDialogProps) {
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'notice' | 'confirmation'>('notice');
  const [readNotice, setReadNotice] = useState<boolean>(false);

  async function handleGetCode() {
    setLoading(true);
    resetFeedback();
    try {
      const response = await post('/api/account/send-deletion-code');
      if (response.ok) {
        setLoading(false);
        setStep('confirmation');
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAlreadyHaveCode() {
    setStep('confirmation');
  }

  return (
    <DialogWrapper>
      <div
        className='bg-white dark:bg-dark-mode-gray  grow rounded-lg shadow-lg max-w-xl mx-auto overflow-hidden transform transition-all'
        onClick={stopClickPropagation}
      >
        <DialogHeader
          onCloseButtonClick={onClose}
          type='danger'
          heading={
            step === 'notice' ? 'Account Deletion' : 'Confirm Account Deletion'
          }
        />

        {step === 'notice' ? (
          <div className='p-6 space-y-4'>
            <p>
              <strong className='text-danger'>Notice:</strong> After you delete
              your account, we will keep your data for 90 days, after which it
              will be permanently removed. You can reactivate your account
              within 90 days by sending us an email at{' '}
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}. However, your
              subscription will be cancelled immediately on account deletion.{' '}
            </p>
            <label className='flex-c space-x-2 w-fit'>
              <input
                type='checkbox'
                className='h-4 w-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500'
                checked={readNotice}
                onChange={e => setReadNotice(e.target.checked)}
              />
              <span>I have read the notice above</span>
            </label>
            <div className='space-y-1'>
              <p>
                Click the button below to receive an account deletion code at
                your email.
              </p>
              <div className='space-x-3 flex items-end'>
                <DangerButton
                  onClick={handleGetCode}
                  disabled={!readNotice || loading}
                >
                  Email Code
                </DangerButton>
                <button
                  className='cursor-pointer text-blue-600 underline disabled:hover:text-blue-600 hover:text-blue-800'
                  onClick={handleAlreadyHaveCode}
                  disabled={!readNotice || loading}
                >
                  Already have a code?
                </button>
              </div>
            </div>
            {formFeedback && (
              <div className='mt-3'>
                <FeedBack
                  resetFeedback={resetFeedback}
                  formFeedback={formFeedback}
                />{' '}
              </div>
            )}
            <div className='flex justify-end'>
              <CancelDialogButton onClick={onClose}>Cancel</CancelDialogButton>
            </div>{' '}
          </div>
        ) : (
          <ConfirmDeleteSSOAccount onClose={onClose} />
        )}
      </div>
    </DialogWrapper>
  );
}

export default DeleteSSOAccountDialog;
