'use client';

import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import { QuestionMarkIcon } from '../icons';
import TweetIdeasDialog from './TweetIdeasDialog';

function TweetIdeasButton() {
  const [showIdeasDialog, setShowIdeasDialog] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowIdeasDialog(true)}
        className='cursor-pointer'
      >
        <QuestionMarkIcon />
      </button>
      <DialogDisplayer
        dialogComponent={
          <TweetIdeasDialog onClose={() => setShowIdeasDialog(false)} />
        }
        showDialog={showIdeasDialog}
      />
    </>
  );
}

export default TweetIdeasButton;
