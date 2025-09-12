'use client';

import { validationSchemas } from '@/api-utils/validation-schemas';
import { useFormFeedback } from '@/hooks/hooks';
import { useSubscription } from '@/hooks/swr';
import { STANDARD_TWEET_LENGTH, TWEET_GENERATION_TONE } from '@/types/types';
import { TWEET_TONES } from '@/utils/constants';
import { getTweetCost, getValidationError, post } from '@/utils/utils';
import { ChangeEvent, useState } from 'react';
import { useSWRConfig } from 'swr';
import FeedBack from '../common/FeedBack';
import GenerationHeading from '../common/GenerationHeading';
import GenerationInputContainer from '../common/GenerationInputContainer';
import GenerationTagline from '../common/GenerationTagline';
import GenerationCostAndHistory from '../private-generations/GenerationCostAndHistory';
import CheckboxFilter from './CheckBoxFilters';
import GeneratedTweetBlock from './GeneratedTweetBlock';
import Keywords from './Keywords';
import TweetIdeasButton from './TweetIdeasButton';
import TweetLengthFilters from './TweetLengthFilters';
import SentimentFilters from './TweetSentimentFilters';

function TweetGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const [textToGenerate, setTextToGenerate] = useState<string>('');
  const [standardTweetLength, setStandardTweetLength] =
    useState<STANDARD_TWEET_LENGTH>(STANDARD_TWEET_LENGTH.Short);
  const [tone, setTone] = useState<TWEET_GENERATION_TONE>(
    TWEET_GENERATION_TONE['No-Tone']
  );
  const [keywords, setKeywords] = useState<string>('');
  const [includeHashtags, setIncludeHashtags] = useState<boolean>(false);
  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;

  const { mutate } = useSWRConfig();

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingGeneration(true);
      const keywordsArray = keywords
        .trim()
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword !== '');
      const data = {
        promptedText,
        includeEmojis,
        includeHashtags,
        tone,
        keywords: keywordsArray,
      };
      const requestPayload = {
        userInput: data,
        tweetLength: standardTweetLength,
      };
      const validationError = getValidationError(
        requestPayload,
        validationSchemas.tweetGeneration
      );
      if (validationError) {
        setError(validationError);
        return;
      }
      const response = await post('/api/tweets', requestPayload);
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
                count:
                  currentCredits.credits.count -
                  getTweetCost(standardTweetLength),
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
    } catch (err) {
      alert(err);
    } finally {
      setLoadingGeneration(false);
    }
  }

  function handleTweetLengthChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setStandardTweetLength(e.target.value as STANDARD_TWEET_LENGTH);
  }
  function handleToneChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTone(e.target.value as TWEET_GENERATION_TONE);
  }

  return (
    <>
      <GenerationHeading text='Tweet Generator' />
      <GenerationTagline text='Write below what you want to tweet about, and let the magic happen' />

      <div className='mt-10 mx-auto grid items-start gap-x-4'>
        <div className='max-w-xl space-y-4 mx-auto w-full'>
          <div>
            <div className='flex justify-between items-end mb-2'>
              <GenerationCostAndHistory
                creditsCost={getTweetCost(standardTweetLength)}
              />
            </div>
            <div className='relative'>
              <GenerationInputContainer
                generateButtonText='Generate Tweet'
                inputPlaceholder='Enter tweet prompt'
                handleGeneration={handleGeneration}
                isLoading={loadingGeneration}
                textToGenerate={textToGenerate}
                setTextToGenerate={setTextToGenerate}
                isError={formFeedback?.type === 'error'}
              />
              <div className='absolute top-1 right-1'>
                <TweetIdeasButton />
              </div>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='flex gap-3 xs:flex-row flex-col'>
              <SentimentFilters
                disable={false}
                onChange={handleToneChange}
                standardTone={tone}
                tones={TWEET_TONES}
              />
              <Keywords
                disable={false}
                keywords={keywords}
                setKeywords={setKeywords}
              />
            </div>

            <div className='flex items-end gap-5 flex-wrap'>
              {subscription && (
                <TweetLengthFilters
                  onChange={handleTweetLengthChange}
                  standardTweetLength={standardTweetLength}
                />
              )}
              <div className='flex items-center gap-4'>
                <CheckboxFilter
                  onChange={() => setIncludeHashtags(!includeHashtags)}
                  label='Include hashtags'
                  isChecked={includeHashtags}
                />
                <CheckboxFilter
                  onChange={() => setIncludeEmojis(!includeEmojis)}
                  label='Include Emojis'
                  isChecked={includeEmojis}
                />
              </div>
            </div>
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
      {generatedContent && <GeneratedTweetBlock content={generatedContent} />}
    </>
  );
}

export default TweetGeneratorSection;
