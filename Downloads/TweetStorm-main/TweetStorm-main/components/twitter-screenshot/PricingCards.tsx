import { screenShotPricingFeatures, URLS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import ToolTipHelper from '../common/pricing/ToolTipHelper';
import { CrossIcon, PricingPlanCheckedIcon } from '../icons';

function PricingCards() {
  return (
    <div className='flow-root pb-[1px] mt-10'>
      <div className='max-content-w mx-auto grid grid-cols-1 gap-8 sm:gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <PricingCard>
          <div className='py-6 px-8'>
            <PricingTitle> Simple </PricingTitle>
            <div className='mt-4 text-5xl font-bold tracking-tight'>
              <h3 className='text-5xl'>FREE</h3>
            </div>
            <PricingDescription>Perfect for getting started</PricingDescription>{' '}
          </div>
          <div className='flex flex-1 flex-col justify-between dark:bg-primary-dark-light bg-gray-50 p-6 md:p-8 rounded-b-3xl'>
            <PricingFeaturesList features={screenShotPricingFeatures.free} />
            <Link
              href={URLS.signup}
              className='inline-block mt-8 w-full rounded-lg dark:bg-primary-dark-light dark:hover:bg-primary-dark hover:bg-white border-2 dark:border-dark-mode-border border-gray-600 px-4 py-2.5 text-center text-sm font-semibold leading-5 link-anim'
            >
              Try it now
            </Link>
            <p className='text-center mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium'>
              No Credit Card Required
            </p>
          </div>
        </PricingCard>

        <PricingCard className='border-primary dark:border-primary-light border-2 dark:shadow-[2px_2px_10px_0px_#121313] shadow-[2px_2px_10px_0px_#d9d9d9]'>
          <div className='relative py-6 px-8'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg'>
                POPULAR
              </span>
            </div>
            <PricingTitle>Professional</PricingTitle>
            <div className='mt-4 flex items-baseline text-5xl font-bold tracking-tight'>
              <h3>$12</h3>
              <span className='text-lg ml-1 font-semibold tracking-normal'>
                /month
              </span>
            </div>
            <PricingDescription>Best for professionals</PricingDescription>
          </div>
          <div className='flex flex-1 flex-col justify-between dark:bg-primary-dark-light rounded-b-3xl bg-gray-50 p-6 md:p-8'>
            <PricingFeaturesList features={screenShotPricingFeatures.pro} />

            <Link
              href={URLS.signup}
              className='inline-block mt-8 w-full rounded-lg  px-4 py-2.5 text-center text-sm font-medium leading-5 text-white cta-shadow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:shadow-none link-anim'
            >
              Get Started Now
            </Link>
            <p className='text-center mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium'>
              Cancel Anytime
            </p>
          </div>
        </PricingCard>

        <PricingCard>
          <div className='py-6 px-8'>
            <PricingTitle>Agency </PricingTitle>
            <div className='mt-4 flex items-baseline text-5xl font-bold tracking-tight'>
              <h3>$29</h3>
              <span className='text-lg ml-1 font-semibold tracking-normal'>
                /month
              </span>
            </div>
            <PricingDescription>For teams and agencies</PricingDescription>
          </div>
          <div className='flex flex-1 flex-col justify-between  dark:bg-primary-dark-light rounded-b-3xl bg-gray-50 p-6 md:p-8'>
            <PricingFeaturesList features={screenShotPricingFeatures.agency} />
            <Link
              href={URLS.signup}
              className='mt-8 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium leading-5 text-white cta-shadow hover:bg-primary-hover focus:shadow-none link-anim'
            >
              Get Started Now
            </Link>
            <p className='text-center mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium'>
              Cancel Anytime
            </p>
          </div>
        </PricingCard>
      </div>
    </div>
  );
}
type PricingFeaturesListProps = {
  features: Array<{
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
  }>;
};

function PricingFeaturesList({ features }: PricingFeaturesListProps) {
  return (
    <ul className='space-y-3'>
      {features.map((feature, index) => (
        <li key={index} className='flex-c space-x-3'>
          {feature.checked ? (
            <PricingPlanCheckedIcon />
          ) : (
            <span className='text-red-500'>
              <CrossIcon />
            </span>
          )}
          <p className='text-base font-medium'>{feature.text}</p>

          {feature.info ? (
            <ToolTipHelper helpText={feature.helpingText as string[]} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

type PricingCardProps = {
  children: ReactNode;
  className?: string;
};

function PricingCard({ children, className }: PricingCardProps) {
  return (
    <article
      className={clsx(
        'flex flex-col rounded-3xl dark:bg-primary-dark bg-white border dark:border-dark-mode-border',
        className
      )}
    >
      {children}
    </article>
  );
}

type PricingTitleProps = {
  children: ReactNode;
};

function PricingTitle({ children }: PricingTitleProps) {
  return (
    <h3 className='text-lg font-semibold leading-8 tracking-tight'>
      {children}
    </h3>
  );
}

type PricingDescriptionProps = {
  children: ReactNode;
};

function PricingDescription({ children }: PricingDescriptionProps) {
  return <p className='mt-3 leading-tight'>{children}</p>;
}
export default PricingCards;
