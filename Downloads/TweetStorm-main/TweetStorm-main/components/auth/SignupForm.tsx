'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import FeedBack from '../common/FeedBack';
import { Input, InputLabelLarge } from '../common/form';
import InputGroup from '../common/form/InputGroup';

type Data = {
  email: string;
  password: string;
};

function SignupForm() {
  const [data, setData] = useState<Data>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();

  async function handleClick(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const { token } = await response.json();
        window.location.href = `/email/verify/${token}`;
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={handleClick}>
      <div className='grid gap-y-4'>
        <InputGroup>
          <InputLabelLarge htmlFor='email'>Email</InputLabelLarge>
          <Input
            id='email'
            type='email'
            name='email'
            value={data.email}
            onChange={handleChange}
            required
            autoFocus
          />
        </InputGroup>
        <div>
          <InputGroup>
            <InputLabelLarge htmlFor='password'>Password</InputLabelLarge>
            <Input
              id='password'
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>
        <button
          type='submit'
          className='cursor-pointer px-4 py-2 mt-2 block w-full bg-primary border border-transparent rounded-md text-white hover:bg-primary-hover focus:outline-hidden focus:border-gray-900 focus:ring-3 focus:ring-gray-300 dark:focus:border-gray-700 disabled:opacity-25 transition'
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
      {formFeedback && (
        <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
      )}
    </form>
  );
}

export default SignupForm;
