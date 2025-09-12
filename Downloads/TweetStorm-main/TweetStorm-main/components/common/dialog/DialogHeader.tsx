import { CrossIcon } from '@/components/icons';
import clsx from 'clsx';

type DialogHeaderProps = {
  onCloseButtonClick: () => void;
  heading?: string;
  type?: 'info' | 'danger';
};

export function DialogHeader({
  onCloseButtonClick,
  heading,
  type = 'info',
}: DialogHeaderProps) {
  return (
    <div>
      <div
        className={clsx(
          'h-2 rounded-t-lg',
          type === 'danger' && 'bg-danger',
          type === 'info' && 'bg-primary'
        )}
      ></div>
      <div className='flex-cb px-6 pt-2'>
        {heading && <h3 className='text-lg font-bold'>{heading}</h3>}
        <button
          className='pl-1 ml-auto cursor-pointer'
          onClick={onCloseButtonClick}
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
}
