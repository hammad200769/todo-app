import { ReactNode } from 'react';
import H2Heading from '../ai-tweet-generator/H2Heading';
import Card from '../common/Card';

type FeaturesProps = {
  featureCards: Array<{
    title: string;
    description: string;
    icon: ReactNode;
  }>;
  description: string;
};

function Features({ featureCards, description }: FeaturesProps) {
  return (
    <article className='mt-36 max-w-6xl mx-auto space-y-20'>
      <div className='text-center'>
        <H2Heading>Features</H2Heading>
        <p className='mt-2'>{description}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-12 lg:gap-y-16'>
        {featureCards.map((card, index) => (
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

export default Features;
