import { SUBSCRIPTION_NAME } from '@/types/types';
import ToolTipHelper from '../common/pricing/ToolTipHelper';
import AlreadySubscribedButton from './AlreadySubscribedButton';
import CancelledSubscription from './CancelledSubscription';
import SubscribeButton from './SubscribeButton';
import SubscriptionPlanFeature from './SubscriptionPlanFeature';
import UpdateSubscriptionButton from './UpdateSubscriptionButton';

type SubscriptionPlanCardProps = {
  subscriptionName: SUBSCRIPTION_NAME;
  activeSubscriptionName: SUBSCRIPTION_NAME | null;
  subscriptionFeatures: Array<{
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
  }>;
  subscriptionCost: string;
  subscriptionTitle: string;
  isCancelled: boolean;
  status?: string;
  scFeatures: {
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
    hidden?: boolean;
  }[];
  isScreenshotFeaturesExpanded: boolean;
  setIsScreenshotFeaturesExpanded: (value: boolean) => void;
};

function SubscriptionPlanCard({
  subscriptionName,
  subscriptionFeatures,
  subscriptionCost,
  activeSubscriptionName,
  subscriptionTitle,
  status,
  isCancelled,
  scFeatures,
  isScreenshotFeaturesExpanded,
  setIsScreenshotFeaturesExpanded,
}: SubscriptionPlanCardProps) {
  function handleScreenshotFeaturesToggle() {
    const newState = !isScreenshotFeaturesExpanded;
    setIsScreenshotFeaturesExpanded(newState);
  }

  return (
    <div className='w-full rounded-3xl bg-white dark:bg-primary-dark shadow-xs overflow-hidden border dark:border-dark-mode-border transition-all duration-300'>
      <div className='py-6 px-8 md:flex-b'>
        <div>
          <h3 className='text-lg font-semibold leading-8 tracking-tight'>
            {subscriptionTitle}
          </h3>
          <div className='mt-4 flex items-baseline text-5xl font-bold tracking-tight'>
            <h3>${subscriptionCost}</h3>
            <span className='text-lg ml-1 font-semibold tracking-normal'>
              /month
            </span>
          </div>
        </div>
        {activeSubscriptionName === subscriptionName &&
          status === 'past_due' && (
            <div>
              <p className='dark:text-red-400 text-red-500'>
                <i>Payment Past Due</i>
              </p>
            </div>
          )}
      </div>

      <div className='flex flex-1 flex-col justify-between dark:bg-primary-dark-light rounded-b-3xl bg-gray-50 p-6 md:p-8'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 tracking-wide'>
              Core Features
            </h4>
            <ul className='space-y-1.5'>
              {subscriptionFeatures.map((feature, index) => (
                <li key={index} className='flex-c space-x-3'>
                  <SubscriptionPlanFeature
                    key={index}
                    text={feature.component ?? feature.text}
                  />
                  {feature.info && (
                    <ToolTipHelper helpText={feature.helpingText as string[]} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className='border-t dark:border-gray-700 pt-4'>
            <div className='text-center'>
              <button
                className='text-sm font-semibold text-blue-600 p-2 dark:bg-slate-800 bg-blue-100 rounded-md cursor-pointer tracking-wide flex items-center'
                onClick={handleScreenshotFeaturesToggle}
              >
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                Twitter Screenshots
                <svg
                  className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                    isScreenshotFeaturesExpanded ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
            </div>

            {isScreenshotFeaturesExpanded && (
              <div className='transition-all duration-300 ease-in-out mt-3'>
                <ul className='space-y-1.5'>
                  {scFeatures.map((feature, index) => (
                    <li key={index} className='flex-c space-x-3'>
                      <SubscriptionPlanFeature
                        key={index}
                        text={feature.component ?? feature.text}
                      />
                      {feature.info && (
                        <ToolTipHelper
                          helpText={feature.helpingText as string[]}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='mt-6'>
          {!activeSubscriptionName && (
            <>
              <SubscribeButton subscriptionName={subscriptionName} />
              <p className='text-center mt-4 text-sm'>Cancel Anytime</p>
            </>
          )}

          {activeSubscriptionName === subscriptionName && isCancelled && (
            <CancelledSubscription />
          )}

          {activeSubscriptionName === subscriptionName && !isCancelled && (
            <AlreadySubscribedButton table={false} />
          )}
          {shouldShowUpdateSubscriptionButton(
            subscriptionName,
            activeSubscriptionName
          ) && (
            <UpdateSubscriptionButton
              table={false}
              updateTo={subscriptionName}
              status={status!}
              updateType={
                subscriptionName === SUBSCRIPTION_NAME.Pro
                  ? 'downgrade'
                  : 'upgrade'
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

function shouldShowUpdateSubscriptionButton(
  currentSubscriptionName: SUBSCRIPTION_NAME,
  activeSubscriptionName: SUBSCRIPTION_NAME | null
): boolean {
  if (
    currentSubscriptionName === SUBSCRIPTION_NAME.Pro &&
    activeSubscriptionName !== currentSubscriptionName &&
    activeSubscriptionName === SUBSCRIPTION_NAME.Agency
  ) {
    return true;
  }
  if (
    currentSubscriptionName === SUBSCRIPTION_NAME.Agency &&
    activeSubscriptionName !== currentSubscriptionName &&
    activeSubscriptionName === SUBSCRIPTION_NAME.Pro
  ) {
    return true;
  }
  return false;
}

export default SubscriptionPlanCard;
