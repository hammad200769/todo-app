import { useFormFeedback } from '@/hooks/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import FeedBack from '../common/FeedBack';
import { InputLabel } from '../common/form';

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: '',
};

function UpdatePasswordForm() {
  const [data, setData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmedPassword: string;
  }>(initialFormData);

  const { formFeedback, setError, setSuccess, resetFeedback } =
    useFormFeedback();
  const [loading, setLoading] = useState<boolean>(false);

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
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        body: JSON.stringify({
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmedNewPassword: data.confirmedPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setSuccess('Password updated.', 2000);
        setData(initialFormData);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-4 py-5 bg-white dark:bg-primary-dark sm:p-6 shadow-sm {{ isset($actions) ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md' }}">
        <div className='grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-4'>
            <div className='mt-4'>
              <InputLabel htmlFor='currentPassword'>
                Current Password
              </InputLabel>
              <input
                id='currentPassword'
                className='block mt-1 w-full dark:bg-primary-dark dark:text-soft-white dark:border-dark-mode-border border-gray-300 focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs'
                name='currentPassword'
                type='password'
                value={data.currentPassword}
                onChange={handleChange}
                required
                autoComplete='currentPassword'
              />
            </div>
            <div className='mt-4'>
              <InputLabel htmlFor='newPassword'>New Password</InputLabel>
              <input
                id='newPassword'
                className='block mt-1 w-full border-gray-300 dark:text-soft-white dark:bg-primary-dark dark:border-dark-mode-border focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs'
                name='newPassword'
                type='password'
                value={data.newPassword}
                onChange={handleChange}
                required
                autoComplete='newPassword'
              />
            </div>
            <div className='mt-4'>
              <InputLabel htmlFor='confirmedPassword'>
                Confirm Password
              </InputLabel>
              <input
                id='confirmedPassword'
                className='block mt-1 w-full dark:text-soft-white border-gray-300 dark:bg-primary-dark dark:border-dark-mode-border focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs'
                name='confirmedPassword'
                type='password'
                value={data.confirmedPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        {formFeedback && (
          <FeedBack resetFeedback={resetFeedback} formFeedback={formFeedback} />
        )}
      </div>
      <div className='flex items-center  dark:bg-dark-mode-gray gap-x-2 justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow-sm sm:rounded-bl-md sm:rounded-br-md'>
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

export default UpdatePasswordForm;
