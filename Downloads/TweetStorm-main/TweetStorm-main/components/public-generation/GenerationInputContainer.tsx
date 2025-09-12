import { MAX_TEXT_TO_GENERATE_LENGTH } from '@/utils/constants';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import GenerateButton from './GenerateButton';

type GenerationInputContainerProps = {
  generateButtonText: string;
  inputPlaceholder: string;
  handleGeneration: (tweetText: string) => void;
  isError: boolean;
  isLoading: boolean;
  textPrompt: string;
  setTextPrompt: Dispatch<SetStateAction<string>>;
};

function GenerationInputContainer({
  handleGeneration,
  inputPlaceholder,
  generateButtonText,
  isError,
  isLoading,
  textPrompt,
  setTextPrompt,
}: GenerationInputContainerProps) {
  function handleGenerateButtonClick() {
    handleGeneration(textPrompt);
  }

  return (
    <div className='relative'>
      <div
        className={clsx(
          'overflow-hidden rounded-lg shadow-xs ring-2 transition-all focus-within:ring-1 hover:ring-4',
          isError
            ? 'focus-within:ring-danger/60 focus-within:border-danger/60 ring-danger/60'
            : 'focus-within:ring-primary focus-within:border-primary ring-primary'
        )}
      >
        <form>
          <textarea
            rows={5}
            id='comment'
            autoComplete='off'
            className='block text-primary-dark dark:text-soft-white w-full bg-inherit focus:border-0 resize-none border-0 py-3 focus:ring-0 sm:text-sm placeholder:text-gray-500'
            placeholder={inputPlaceholder}
            name='tweet'
            value={textPrompt}
            onChange={e => setTextPrompt(e.target.value)}
            autoFocus={true}
            maxLength={MAX_TEXT_TO_GENERATE_LENGTH}
          />
        </form>

        <div className='h-16'></div>
      </div>
      <div className='absolute inset-x-0 bottom-0 block py-2 pr-2 pl-3'>
        <GenerateButton
          onClick={handleGenerateButtonClick}
          isLoading={isLoading}
        >
          {generateButtonText}
        </GenerateButton>
      </div>
    </div>
  );
}

export default GenerationInputContainer;
