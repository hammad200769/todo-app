'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { post } from '@/utils/utils';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import FeedBack from '../common/FeedBack';
import GenerationHeading from '../common/GenerationHeading';
import GenerationInputContainer from '../common/GenerationInputContainer';
import GenerationTagline from '../common/GenerationTagline';
import GenerationCostAndHistory from '../private-generations/GenerationCostAndHistory';
import GeneratedHashtagsBlock from './GeneratedHashtagsBlock';

function HashtagGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [textToGenerate, setTextToGenerate] = useState<string>('');
  const { mutate } = useSWRConfig();

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingGeneration(true);
      const response = await post('/api/hashtags', { promptedText });
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
      <GenerationHeading text='Hashtag Generator' />
      <GenerationTagline text='Enter any topic, and get a list of the best hashtags' />

      <div className='mx-auto mt-10 flex max-w-xl items-start space-x-4'>
        <div className='min-w-0 flex-1'>
          <GenerationInputContainer
            inputPlaceholder='Example: Promoting an upcoming virtual conference on digital marketing.'
            generateButtonText='Generate Hashtags'
            handleGeneration={handleGeneration}
            isLoading={loadingGeneration}
            textToGenerate={textToGenerate}
            setTextToGenerate={setTextToGenerate}
          />
          {formFeedback && (
            <div className='col-start-2 text-left mt-2'>
              <FeedBack
                resetFeedback={resetFeedback}
                formFeedback={formFeedback}
              />
            </div>
          )}
          <div className='flex justify-between items-end mb-2'>
            <GenerationCostAndHistory creditsCost={1} />
          </div>
        </div>
      </div>
      {generatedContent && (
        <GeneratedHashtagsBlock content={generatedContent} />
      )}
    </>
  );
}

export default HashtagGeneratorSection;
