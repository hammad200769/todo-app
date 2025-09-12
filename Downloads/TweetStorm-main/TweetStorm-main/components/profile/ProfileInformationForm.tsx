'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { useUser } from '@/hooks/swr';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import FeedBack from '../common/FeedBack';
import { InputLabel } from '../common/form';
function ProfileInformationForm() {
  const [data, setData] = useState<{ name: string }>({
    name: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { formFeedback, setError, setSuccess, resetFeedback } =
    useFormFeedback();
  const { data: userData, mutate: mutateUser } = useUser();
  const user = userData?.user;

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
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({
          name: data.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        mutateUser();
        setSuccess('Profile updated.', 2000);
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

  useEffect(() => {
    if (user && user.name) {
      setData({ name: user.name });
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='px-4 py-5 bg-white dark:bg-primary-dark sm:p-6 shadow-sm'>
        <div className='grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-4'>
            <div>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <input
                id='email'
                className='block mt-1 w-full dark:bg-primary-dark text-gray-500 dark:text-gray-400 dark:border-dark-mode-border border-gray-300 focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs text-sm'
                name='email'
                value={userData?.user.email}
                disabled={true}
                autoComplete='email'
              />
            </div>
            <div className='mt-4'>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <input
                id='name'
                className='block mt-1 w-full dark:bg-primary-dark dark:text-soft-white dark:border-dark-mode-border border-gray-300 focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs text-sm'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                autoComplete='name'
              />
            </div>
          </div>
        </div>
        {formFeedback && (
          <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
        )}
      </div>
      <div className='flex-c gap-x-2 justify-end px-4 py-3 bg-gray-50 dark:bg-dark-mode-gray text-right sm:px-6 shadow-sm sm:rounded-bl-md sm:rounded-br-md'>
        <button
          type='submit'
          className='cursor-pointer inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-hidden focus:border-gray-900 focus:ring-3 focus:ring-gray-300 disabled:opacity-25 transition'
          disabled={loading}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default ProfileInformationForm;
