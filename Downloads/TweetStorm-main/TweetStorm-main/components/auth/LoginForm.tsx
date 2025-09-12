'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { ERROR_TYPE } from '@/types/types';
import { URLS } from '@/utils/constants';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import FeedBack from '../common/FeedBack';
import { Link } from '../common/Links';
import { Input, InputLabelLarge } from '../common/form';
import InputGroup from '../common/form/InputGroup';

type Data = {
  email: string;
  password: string;
};

function LoginForm() {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });

  const params = useSearchParams();
  const error = params?.get('error');

  const [loading, setLoading] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();

  async function handleClick(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.error?.startsWith(ERROR_TYPE.EmailNotVerified)) {
        const [, publicToken] = response.error.split('_');
        window.location.href = `/email/verify/${publicToken}`;
        return;
      }
      if (response?.ok) {
        window.location.href = URLS.dashboard;
        return;
      } else if (response?.error) {
        setError(response.error);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

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
            <InputLabelLarge htmlFor='email'>Password</InputLabelLarge>
            <Input
              id='password'
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <div className='flex justify-end mt-2'>
            <Link decorated href={URLS.forgotPassword}>
              Forgot your password?
            </Link>
          </div>
        </div>
        <button
          type='submit'
          className='px-4 py-2 mt-2 block w-full cursor-pointer bg-primary border border-transparent rounded-md text-white hover:bg-primary-hover focus:outline-hidden focus:border-gray-900 focus:ring-3 focus:ring-gray-300 dark:focus:border-gray-700 disabled:opacity-25 transition'
          disabled={loading}
        >
          Login
        </button>
      </div>
      {formFeedback && (
        <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
      )}
    </form>
  );
}

export default LoginForm;
