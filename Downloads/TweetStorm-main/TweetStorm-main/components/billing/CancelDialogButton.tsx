type CancelDialogButtonProps = {
  onClick: () => void;
};

function CancelDialogButton({ onClick }: CancelDialogButtonProps) {
  return (
    <button
      className='border text-xs py-2 px-3 rounded-md tracking-wider dark:text-white cursor-pointer'
      onClick={onClick}
    >
      NEVERMIND
    </button>
  );
}

export default CancelDialogButton;
