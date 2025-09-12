import { useState } from 'react';

type CopyGeneratedContentButtonProps = {
  content: string;
};

function CopyGeneratedContentButton({
  content,
}: CopyGeneratedContentButtonProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  function handleClick() {
    navigator.clipboard.writeText(content);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }

  return (
    <div className='relative'>
      {showTooltip && (
        <div className='absolute top-0 bg-black text-white text-[13px] translate-y-[-90%] rounded-md w-fit px-2 py-1 after:absolute after:top-[100%] after:empty after:left-[50%] after:-ml-1 after:border-5 after:border-solid after:border-black after:border-t-[5px] after:border-l-[5px] after:border-r-[5px] after:border-l-transparent after:border-r-transparent'>
          Copied!
        </div>
      )}
      <button
        className='items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-twitter border border-primary-twitter cursor-pointer'
        onClick={handleClick}
      >
        Copy
      </button>
    </div>
  );
}

export default CopyGeneratedContentButton;
