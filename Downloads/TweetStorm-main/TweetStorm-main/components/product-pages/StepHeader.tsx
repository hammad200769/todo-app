import HowToSectionStepHeading from './HowToSectionStepHeading';
import HowToSectionStepLabel from './HowToSectionStepLabel';

type StepHeaderProps = {
  stepNumber: number;
  stepTitle: string;
};

function StepHeader({ stepNumber, stepTitle }: StepHeaderProps) {
  return (
    <div className='space-y-2'>
      <HowToSectionStepLabel stepNumber={stepNumber} />
      <HowToSectionStepHeading>{stepTitle}</HowToSectionStepHeading>
    </div>
  );
}

export default StepHeader;
