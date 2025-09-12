import { FormFeedback as FormFeedbackType } from '@/types/types';
import clsx from 'clsx';
import { XIcon } from '../icons';
import FormFeedback from './FormFeedbackMessages';

type FeedBackProps = {
  formFeedback: FormFeedbackType;
  resetFeedback: () => void;
};

function FeedBack({ formFeedback, resetFeedback }: FeedBackProps) {
  function handleCloseForm() {
    resetFeedback();
  }

  return (
    <>
      <div
        className={clsx(
          'mt-3 py-1.5 pl-2 pr-8 rounded-lg relative flex border justify-start',
          formFeedback.type === 'error'
            ? 'bg-red-100 border-red-700 dark:border-red-900 dark:bg-red-200 text-red-700'
            : 'bg-green-100 border-green-700 dark:border-green-900 text-green-800'
        )}
      >
        <FormFeedback formFeedback={formFeedback} />
        <button
          className={clsx(
            'absolute top-1 right-1 pl-1 pb-1 cursor-pointer',
            formFeedback.type === 'error' ? 'text-red-700' : 'text-green-700'
          )}
          onClick={handleCloseForm}
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}

export default FeedBack;
