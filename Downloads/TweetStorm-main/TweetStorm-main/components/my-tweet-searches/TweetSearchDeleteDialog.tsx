import { deleteReq, notifySuccess, stopClickPropagation } from '@/utils/utils';
import { useState } from 'react';
import DialogWrapper from '../common/DialogBackground';
import {
  CancelDialogButton,
  DangerButton,
  DialogHeader,
} from '../common/dialog';

type TweetSearchDeleteDialogProps = {
  tweetSearchId: number;
  onClose: () => void;
  onDelete: () => void;
};
export default function TweetSearchDeleteDialog({
  onClose,
  tweetSearchId,
  onDelete,
}: TweetSearchDeleteDialogProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  async function handleDelete() {
    try {
      setIsLoadingDelete(true);
      const response = await deleteReq(
        `/api/user/tweet-searches/${tweetSearchId}`
      );
      if (response.ok) {
        notifySuccess('Tweet Search deleted successfully.');
        onDelete();
      } else {
        const data = await response.json();
        alert(data.error.message);
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsLoadingDelete(false);
      onClose();
    }
  }

  return (
    <DialogWrapper onClick={onClose}>
      <div
        className='mb-6 w-full bg-white dark:bg-dark-mode-gray rounded-lg shadow-xl transform transition-all max-w-[572px] mx-auto'
        onClick={stopClickPropagation}
      >
        <DialogHeader
          onCloseButtonClick={onClose}
          type='danger'
          heading='Are you sure you want to delete this search?'
        />
        <div className='flex gap-x-3 justify-end px-6 pt-2 pb-4 mt-8'>
          <CancelDialogButton onClick={onClose}>No</CancelDialogButton>
          <DangerButton onClick={handleDelete} disabled={isLoadingDelete}>
            Yes
          </DangerButton>
        </div>
      </div>
    </DialogWrapper>
  );
}
