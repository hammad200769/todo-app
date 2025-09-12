import Tooltip from '../common/Tooltip';
import { FormHintIcon } from '../icons';

type FormFieldHelperProps = {
  text: string;
};

function FormFieldHelper({ text }: FormFieldHelperProps) {
  return (
    <Tooltip text={text}>
      <button
        type='button'
        aria-label='helper button'
        className='cursor-pointer'
      >
        <FormHintIcon />
      </button>
    </Tooltip>
  );
}

export default FormFieldHelper;
