import clsx from 'clsx';

type DialogConfirmationButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

function DialogConfirmationButton({
  disabled,
  onClick,
}: DialogConfirmationButtonProps) {
  return (
    <button
      className={clsx(
        'bg-black text-white py-2 px-3 text-xs rounded-md tracking-wider cursor-pointer',
        disabled && 'opacity-50'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      CONFIRM
    </button>
  );
}

export default DialogConfirmationButton;
