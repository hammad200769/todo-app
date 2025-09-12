import { SUBSCRIPTION_NAME } from '@/types/types';
import {
  pricingFeatures,
  screenShotPricingFeatures,
  URLS,
} from '@/utils/constants';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useState } from 'react';
import DialogWrapper from '../common/DialogBackground';
import ToolTipHelper from '../common/pricing/ToolTipHelper';
import { CheckmarkIcon, CrossIcon } from '../icons';
import ScreenshotFeaturesSection from './ScreenShotFeatureSection';

type GenerationLimitDialogProps = {
  onClose: () => void;
};

function GenerationLimitDialog({ onClose }: GenerationLimitDialogProps) {
  const [showAll, setShowAll] = useState<boolean>(true);
  const [isScreenshotFeaturesExpanded, setIsScreenshotFeaturesExpanded] =
    useState<boolean>(false);

  function handleScreenshotFeaturesToggle() {
    const newState = !isScreenshotFeaturesExpanded;
    setIsScreenshotFeaturesExpanded(newState);
  }
  return (
    <DialogWrapper>
      <div className='fixed inset-0 z-25 flex-cc' onClick={onClose}>
        <div
          className='p-6 border grow bg-white dark:bg-primary-dark-light border-gray-500 max-w-6xl max-h-[90vh] mx-6 overflow-auto m-auto shadow-xl rounded-lg relative text-center xs:text-left'
          onClick={e => e.stopPropagation()}
        >
          <button
            className='absolute cursor-pointer p-2 right-1 top-1'
            onClick={onClose}
          >
            <CrossIcon />
          </button>
          <h4 className='font-semibold px-1 text-xl xs:text-2xl text-center'>
            Create More for Free!
          </h4>
          <hr className='mt-2' />

          <div className='max-w-3xl mx-auto'>
            <p className='mt-6 text-center sm:px-4'>
              Generate stunning content in seconds with our powerful AI-powered
              platform. Our free tier allows you to generate tweets, hashtags,
              twitter bio and twitter handles. No credit card required!
            </p>
            <div className='mt-6 xs:w-[80%] mx-auto'>
              <NextLink
                href={URLS.signup}
                className='rounded-md block bg-primary px-6 py-2 font-medium text-white hover:bg-primary-hover focus:shadow-none text-center link-anim'
              >
                Get Started for Free
              </NextLink>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className='mb-2 text-center font-bold text-xl'>Our Plans</h2>
            <div className='text-sm grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
              <PricingCard
                features={pricingFeatures.free}
                active={true}
                showAll={showAll}
                setShowAll={setShowAll}
                scFeatures={screenShotPricingFeatures.free}
                onToggle={handleScreenshotFeaturesToggle}
                isScreenshotFeaturesExpanded={isScreenshotFeaturesExpanded}
              />
              <PricingCard
                features={pricingFeatures[SUBSCRIPTION_NAME.Pro]}
                monthlyCost={12}
                showAll={showAll}
                scFeatures={screenShotPricingFeatures[SUBSCRIPTION_NAME.Pro]}
                setShowAll={setShowAll}
                onToggle={handleScreenshotFeaturesToggle}
                isScreenshotFeaturesExpanded={isScreenshotFeaturesExpanded}
              />
              <PricingCard
                features={pricingFeatures[SUBSCRIPTION_NAME.Agency]}
                monthlyCost={29}
                scFeatures={screenShotPricingFeatures[SUBSCRIPTION_NAME.Agency]}
                showAll={showAll}
                setShowAll={setShowAll}
                onToggle={handleScreenshotFeaturesToggle}
                isScreenshotFeaturesExpanded={isScreenshotFeaturesExpanded}
              />
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}

type PricingCardProps = {
  monthlyCost?: number;
  features: Array<{
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
    hidden?: boolean;
  }>;
  active?: boolean;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
  onToggle: () => void;
  isScreenshotFeaturesExpanded: boolean;
  scFeatures: {
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
  }[];
};

function PricingCard({
  monthlyCost,
  features,
  active,
  showAll,
  scFeatures,
  setShowAll,
  onToggle,
  isScreenshotFeaturesExpanded,
}: PricingCardProps) {
  const filteredFeatures = showAll
    ? features
    : features.filter(feature => feature.hidden !== true);

  const hiddenFeaturesCount = features.length - filteredFeatures.length;
  return (
    <div
      className={clsx(
        'border p-4 shadow-md rounded-md',
        active
          ? 'border-primary dark:border-primary-light border-2'
          : 'border-gray-200'
      )}
    >
      <h2 className='font-bold text-base'>
        {monthlyCost ? `$${monthlyCost} / month` : 'Free'}
      </h2>
      <ul className='text-[13px] mt-2'>
        {filteredFeatures.map(
          ({ component, text, checked, info, helpingText }, index) => (
            <li key={index} className='flex gap-2 items-center text-left'>
              {checked ? (
                <div>
                  <CheckmarkIcon
                    width='20px'
                    height='20px'
                    className='text-primary dark:text-primary-light'
                  />
                </div>
              ) : (
                <div className='text-danger dark:text-red-400'>
                  <CrossIcon width='20px' height='20px' />
                </div>
              )}
              <div className='flex-c items-center'>
                {component ? component : <span>{text}</span>}
                {info ? (
                  <span className='ml-1'>
                    <ToolTipHelper helpText={helpingText as string[]} />
                  </span>
                ) : null}
              </div>
            </li>
          )
        )}
      </ul>
      {hiddenFeaturesCount > 0 ? (
        <button
          onClick={() => setShowAll(!showAll)}
          className='my-2 cursor-pointer text-primary hover:text-primary-hover dark:text-white dark:hover:text-neutral-gray__dark text-sm font-medium'
        >
          {`View All (${hiddenFeaturesCount} more)`}
        </button>
      ) : (
        <button
          onClick={() => setShowAll(!showAll)}
          className='my-2 text-primary cursor-pointer hover:text-primary-hover dark:text-white dark:hover:text-neutral-gray__dark text-sm font-medium'
        >
          {showAll && `(View less)`}
        </button>
      )}

      <ScreenshotFeaturesSection
        textSize='text-[13px]'
        features={scFeatures}
        isExpanded={isScreenshotFeaturesExpanded}
        onToggle={onToggle}
      />
    </div>
  );
}

export default GenerationLimitDialog;
