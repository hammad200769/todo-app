'use client';
import PricingToolTipHelper from './PricingToolTipHelper';

type ToolTipHelperProps = {
  helpText: string[];
};

function ToolTipHelper({ helpText }: ToolTipHelperProps) {
  return (
    <div className='inline-flex items-center space-x-2'>
      <PricingToolTipHelper text={helpText} />
    </div>
  );
}

export default ToolTipHelper;
