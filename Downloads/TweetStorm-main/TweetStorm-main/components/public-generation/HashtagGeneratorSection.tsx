'use client';
import { useFormFeedback } from '@/hooks/hooks';
import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import FeedBack from '../common/FeedBack';
import GeneratedContentBlock from './GeneratedContentBlock';
import GeneratedContentPlaceholder from './GeneratedContentPlaceholder';
import GenerationInputContainer from './GenerationInputContainer';
import GenerationLimitDialog from './GenerationLimitDialog';

function HashtagGeneratorSection() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showGenerationLimitDialog, setShowGenerationLimitDialog] =
    useState<boolean>(false);
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const [textPrompt, setTextPrompt] = useState<string>('');

  const { formFeedback, setError, resetFeedback } = useFormFeedback();

  function closeGenerationLimitDialog() {
    setShowGenerationLimitDialog(false);
  }

  async function handleGeneration(promptedText: string) {
    try {
      setLoadingGeneration(true);
      const requestPayload = {
        promptedText,
      };
      if (requestPayload.promptedText.length === 0) {
        setError('Prompt cannot be empty');
        return;
      }

      const response = await fetch('/api/public-generations/hashtags', {
        method: 'POST',
        body: JSON.stringify(requestPayload),
        headers: {
          'Content-Type': 'application/json',
        },
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
      setLoadingGeneration(false);
    }
  }

  return (
    <>
      <div className='grid justify-items-center xl:justify-start xl:grid-cols-2 gap-8 relative'>
        <div className='max-w-xl relative w-full'>
          <GenerationInputContainer
            handleGeneration={handleGeneration}
            generateButtonText='Generate Hashtags'
            isError={formFeedback?.type === 'error'}
            inputPlaceholder='Example: A travel blog post about a recent trip to Paris.'
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

        {generatedContent && !loadingGeneration ? (
          <div className='max-w-xl relative w-full'>
            <GeneratedContentBlock
              content={generatedContent}
              twitterPostUrl={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                generatedContent
              )}`}
              postButtonText='Tweet this'
            />
          </div>
        ) : (
          <div className='max-w-xl relative w-full'>
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

export default HashtagGeneratorSection;
