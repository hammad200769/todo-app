import { useFormFeedback } from '@/hooks/hooks';
import { ERROR_TYPE } from '@/types/types';
import { stopClickPropagation } from '@/utils/utils';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import DialogWrapper from '../common/DialogBackground';
import FeedBack from '../common/FeedBack';
import {
  CancelDialogButton,
  DangerButton,
  DialogHeader,
} from '../common/dialog';

type DeleteAccountDialogProps = {
  onClose: () => void;
};

function DeleteAccountDialog({ onClose }: DeleteAccountDialogProps) {
  const [password, setPassword] = useState<string>('');
  const { formFeedback, setError, resetFeedback } = useFormFeedback();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await fetch('/api/account', {
        method: 'DELETE',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        await signOut({ redirect: false });
        router.push('/');
      } else {
        const data = await response.json();
        if (data.error.type === ERROR_TYPE.ValidationError) {
          setError(data.error.message);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <DialogWrapper onClick={onClose}>
      <div
        className='mb-6 bg-white dark:bg-dark-mode-gray  rounded-lg shadow-xl transform transition-all max-w-[672px] mx-auto'
        onClick={stopClickPropagation}
      >
        <DialogHeader
          onCloseButtonClick={onClose}
          type='danger'
          heading='Are you sure you want to delete your account?'
        />
        <div className='px-6 mt-6'>
          <p className='mt-2'>
            <span className='font-bold text-danger'>Notice:</span> After you
            delete your account, we will keep your data for 90 days, after which
            it will be permanently removed. You can reactivate your account
            within 90 days by sending us an email at{' '}
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}. However, your subscription
            will be cancelled immediately on account deletion.
          </p>
          <input
            className='block mt-3 w-full border-gray-300 dark:border-dark-mode-border dark:bg-primary-dark dark:text-white focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs mb-1'
            placeholder='Enter password'
            name='password'
            type='password'
            value={password}
            onChange={handleChange}
            required
          />
          {formFeedback && (
            <FeedBack
              resetFeedback={resetFeedback}
              formFeedback={formFeedback}
            />
          )}
        </div>

        <div className='flex gap-x-3 justify-end px-6 pt-2 pb-4'>
          <CancelDialogButton onClick={onClose}>Cancel</CancelDialogButton>
          <DangerButton onClick={handleSubmit} disabled={loading}>
            Delete Account
          </DangerButton>
        </div>
      </div>
    </DialogWrapper>
  );
}

export default DeleteAccountDialog;
