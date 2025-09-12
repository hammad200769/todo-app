'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { useState } from 'react';
import FeedBack from '../common/FeedBack';

function ResendVerificationEmailBlock({ token }: { token: string }) {
  const { formFeedback, setError, setSuccess, resetFeedback } =
    useFormFeedback();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    try {
      setLoading(true);
      const response = await fetch('/api/email/verify', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setSuccess(
          'A new verification link has been sent to the email address you provided.'
        );
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
      {formFeedback && (
        <div className='mb-3'>
          <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
        </div>
      )}

      <button
        type='submit'
        className='text-center cursor-pointer text-sm px-4 py-2 bg-primary border border-transparent rounded-md text-white hover:bg-primary-hover disabled:opacity-25 transition'
        onClick={handleClick}
        disabled={loading}
      >
        Resend Email
      </button>
    </>
  );
}

export default ResendVerificationEmailBlock;
