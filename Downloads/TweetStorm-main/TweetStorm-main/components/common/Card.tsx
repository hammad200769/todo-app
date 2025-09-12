import { ReactNode } from 'react';

type CardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

function Card({ title, description, icon }: CardProps) {
  return (
    <article className='space-y-3 max-w-[700px] mx-auto'>
      <div className='flex-c gap-x-3'>
        <div className='p-2 bg-primary rounded-full text-white'>{icon}</div>
        <h3 className='text-xl font-semibold'>{title}</h3>
      </div>
      <p className='leading-relaxed'>{description}</p>
    </article>
  );
}

export default Card;
