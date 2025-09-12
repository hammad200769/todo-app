'use client';
import { post } from '@/utils/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { InputLabel } from '../common/form';

function ContactForm() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await post('/api/contact-us', formData);
      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        setFormData({ subject: '', message: '' });
      } else {
        const data = await response.json();
        toast.error(data.error.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh]  p-4'>
      <div className='w-full max-w-3xl p-8 space-y-8 bg-white dark:bg-primary-dark rounded-lg shadow-lg'>
        <div className='text-center'>
          <h1 className='text-4xl  font-extrabold text-black mb-2'>
            Get in Touch!
          </h1>
          <p className='text-gray-600 dark:text-gray-300 text-base'>
            If you are facing any issue or have any suggestion for us. We would
            love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <InputLabel htmlFor='subject'>Subject</InputLabel>
            <input
              type='text'
              id='subject'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              required
              maxLength={500}
              className='block mt-1 w-full dark:bg-primary-dark text-gray-700 dark:text-gray-300 dark:border-dark-mode-border border-gray-300 focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs text-sm'
            />
          </div>

          <div>
            <InputLabel htmlFor='message'>Message</InputLabel>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={2500}
              rows={6}
              className='block mt-1 w-full dark:bg-primary-dark text-gray-700 dark:text-gray-300 dark:border-dark-mode-border border-gray-300 focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-xs text-sm'
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='w-full px-6 py-3 text-base cursor-pointer font-medium text-white bg-primary rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <svg
                    className='animate-spin h-5 w-5 mr-3 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
