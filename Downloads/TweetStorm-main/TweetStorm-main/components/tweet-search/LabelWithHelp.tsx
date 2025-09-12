import FormFieldHelper from './FormFieldHelperText';
import InputLabel from './InputLabel';

type LabelWithHelpProps = {
  labelFor: string;
  children: string;
  helpText: string;
};

function LabelWithHelp({ labelFor, children, helpText }: LabelWithHelpProps) {
  return (
    <div className='flex-c space-x-2'>
      <InputLabel htmlFor={labelFor}>{children}</InputLabel>
      <FormFieldHelper text={helpText} />
    </div>
  );
}

export default LabelWithHelp;
