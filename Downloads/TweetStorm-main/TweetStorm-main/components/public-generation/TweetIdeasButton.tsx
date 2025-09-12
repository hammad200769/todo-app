'use client';

import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import { QuestionMarkIcon } from '../icons';
import TweetIdeasDialog from '../tweet-generator/TweetIdeasDialog';

function TweetIdeasButton() {
  const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowHelpDialog(true)}
        aria-label='Ideas button'
        className='cursor-pointer'
      >
        <QuestionMarkIcon />
      </button>
      <DialogDisplayer
        dialogComponent={
          <TweetIdeasDialog onClose={() => setShowHelpDialog(false)} />
        }
        showDialog={showHelpDialog}
      />
    </>
  );
}

export default TweetIdeasButton;
