'use client';

import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import ResumeSubscriptionDialog from './ResumeSubscriptionDialog';

function ResumeSubscriptionButton() {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <>
      <button
        className='cursor-pointer px-4 py-2 border border-gray-300 dark:border-dark-mode-border rounded-md font-semibold text-xs uppercase tracking-widest shadow-xs dark:text-white hover:text-gray-400 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition'
        onClick={() => setShowConfirmation(true)}
      >
        RESUME SUBSCRIPTION
      </button>
      <DialogDisplayer
        showDialog={showConfirmation}
        dialogComponent={
          <ResumeSubscriptionDialog
            onClose={() => setShowConfirmation(false)}
          />
        }
      />
    </>
  );
}

export default ResumeSubscriptionButton;
