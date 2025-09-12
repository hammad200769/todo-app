import React, { ReactNode } from 'react';
import H2Heading from '../ai-tweet-generator/H2Heading';
import Card from '../common/Card';

interface Card {
  title: string;
  description: ReactNode;
  icon: ReactNode;
}
interface Meta {
  heading: string;
  subheading: string;
  description: ReactNode;
}

interface MassTweetDeleteCards {
  Cards: Card[];
  meta: Meta;
}

export default function MassTweetCards({ Cards, meta }: MassTweetDeleteCards) {
  return (
    <article className='mt-36 max-w-6xl mx-auto space-y-20'>
      <div className='text-center'>
        <H2Heading>{meta.heading}</H2Heading>
        <p className='mt-2 max-w-xl mx-auto'>{meta.description}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-12 lg:gap-y-16'>
        {Cards.map(card => (
          <React.Fragment key={card.title}>
            <article className='space-y-3 max-w-[700px] mx-auto'>
              <div className='flex-c gap-x-3'>
                <div className='p-2 bg-primary rounded-full text-white'>
                  {card.icon}
                </div>
                <h3 className='text-xl font-semibold'>{card.title}</h3>
              </div>
              {card.description}
            </article>
          </React.Fragment>
        ))}
      </div>
    </article>
  );
}
