'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { FormEvent, useState } from 'react';
import FeedBack from '../common/FeedBack';
import { Input, InputLabel } from '../common/form';
import InputGroup from '../common/form/InputGroup';

function ForgotPasswordForm() {
  const { resetFeedback, formFeedback, setError, setSuccess } =
    useFormFeedback();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/password/forgot', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setSuccess(
          'A password reset link has been sent to the email address you provided.'
        );
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
      setEmail('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-4'>
        <InputGroup>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <Input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='text-center cursor-pointer w-full px-4 py-2 bg-primary border border-transparent rounded-md text-white hover:bg-primary-hover disabled:opacity-25 transition'
            disabled={loading}
          >
            Send Reset Instructions
          </button>
        </div>

        {formFeedback && (
          <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
        )}
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
