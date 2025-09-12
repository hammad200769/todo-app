'use client';

import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import DeleteSubscriptionDialog from './DeleteSubscriptionDialog';

function CancelSubscriptionButton() {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className='px-4 py-2 border border-gray-300 dark:border-dark-mode-border dark:bg-primary-dark-light rounded-md font-semibold text-xs uppercase tracking-widest shadow-xs dark:text-white hover:text-gray-400 disabled:opacity-25 transition cursor-pointer'
      >
        CANCEL SUBSCRIPTION
      </button>
      <DialogDisplayer
        showDialog={showConfirmation}
        dialogComponent={
          <DeleteSubscriptionDialog
            onClose={() => setShowConfirmation(false)}
          />
        }
      />
    </>
  );
}

export default CancelSubscriptionButton;
