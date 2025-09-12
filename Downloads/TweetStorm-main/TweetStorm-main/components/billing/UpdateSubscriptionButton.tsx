'use client';

import { SUBSCRIPTION_NAME } from '@/types/types';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import UpdateSubscriptionDialog from './UpdateSubscriptionDialog';

type UpdateSubscriptionButtonProps = {
  updateTo: SUBSCRIPTION_NAME;
  updateType: 'upgrade' | 'downgrade';
  status: string;
  table: boolean;
};

function UpdateSubscriptionButton({
  updateTo,
  updateType,
  table,
}: UpdateSubscriptionButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleButtonClick = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={clsx(
          'bg-primary rounded-md py-[10px] px-6 text-white hover:bg-primary-hover font-semibold cursor-pointer',
          table ? '' : 'w-full'
        )}
      >
        {updateType === 'upgrade' ? 'Upgrade' : 'Downgrade'}
      </button>

      <DialogDisplayer
        showDialog={showConfirmation}
        dialogComponent={
          <UpdateSubscriptionDialog
            onClose={() => setShowConfirmation(false)}
            updateTo={updateTo}
          />
        }
      />
    </>
  );
}

export default UpdateSubscriptionButton;
