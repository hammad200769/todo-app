'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { URLS } from '@/utils/constants';
import { post } from '@/utils/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import FeedBack from '../common/FeedBack';
import GenerationHeading from '../common/GenerationHeading';
import GenerationInputContainer from '../common/GenerationInputContainer';
import GenerationTagline from '../common/GenerationTagline';
import GeneratedHandlesBlock from './GeneratedHandlesBlock';

function TwitterHandleGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [textToGenerate, setTextToGenerate] = useState<string>('');

  const { mutate } = useSWRConfig();

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingGeneration(true);
      const response = await post('/api/handles', { promptedText });
      if (response.ok) {
        const { data } = await response.json();
        setGeneratedContent(data);
        resetFeedback();
        mutate(
          '/api/user/credits',
          (currentCredits: { credits: { count: number } } | undefined) => {
            if (!currentCredits) return { credits: { count: 0 } };
            return {
              credits: {
                count: currentCredits.credits.count - 1,
              },
            };
          },
          false
        );
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
      mutate('/api/user/credits');
      mutate((key: string) => {
        return key.startsWith('/api/user/generations?page');
      }, undefined);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingGeneration(false);
    }
  }

  return (
    <>
      <GenerationHeading text='Handle Generator' />
      <GenerationTagline text="Write the topic on which to generate handles, and we'll generate 5 twitter handles for you" />

      <div className='mx-auto mt-10 flex max-w-xl items-start space-x-4'>
        <div className='min-w-0 flex-1'>
          <GenerationInputContainer
            generateButtonText='Generate Handles'
            inputPlaceholder='Example: A fitness junkie motivating others with workout routines.'
            handleGeneration={handleGeneration}
            isLoading={loadingGeneration}
            textToGenerate={textToGenerate}
            setTextToGenerate={setTextToGenerate}
          />
          {formFeedback && (
            <div className='mx-auto max-w-xl pt-1'>
              <FeedBack
                resetFeedback={resetFeedback}
                formFeedback={formFeedback}
              />
            </div>
          )}
          <div className='flex justify-between items-end mb-2'>
            <div className='flex items-center lg:justify-between mt-2 w-full'>
              <p className='text-sm text-yellow-600 italic'>
                Cost: 1 Credit (You&apos;ll get 5 handles each time)
              </p>
              <Link
                className='block text-right text-sm italic underline hover:text-primary-dark'
                href={URLS.myGenerations}
              >
                All my generations
              </Link>
            </div>
          </div>
        </div>
      </div>
      {generatedContent && <GeneratedHandlesBlock content={generatedContent} />}
    </>
  );
}

export default TwitterHandleGeneratorSection;
