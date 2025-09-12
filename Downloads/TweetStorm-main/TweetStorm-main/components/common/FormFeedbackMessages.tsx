import { FormFeedback as FormFeedbackType } from '@/types/types';
import FormError from './FormError';
import FormSuccess from './FormSuccess';

type FormFeedbackProps = { formFeedback: FormFeedbackType };

function FormFeedback({ formFeedback }: FormFeedbackProps) {
  return (
    <>
      {formFeedback.type === 'error' && (
        <FormError text={formFeedback.message} />
      )}
      {formFeedback.type === 'success' && (
        <FormSuccess text={formFeedback.message} />
      )}
    </>
  );
}

export default FormFeedback;
