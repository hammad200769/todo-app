import { FormEvent, useState } from 'react';

type CopyGeneratedContentButtonProps = {
  content: string;
};

function CopyGeneratedContentButton({
  content,
}: CopyGeneratedContentButtonProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  function handleClick(e: FormEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(content);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }

  return (
    <div className='relative'>
      {showTooltip && (
        <div className='absolute top-0 bg-black text-white text-[13px] translate-y-[-120%] rounded-md w-fit px-2 py-1 dark:bg-white dark:text-primary-dark'>
          Copied!
        </div>
      )}
      <button
        className={`cursor-pointer inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-hidden focus:border-gray-900 focus:ring-3 focus:ring-gray-300 disabled:opacity-25 transition ${
          content ? '' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={handleClick}
      >
        Copy
      </button>
    </div>
  );
}

export default CopyGeneratedContentButton;
