'use client';

import { useFormFeedback } from '@/hooks/hooks';
import { BIO_GENERATION_TYPE, TWEET_GENERATION_TONE } from '@/types/types';
import { BIO_TONES } from '@/utils/constants';
import { post } from '@/utils/utils';
import { ChangeEvent, useState } from 'react';
import { useSWRConfig } from 'swr';
import FeedBack from '../common/FeedBack';
import GenerationHeading from '../common/GenerationHeading';
import GenerationInputContainer from '../common/GenerationInputContainer';
import GenerationTagline from '../common/GenerationTagline';
import GenerationCostAndHistory from '../private-generations/GenerationCostAndHistory';
import CheckboxFilter from '../tweet-generator/CheckBoxFilters';
import Keywords from '../tweet-generator/Keywords';
import SentimentFilters from '../tweet-generator/TweetSentimentFilters';
import GeneratedBioBlock from './GeneratedBioBlock';
import TypeFilter from './TypeFilter';

function BioGeneratorSection() {
  const [generatedBio, setGeneratedBio] = useState<string>('');
  const [loadingBioGeneration, setLoadingBioGeneration] =
    useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [tone, setTone] = useState<TWEET_GENERATION_TONE>(
    TWEET_GENERATION_TONE['No-Tone']
  );
  const [textToGenerate, setTextToGenerate] = useState<string>('');
  const [type, setBioType] = useState<BIO_GENERATION_TYPE>(
    BIO_GENERATION_TYPE.Person
  );
  const [keywords, setKeywords] = useState<string>('');
  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  async function handleBioGeneration(promptedText: string) {
    try {
      setLoadingBioGeneration(true);
      const keywordsArray = keywords
        .trim()
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword !== '');
      const userInput = {
        promptedText,
        includeEmojis,
        tone,
        keywords: keywordsArray,
        type,
      };
      const response = await post('/api/bio', { userInput });
      if (response.ok) {
        const { data } = await response.json();
        setGeneratedBio(data);
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
    } catch (e) {
      alert(e);
    } finally {
      setLoadingBioGeneration(false);
    }
  }
  function handleToneChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTone(e.target.value as TWEET_GENERATION_TONE);
  }
  function handleBioTypeChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setBioType(e.target.value as BIO_GENERATION_TYPE);
  }
  return (
    <>
      <GenerationHeading text='Bio Generator' />
      <GenerationTagline text="Tell us about yourself and we'll write you an awesome bio" />

      <div className='mx-auto mt-10 flex max-w-xl items-start space-x-4'>
        <div className='min-w-0 flex-1'>
          <div className='flex justify-between items-end mb-2'>
            <GenerationCostAndHistory creditsCost={1} />
          </div>

          <GenerationInputContainer
            generateButtonText='Generate Bio'
            inputPlaceholder='Example: A professional bio for a marketing manager with 5 years of experience in digital marketing.'
            handleGeneration={handleBioGeneration}
            isLoading={loadingBioGeneration}
            textToGenerate={textToGenerate}
            setTextToGenerate={setTextToGenerate}
          />

          <div className='flex flex-col space-y-3 mt-5'>
            <div className='flex flex-wrap gap-4 items-end'>
              <SentimentFilters
                tones={BIO_TONES}
                onChange={handleToneChange}
                standardTone={tone}
              />
              <TypeFilter standardType={type} onChange={handleBioTypeChange} />
              <CheckboxFilter
                onChange={() => setIncludeEmojis(!includeEmojis)}
                label='Include Emojis'
                isChecked={includeEmojis}
              />
            </div>
            <Keywords keywords={keywords} setKeywords={setKeywords} />
          </div>
          {formFeedback && (
            <div className='col-start-2 text-left mt-2'>
              <FeedBack
                resetFeedback={resetFeedback}
                formFeedback={formFeedback}
              />
            </div>
          )}
        </div>
      </div>
      {generatedBio && <GeneratedBioBlock content={generatedBio} />}
    </>
  );
}

export default BioGeneratorSection;
