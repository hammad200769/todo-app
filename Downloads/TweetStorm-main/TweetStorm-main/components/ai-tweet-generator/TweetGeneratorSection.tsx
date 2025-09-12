'use client';
import { useFormFeedback } from '@/hooks/hooks';
import { TWEET_GENERATION_TONE } from '@/types/types';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  FIREFOX_TWEET_GENERATOR_EXTENSION_LINK,
  TWEET_TONES,
} from '@/utils/constants';
import { post } from '@/utils/utils';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import FeedBack from '../common/FeedBack';
import { ChromeIconColorFull } from '../icons';
import { FirefoxIconColorFull } from '../icons/FirefoxIconColorFull';
import GenerationInputContainer from '../public-generation/GenerationInputContainer';
import GenerationLimitDialog from '../public-generation/GenerationLimitDialog';
import GenerationSubtitle from '../public-generation/GenerationSubtitle';
import GenerationTitle from '../public-generation/GenerationTitle';
import TweetIdeasButton from '../public-generation/TweetIdeasButton';
import CheckboxFilter from '../tweet-generator/CheckBoxFilters';
import Keywords from '../tweet-generator/Keywords';
import SentimentFilters from '../tweet-generator/TweetSentimentFilters';
import GeneratedTweetBlock from './GeneratedTweetBlock';
import GeneratedTweetPlaceholder from './GeneratedTweetPlaceholder';

function TweetGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showGenerationLimitDialog, setShowGenerationLimitDialog] =
    useState<boolean>(false);
  const [loadingTweetGeneration, setLoadingTweetGeneration] =
    useState<boolean>(false);
  const [tone, setTone] = useState<TWEET_GENERATION_TONE>(
    TWEET_GENERATION_TONE['No-Tone']
  );
  const [keywords, setKeywords] = useState<string>('');
  const [textPrompt, setTextPrompt] = useState<string>('');

  const [includeHashtags, setIncludeHashtags] = useState<boolean>(false);
  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  const { formFeedback, setError, resetFeedback } = useFormFeedback();

  function closeGenerationLimitDialog() {
    setShowGenerationLimitDialog(false);
  }

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingTweetGeneration(true);
      const keywordsArray = keywords
        .trim()
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword !== '');
      const userInput = {
        promptedText,
        includeEmojis,
        includeHashtags,
        tone,
        keywords: keywordsArray,
      };

      if (userInput.promptedText.length === 0) {
        setError('Prompt cannot be empty');
      }
      const response = await post('/api/public-generations/tweets', {
        userInput,
      });
      if (response.ok) {
        const { data } = await response.json();
        setGeneratedContent(data);
        resetFeedback();
      } else {
        const data = await response.json();
        if (data.error.type === 'limit-reached') {
          setShowGenerationLimitDialog(true);
        } else {
          setError(data.error.message);
        }
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoadingTweetGeneration(false);
    }
  }

  function handleToneChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTone(e.target.value as TWEET_GENERATION_TONE);
  }

  return (
    <>
      <div className='grid gap-20 items-center max-w-6xl mx-auto pt-4'>
        <div>
          <div className='text-center'>
            <GenerationTitle>AI Tweet Generator</GenerationTitle>
            <GenerationSubtitle>
              Generate tweets and replies in seconds with AI
            </GenerationSubtitle>
            <div className='gap-x-8 mt-10'>
              <p className='italic'>Available as Browser Extension</p>
              <div className='flex-c justify-center gap-x-4 mt-2'>
                <Link
                  href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                  target='_blank'
                  className='text-[#0070bc] dark:text-primary-light flex-cb gap-2 hover:scale-[102%] transition-transform'
                >
                  <ChromeIconColorFull width='2.4em' height='2.4em' />
                  <button className='rounded-md text-sm font-medium cursor-pointer'>
                    Install
                  </button>
                </Link>
                <Link
                  href={FIREFOX_TWEET_GENERATOR_EXTENSION_LINK}
                  target='_blank'
                  className='text-[#0070bc] dark:text-primary-light flex-cb gap-2 hover:scale-[102%] transition-transform'
                >
                  <FirefoxIconColorFull width='2.4em' height='2.4em' />
                  <button className='rounded-md text-sm font-medium cursor-pointer'>
                    Install
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='mt-16'>
            <div className='flex lg:flex-row flex-col gap-2 justify-center lg:items-start items-center'>
              <div className='flex flex-col gap-5 items-center w-full'>
                <div className='max-w-xl relative w-full'>
                  <GenerationInputContainer
                    handleGeneration={handleGeneration}
                    generateButtonText='Generate Tweet'
                    isError={formFeedback?.type === 'error'}
                    inputPlaceholder='Enter your tweet prompt here...'
                    isLoading={loadingTweetGeneration}
                    textPrompt={textPrompt}
                    setTextPrompt={setTextPrompt}
                  />
                  {formFeedback && (
                    <FeedBack
                      resetFeedback={resetFeedback}
                      formFeedback={formFeedback}
                    />
                  )}
                  <div className='absolute top-1 right-1'>
                    <TweetIdeasButton />
                  </div>
                </div>
                <div className='space-y-4 w-full max-w-xl'>
                  <div className='flex gap-2 items-center'>
                    <SentimentFilters
                      tones={TWEET_TONES}
                      onChange={handleToneChange}
                      standardTone={tone}
                    />
                    <span className='w-full'>
                      <Keywords keywords={keywords} setKeywords={setKeywords} />
                    </span>
                  </div>
                  <div className='flex-c gap-4'>
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
              {generatedContent && !loadingTweetGeneration ? (
                <div className='max-w-xl relative w-full lg:ml-6 lg:mt-0 mt-5'>
                  <GeneratedTweetBlock
                    content={generatedContent}
                    postButtonText='Tweet this'
                    twitterPostUrl={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      generatedContent
                    )}`}
                  />
                </div>
              ) : (
                <div className='max-w-xl relative w-full lg:ml-6 lg:mt-0 mt-5'>
                  <GeneratedTweetPlaceholder
                    isGenerationLoading={loadingTweetGeneration}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DialogDisplayer
        showDialog={showGenerationLimitDialog}
        dialogComponent={
          <GenerationLimitDialog onClose={closeGenerationLimitDialog} />
        }
      />
    </>
  );
}

export default TweetGeneratorSection;
