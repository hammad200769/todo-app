import { ErrorIcon } from '../icons/Icons';

type FormErrorProps = {
  text: string;
};

function FormError({ text }: FormErrorProps) {
  return (
    <div className='flex-cb'>
      <div className='shrink-0'>
        <ErrorIcon />
      </div>
      <p className='text-sm ml-2'>{text}</p>
    </div>
  );
}

export default FormError;
