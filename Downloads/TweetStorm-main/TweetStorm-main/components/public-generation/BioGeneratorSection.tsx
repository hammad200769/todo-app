'use client';
import { useFormFeedback } from '@/hooks/hooks';
import { BIO_GENERATION_TYPE, TWEET_GENERATION_TONE } from '@/types/types';
import { BIO_TONES } from '@/utils/constants';
import { post } from '@/utils/utils';
import { ChangeEvent, useState } from 'react';
import TypeFilter from '../bio-generator/TypeFilter';
import DialogDisplayer from '../common/DialogDisplayer';
import FeedBack from '../common/FeedBack';
import CheckboxFilter from '../tweet-generator/CheckBoxFilters';
import Keywords from '../tweet-generator/Keywords';
import SentimentFilters from '../tweet-generator/TweetSentimentFilters';
import GeneratedContentBlock from './GeneratedContentBlock';
import GeneratedContentPlaceholder from './GeneratedContentPlaceholder';
import GenerationInputContainer from './GenerationInputContainer';
import GenerationLimitDialog from './GenerationLimitDialog';

function BioGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showGenerationLimitDialog, setShowGenerationLimitDialog] =
    useState<boolean>(false);
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);

  const { formFeedback, setError, resetFeedback } = useFormFeedback();
  const [tone, setTone] = useState<TWEET_GENERATION_TONE>(
    TWEET_GENERATION_TONE['No-Tone']
  );
  const [type, setBioType] = useState<BIO_GENERATION_TYPE>(
    BIO_GENERATION_TYPE.Person
  );
  const [keywords, setKeywords] = useState<string>('');

  const [textPrompt, setTextPrompt] = useState<string>('');

  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  function closeGenerationLimitDialog() {
    setShowGenerationLimitDialog(false);
  }

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingGeneration(true);
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

      if (userInput.promptedText.length === 0) {
        setError('Prompt cannot be empty');
        return;
      }

      const response = await post('/api/public-generations/bio', { userInput });
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
      setLoadingGeneration(false);
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
      <div className='flex lg:flex-row md:flex-col flex-col gap-2 justify-center items-start'>
        <div className='flex flex-col max-w-xl w-full'>
          <div className='max-w-xl relative w-full'>
            <GenerationInputContainer
              handleGeneration={handleGeneration}
              generateButtonText='Generate Bio'
              isError={formFeedback?.type === 'error'}
              inputPlaceholder='Example: A travel blogger who explores different cultures and destinations.'
              isLoading={loadingGeneration}
              textPrompt={textPrompt}
              setTextPrompt={setTextPrompt}
            />
            {formFeedback && (
              <FeedBack
                resetFeedback={resetFeedback}
                formFeedback={formFeedback}
              />
            )}
          </div>
          <div className='flex flex-col space-y-3 mt-4'>
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
        </div>
        {generatedContent && !loadingGeneration ? (
          <div className='max-w-xl relative w-full lg:ml-6 lg:mt-0 mt-5'>
            <GeneratedContentBlock
              content={generatedContent}
              twitterPostUrl={`https://twitter.com/settings/profile`}
              postButtonText='Change my bio'
            />
          </div>
        ) : (
          <div className='max-w-xl relative w-full lg:ml-6 lg:mt-0 mt-5'>
            <GeneratedContentPlaceholder
              isGenerationLoading={loadingGeneration}
            />
          </div>
        )}
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

export default BioGeneratorSection;
