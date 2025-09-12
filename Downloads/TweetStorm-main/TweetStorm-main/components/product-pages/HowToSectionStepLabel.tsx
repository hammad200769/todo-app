type HowToSectionStepLabelProps = {
  stepNumber: number;
};

function HowToSectionStepLabel({ stepNumber }: HowToSectionStepLabelProps) {
  return (
    <div className='rounded-full py-0.5 px-3 border font-medium border-primary dark:border-indigo-300 text-primary dark:text-indigo-300 inline-block'>
      STEP {stepNumber}
    </div>
  );
}

export default HowToSectionStepLabel;
