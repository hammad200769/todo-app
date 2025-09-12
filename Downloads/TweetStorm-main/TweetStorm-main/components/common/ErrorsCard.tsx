import clsx from 'clsx';
import { useState } from 'react';
import { DropDownIcon } from '../icons';

type ErrorsCardProps = {
  errors: Array<string>;
};

function ErrorsCard({ errors }: ErrorsCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className='bg-rose-500 text-white rounded-lg space-y-1'>
      <button
        className={clsx(
          'flex-cb w-full px-3 py-1 cursor-pointer bg-danger rounded-lg',
          isExpanded && 'rounded-b-none'
        )}
        type='button'
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <h2 className='font-bold'>Errors</h2>
        <div className={clsx(isExpanded && 'rotate-180')}>
          <DropDownIcon />
        </div>
      </button>
      {isExpanded && (
        <ul className='px-3 pb-2'>
          {errors.map((error, index) => (
            <li key={index}>- {error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ErrorsCard;
