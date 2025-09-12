import { useFormFeedback } from '@/hooks/hooks';
import { deleteReq } from '@/utils/utils';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { CancelDialogButton, DangerButton } from '../common/dialog';
import FeedBack from '../common/FeedBack';
import OTPField from '../common/OTPField';

type ConfirmDeleteSSOAccountProps = {
  onClose: VoidFunction;
};

function ConfirmDeleteSSOAccount({ onClose }: ConfirmDeleteSSOAccountProps) {
  const [otp, setOtp] = useState<string>('');
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    resetFeedback();
    try {
      setLoading(true);
      const response = await deleteReq('/api/account/sso-user', {
        verificationCode: parseInt(otp),
      });
      if (response.ok) {
        await signOut({ callbackUrl: '/' });
      } else {
        const data = await response.json();
        if (data.error.type === 'validation-error') {
          setError(data.error.data[0].message);
        } else {
          setError(data.error.message);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mt-6 space-y-4'>
      <div className='px-6 space-y-2'>
        <p className='leading-snug'>
          Enter the 6 digit code sent to your email to delete your account
        </p>
        <div className='w-fit'>
          <OTPField otp={otp} setOtp={setOtp} />
        </div>
        {formFeedback && (
          <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
        )}
      </div>

      <div className='flex gap-x-3 justify-end px-6 pb-6'>
        <DangerButton onClick={handleDelete} disabled={loading}>
          Delete
        </DangerButton>
        <CancelDialogButton onClick={onClose}>Cancel</CancelDialogButton>
      </div>
    </div>
  );
}

export default ConfirmDeleteSSOAccount;
