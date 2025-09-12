import { ReactNode } from 'react';

type FaqCardProps = {
  heading: string;
  description: ReactNode;
};

function FaqCard({ heading, description }: FaqCardProps) {
  return (
    <div className='max-w-[700px] mx-auto'>
      <p className='font-semibold text-primary-dark dark:text-white'>
        {heading}
      </p>
      <p className='mt-3'>{description}</p>
    </div>
  );
}

export default FaqCard;
