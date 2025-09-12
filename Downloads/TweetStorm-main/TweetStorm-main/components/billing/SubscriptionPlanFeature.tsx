import { PricingPlanCheckedIcon } from '../icons';

type SubscriptionPlanFeatureProps = {
  text: string | JSX.Element;
};

function SubscriptionPlanFeature({ text }: SubscriptionPlanFeatureProps) {
  return (
    <div className='flex-c space-x-3 text-base'>
      <PricingPlanCheckedIcon />
      {typeof text === 'string' ? <p>{text}</p> : text}
    </div>
  );
}

export default SubscriptionPlanFeature;
