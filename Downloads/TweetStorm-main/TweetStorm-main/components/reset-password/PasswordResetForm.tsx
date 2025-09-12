'use client';

import { FormFeedback } from '@/types/types';
import { URLS } from '@/utils/constants';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormError from '../common/FormError';
import FormSuccess from '../common/FormSuccess';
import { Input, InputLabelLarge } from '../common/form';
import InputGroup from '../common/form/InputGroup';

function PasswordResetForm({ email }: { email: string }) {
  const [data, setData] = useState<{
    email: string;
    password: string;
    confirmedPassword: string;
  }>({ email, password: '', confirmedPassword: '' });

  const [formFeedback, setFormFeedback] = useState<FormFeedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathParams = useParams()!;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await fetch('/api/password/reset', {
        method: 'PUT',
        body: JSON.stringify({
          token: pathParams.token,
          password: data.password,
          confirmedPassword: data.confirmedPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setFormFeedback({
          type: 'success',
          message: 'Your password has been reset. Redirecting to login page.',
        });
        setTimeout(() => router.replace(URLS.login), 2000);
      } else {
        const data = await response.json();
        setFormFeedback({ type: 'error', message: data.error.message });
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={clsx(!!formFeedback && 'mb-4')}>
        {formFeedback && formFeedback.type === 'error' && (
          <FormError text={formFeedback.message} />
        )}
        {formFeedback && formFeedback.type === 'success' && (
          <FormSuccess text={formFeedback.message} />
        )}
      </div>
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
        <InputGroup>
          <InputLabelLarge htmlFor='password'>New Password</InputLabelLarge>
          <Input
            id='password'
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            required
            autoFocus
          />
        </InputGroup>
        <InputGroup>
          <InputLabelLarge htmlFor='confirmedPassword'>
            Confirm Password
          </InputLabelLarge>
          <Input
            id='confirmedPassword'
            name='confirmedPassword'
            type='password'
            value={data.confirmedPassword}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <button
          type='submit'
          className='cursor-pointer text-center w-full text-sm px-4 py-2 bg-primary border border-transparent rounded-md text-white hover:bg-primary-hover disabled:opacity-25 transition'
          disabled={loading}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}

export default PasswordResetForm;
