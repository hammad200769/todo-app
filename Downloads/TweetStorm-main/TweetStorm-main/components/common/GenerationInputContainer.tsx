import { useCredits } from '@/hooks/swr';
import clsx from 'clsx';
import GenerateButton from './GenerateButton';
import GenerationTextArea from './GenerationTextArea';
import SubscribeForMoreCreditsLink from './SubscribeForMoreCreditsLink';

type GenerationInputContainerProps = {
  generateButtonText: string;
  inputPlaceholder: string;
  handleGeneration: (tweetText: string) => void;
  isError?: boolean;
  isLoading: boolean;
  textToGenerate: string;
  setTextToGenerate: React.Dispatch<React.SetStateAction<string>>;
};

function GenerationInputContainer({
  handleGeneration,
  inputPlaceholder,
  generateButtonText,
  isError = false,
  isLoading,
  textToGenerate,
  setTextToGenerate,
}: GenerationInputContainerProps) {
  const { data: creditsData } = useCredits();
  const credits = creditsData?.credits;

  function handleGenerateButtonClick() {
    handleGeneration(textToGenerate);
  }

  return (
    <div className='relative'>
      <div
        className={clsx(
          'overflow-hidden rounded-lg shadow-xs ring-[2px] transition-all focus-within:ring-[4px] hover:ring-[4px]',
          isError
            ? 'focus-within:ring-danger/60 focus-within:border-danger/60 ring-danger/60'
            : 'focus-within:ring-primary focus-within:border-primring-primary-twitter ring-primary'
        )}
      >
        <GenerationTextArea
          onChange={setTextToGenerate}
          value={textToGenerate}
          placeholder={inputPlaceholder}
          className='pr-8'
        />
        <div className='h-16'></div>
      </div>

      <div className='absolute inset-x-0 bottom-0 block w-full justify-between py-2 pr-2 pl-3'>
        <div className='shrink-0'>
          {credits && credits.count > 0 && (
            <GenerateButton
              handleClick={handleGenerateButtonClick}
              isLoading={isLoading}
            >
              {generateButtonText}
            </GenerateButton>
          )}
          {credits && credits.count <= 0 && <SubscribeForMoreCreditsLink />}
        </div>
      </div>
    </div>
  );
}

export default GenerationInputContainer;
