'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { useApiKey } from '@/hooks/swr';
import { get } from '@/utils/utils';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import FeedBack from '../common/FeedBack';
import { InputLabelLarge } from '../common/form';
import { ApiKeyIcon, EyeIcon, HideIcon } from '../icons';
import CopyGeneratedContentButton from './CopyGeneratedContentButton';

export default function ApiKeyGenerationForm() {
  const {
    data: apiKeyData,
    mutate: mutateApiKey,
    isLoading: isFetchingApiKey,
  } = useApiKey();
  const [apiKey, setApiKey] = useState<string>('');
  const [loadingApiKeyGeneration, setLoadingApiKeyGeneration] =
    useState<boolean>(false);

  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [isOpen, setIsOpen] = useState<boolean>(!!formFeedback);
  const [hideApiKey, setHideApiKey] = useState<boolean>(true);

  const generateApiKey = useCallback(async () => {
    try {
      setLoadingApiKeyGeneration(true);
      const response = await get('/api/extension/api-key/generate');
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
        resetFeedback();
        mutateApiKey();
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoadingApiKeyGeneration(false);
    }
  }, [mutateApiKey, resetFeedback, setError]);

  const regenerateApiKey = useCallback(async () => {
    try {
      setLoadingApiKeyGeneration(true);
      const response = await get('/api/extension/api-key/generate');
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
        resetFeedback();
        toast.success('API key generated successfully!');
        mutateApiKey();
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoadingApiKeyGeneration(false);
    }
  }, [mutateApiKey, resetFeedback, setError]);

  const handleGenerateApiKey = async (e: FormEvent) => {
    e.preventDefault();

    if (apiKey) {
      const confirmed = window.confirm(
        'Are you sure you want to re-generate the API key? You will have to enter the new API key in the browser extension.'
      );
      if (!confirmed) return;
    }
    await regenerateApiKey();
  };

  function handleCloseForm() {
    setIsOpen(false);
  }

  const apiKeyVisible = useMemo(() => {
    if (apiKey && hideApiKey) {
      return `${apiKey.slice(0, 5)}************************`;
    } else if (apiKey && !hideApiKey) {
      return apiKey;
    }
    return '';
  }, [apiKey, hideApiKey]);

  useEffect(() => {
    if (apiKeyData?.apiKey) {
      setApiKey(`${apiKeyData.apiKey}`);
    } else if (apiKeyData && !apiKeyData.apiKey) {
      generateApiKey();
    }
  }, [apiKeyData, generateApiKey]);

  return (
    <form>
      <div className='px-4 py-5 bg-white dark:bg-primary-dark sm:p-6 shadow-sm'>
        <div className='w-full xl:w-[80%]'>
          <div className='flex items-end gap-2'>
            <ApiKeyIcon />
            <InputLabelLarge htmlFor='apiKey' className='font-bold'>
              API Key
            </InputLabelLarge>
          </div>
          <div className='flex items-end space-x-2 mt-2'>
            {isFetchingApiKey || loadingApiKeyGeneration ? (
              <div className='py-2 px-4 text-gray-600 grow rounded-md bg-gray-200 animate-pulse dark:bg-gray-700'>
                Loading...
              </div>
            ) : (
              <div className='w-full border rounded-md shadow-xs border-gray-300 dark:border-dark-mode-border relative'>
                <input
                  id='apiKey'
                  type='text'
                  className='block w-full dark:bg-primary-dark pr-12 rounded-md border-none dark:text-gray-400 text-gray-500 text-sm'
                  value={apiKeyVisible}
                  readOnly
                  disabled={true}
                />
                <button
                  type='button'
                  className='hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md cursor-pointer absolute right-0 top-0 bottom-0 flex-cc px-2'
                  onClick={() => setHideApiKey(prev => !prev)}
                >
                  {hideApiKey ? <HideIcon /> : <EyeIcon />}
                </button>
              </div>
            )}
            <CopyGeneratedContentButton content={apiKey} />
          </div>
        </div>

        {isOpen && formFeedback && (
          <div
            className={`mt-3 flex justify-between form-feedback ${
              formFeedback.type === 'error'
                ? 'bg-red-100 border-2 border-red-500'
                : 'bg-green-100 border-2 border-green-500'
            }`}
          >
            <FeedBack
              resetFeedback={resetFeedback}
              formFeedback={formFeedback}
            />{' '}
            <button
              className={`ml-2 h-0.5 cursor-pointer ${
                formFeedback.type === 'error'
                  ? 'text-red-500'
                  : 'text-green-600'
              }`}
              onClick={handleCloseForm}
            >
              x
            </button>
          </div>
        )}
      </div>
      <div className='flex-c gap-x-2 justify-end px-4 py-3 dark:bg-dark-mode-gray bg-gray-50 text-right sm:px-6 shadow-sm sm:rounded-bl-md sm:rounded-br-md'>
        <button
          type='submit'
          className='inline-flex cursor-pointer items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-hidden focus:border-gray-900 focus:ring-3 focus:ring-gray-300 disabled:opacity-25 transition'
          onClick={handleGenerateApiKey}
          disabled={loadingApiKeyGeneration}
        >
          Regenerate
        </button>
      </div>
    </form>
  );
}
