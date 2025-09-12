import H2Heading from '../ai-tweet-generator/H2Heading';

type BestPracticesHeadingAndSubheadingProps = {
  subheading: string;
  className?: string;
};

function BestPracticesHeadingAndSubheading({
  subheading,
  className,
}: BestPracticesHeadingAndSubheadingProps) {
  return (
    <div>
      <H2Heading className={className}>Best Practices</H2Heading>
      <p className={`mt-2 ${className}`}>{subheading}</p>
    </div>
  );
}

export default BestPracticesHeadingAndSubheading;
