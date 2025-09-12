'use client';
import ToolTipHelper from '@/components/common/pricing/ToolTipHelper';
import { CrossIcon, PricingPlanCheckedIcon } from '@/components/icons';
import {
  pricingFeatures,
  screenShotPricingFeatures,
  URLS,
} from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import ScreenshotFeaturesSection from '../common/pricing/ScreenshotFeatureSection';

function PricingSection() {
  const [isScreenshotFeaturesExpanded, setIsScreenshotFeaturesExpanded] =
    useState(false);

  function handleScreenshotFeaturesToggle() {
    const newState = !isScreenshotFeaturesExpanded;
    setIsScreenshotFeaturesExpanded(newState);
  }

  return (
    <section id='pricing' className='pt-20 responsive-pad'>
      <div>
        <div className='mx-auto max-content-w text-center'>
          <h2 className='text-5xl sm:text-6xl font-bold'>Pricing</h2>
          <p className='mt-3 text-2xl tracking-tight'>
            Unlock the full potential of TweetStorm.ai
          </p>
        </div>
      </div>
      <div className='flow-root pb-[1px] mt-10'>
        <div className='max-content-w mx-auto grid grid-cols-1 gap-8 sm:gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          <PricingCard>
            <div className='py-6 px-8'>
              <PricingTitle> Simple </PricingTitle>
              <div className='mt-4 text-5xl font-bold tracking-tight'>
                <h3 className='text-5xl'>FREE</h3>
              </div>
              <PricingDescription>
                Perfect for getting started
              </PricingDescription>{' '}
            </div>
            <div className='flex flex-1 flex-col justify-between dark:bg-primary-dark-light bg-gray-50 p-6 md:p-8 rounded-b-3xl'>
              <PricingFeaturesList features={pricingFeatures.free} />

              {screenShotPricingFeatures?.free && (
                <div className='mt-6'>
                  <ScreenshotFeaturesSection
                    features={screenShotPricingFeatures.free}
                    isExpanded={isScreenshotFeaturesExpanded}
                    onToggle={handleScreenshotFeaturesToggle}
                  />
                </div>
              )}

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
              <PricingFeaturesList features={pricingFeatures.pro} />

              <div className='mt-6'>
                <ScreenshotFeaturesSection
                  features={screenShotPricingFeatures.pro}
                  isExpanded={isScreenshotFeaturesExpanded}
                  onToggle={handleScreenshotFeaturesToggle}
                />
              </div>

              <div>
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
              <PricingFeaturesList features={pricingFeatures.agency} />

              {screenShotPricingFeatures?.agency && (
                <div className='mt-6'>
                  <ScreenshotFeaturesSection
                    features={screenShotPricingFeatures.agency}
                    isExpanded={isScreenshotFeaturesExpanded}
                    onToggle={handleScreenshotFeaturesToggle}
                  />
                </div>
              )}

              <Link
                href={URLS.signup}
                className='inline-block mt-8 w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium leading-5 text-white cta-shadow hover:bg-primary-hover focus:shadow-none link-anim'
              >
                Get Started Now
              </Link>
              <p className='text-center mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium'>
                Cancel Anytime
              </p>
            </div>
          </PricingCard>
        </div>

        <section className='mx-auto  mt-16 md:max-w-2xl lg:max-w-4xl'>
          <div className='flex flex-col dark:ring-dark-mode-border gap-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 md:flex-row md:items-center md:gap-8'>
            <div className='md:flex-1'>
              <h3 className='text-lg font-semibold tracking-tight text-primary dark:text-primary-light'>
                Want more credits?
              </h3>
              <p className='mt-1 text-base'>Contact us to get more credits.</p>
            </div>
            <div>
              <a
                href={`mailto:${process.env.MAIL_FROM_ADDRESS}`}
                className='inline-block rounded-lg bg-indigo-50 px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-indigo-100'
              >
                Reach us <span>&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

type PricingFeaturesListProps = {
  features: Array<{
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
  }>;
};

function PricingFeaturesList({ features }: PricingFeaturesListProps) {
  return (
    <ul className='space-y-2'>
      {features.map((feature, index) => (
        <li key={index} className='flex-c space-x-3'>
          {feature.checked ? (
            <PricingPlanCheckedIcon />
          ) : (
            <span className='text-danger dark:text-red-400'>
              <CrossIcon width='20px' height='20px' />
            </span>
          )}
          {feature.component ? (
            feature.component
          ) : (
            <p className=''>{feature.text}</p>
          )}

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
        'flex flex-col rounded-3xl dark:bg-primary-dark bg-white border border-gray-400',
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

export default PricingSection;
