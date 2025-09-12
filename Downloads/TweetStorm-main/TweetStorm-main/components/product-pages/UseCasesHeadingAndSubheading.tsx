import H2Heading from '../ai-tweet-generator/H2Heading';

type UseCasesHeadingAndSubheadingProps = {
  subheading: string;
  className?: string;
};

function UseCasesHeadingAndSubheading({
  subheading,
  className,
}: UseCasesHeadingAndSubheadingProps) {
  return (
    <div>
      <H2Heading className={`${className}`}>Use Cases</H2Heading>
      <p className={`mt-2 ${className}`}>{subheading}</p>
    </div>
  );
}

export default UseCasesHeadingAndSubheading;
