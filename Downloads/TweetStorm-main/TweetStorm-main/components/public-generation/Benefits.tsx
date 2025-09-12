import { ReactNode } from 'react';
import H2Heading from '../ai-tweet-generator/H2Heading';
import Card from '../common/Card';

type BenefitsProps = {
  benefitCards: Array<{
    title: string;
    description: string;
    icon: ReactNode;
  }>;
  subheading: string;
};

function Benefits({ benefitCards, subheading }: BenefitsProps) {
  return (
    <article className='mt-36 max-w-6xl mx-auto space-y-20'>
      <div className='text-center'>
        <H2Heading>Benefits</H2Heading>
        <p className='mt-2'>{subheading}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-12 lg:gap-y-16'>
        {benefitCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </article>
  );
}

export default Benefits;
