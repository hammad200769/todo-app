import { InfoIcon } from '@/components/icons';
import RcTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

type PricingToolTipHelperProps = {
  text: string[];
};

function PricingToolTipHelper({ text }: PricingToolTipHelperProps) {
  return (
    <RcTooltip
      placement='top'
      trigger={['hover']}
      overlay={
        <span className='text-[12.5px]'>
          {text.length > 1 ? (
            <ul>
              {text.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          ) : (
            text[0]
          )}
        </span>
      }
    >
      <button type='button' className='cursor-pointer'>
        <InfoIcon />
      </button>
    </RcTooltip>
  );
}

export default PricingToolTipHelper;
