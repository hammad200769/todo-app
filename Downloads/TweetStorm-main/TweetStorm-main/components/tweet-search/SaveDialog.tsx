import { URLS } from '@/utils/constants';
import { stopClickPropagation } from '@/utils/utils';
import Link from 'next/link';
import DialogWrapper from '../common/DialogBackground';
import { CancelDialogButton, DialogHeader } from '../common/dialog';

type DeleteAccountDialogProps = {
  onClose: () => void;
};

function SaveDialog({ onClose }: DeleteAccountDialogProps) {
  return (
    <DialogWrapper onClick={onClose}>
      <div
        className='mb-6 bg-white rounded-lg shadow-xl transform transition-all max-w-[672px] mx-auto w-full'
        onClick={stopClickPropagation}
      >
        <DialogHeader
          onCloseButtonClick={onClose}
          type='info'
          heading='Login Required'
        />
        <div className='px-6'>
          <p className='mt-4'>You need to login to save your tweet searches</p>
        </div>

        <div className='flex gap-x-3 justify-end px-6 pt-2 pb-4'>
          <CancelDialogButton onClick={onClose}>Cancel</CancelDialogButton>
          <Link
            href={URLS.login}
            className='px-4 py-2 bg-primary text-white rounded-md tracking-wide text-sm shadow-xs transition'
          >
            Login
          </Link>
        </div>
      </div>
    </DialogWrapper>
  );
}

export default SaveDialog;
