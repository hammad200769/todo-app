import { CheckmarkIcon } from '../icons';

type FormSuccessProps = {
  text: string;
};

function FormSuccess({ text }: FormSuccessProps) {
  return (
    <div className='flex-cb'>
      <div className='shrink-0'>
        <CheckmarkIcon />
      </div>
      <p className='text-sm ml-2'>{text}</p>
    </div>
  );
}

export default FormSuccess;
