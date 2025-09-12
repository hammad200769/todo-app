'use client';
import { PricingPlanCheckedIcon, XIcon } from '@/components/icons';
import { PLANS, PricingTableFeatureRow } from '@/types/types';
import {
  pricingWithFreeBulkActionsFeatures,
  pricingWithFreeCoreFeatures,
  pricingWithFreeScreenshotFeatures,
  URLS,
} from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import ToolTipHelper from './ToolTipHelper';

type PlanTableProps = {
  plans: PLANS[];
};

function renderActionButton(planName: PLANS) {
  function isPrimaryPlan(planName: PLANS) {
    return planName === PLANS.Pro;
  }
  const isPrimary = isPrimaryPlan(planName);

  if (planName === PLANS.Free) {
    return (
      <div className='space-y-3 flex items-center justify-center'>
        <Link
          href={URLS.signup}
          className='block w-fit mt-2 rounded-xl border-2 border-gray-300 hover:border-gray-400 px-4 md:px-6 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105'
        >
          Try it now
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-3 flex items-center justify-center'>
      <Link
        href={URLS.signup}
        className={`block w-fit mt-2 rounded-xl px-4 md:px-6 py-2 text-center text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
          isPrimary
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg'
        }`}
      >
        Get Started Now
      </Link>
    </div>
  );
}

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${
        isExpanded ? 'rotate-180' : 'rotate-0'
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
  );
}

function PlanTable({ plans }: PlanTableProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    core: true,
    bulk: true,
    screenshot: true,
  });

  function toggleSection(section: string) {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function getSubscriptionCost(planName: PLANS): string {
    const costs = {
      [PLANS.Free]: '0',
      [PLANS.Pro]: '12',
      [PLANS.Agency]: '29',
    };
    return costs[planName] || '0';
  }

  function getSubscriptionTitle(planName: PLANS): string {
    const titles = {
      [PLANS.Free]: 'Free',
      [PLANS.Pro]: 'Professional',
      [PLANS.Agency]: 'Agency',
    };
    return titles[planName] || planName;
  }

  function renderFeatureSection(
    features: PricingTableFeatureRow[],
    title: string,
    sectionKey: string,
    icon?: JSX.Element
  ) {
    return (
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <button
          onClick={() => toggleSection(sectionKey)}
          className={clsx(
            'w-full cursor-pointer flex bg-gray-50 dark:bg-primary-dark-light justify-between items-center py-3 px-4 md:px-6 hover:bg-gray-100 dark:hover:bg-gray-700 duration-200 border-b border-gray-200 dark:border-gray-700',
            sectionKey === 'core' && 'border-t border-gray-100 mt-3'
          )}
        >
          <div className='font-semibold w-full lg:w-fit text-base text-gray-900 dark:text-gray-100 tracking-wide flex items-center justify-between group lg:col-span-1'>
            <div className='flex items-center'>
              {icon && (
                <span className='mr-2 md:mr-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200'>
                  {icon}
                </span>
              )}
              <span className='text-blue-600 dark:text-blue-400 transition-colors duration-200'>
                {title}
              </span>
            </div>
            <div className='flex items-center space-x-3 mt-0.5 lg:hidden'>
              <span className='text-sm text-gray-500 ml-2 dark:text-gray-400 font-medium'>
                {features.length} feature{features.length !== 1 ? 's' : ''}
              </span>
              <span className='text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                <ChevronIcon isExpanded={expandedSections[sectionKey]} />
              </span>
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='hidden lg:flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 font-medium lg:col-span-1'>
              {features.length} feature{features.length !== 1 ? 's' : ''}
            </div>
            <div className='hidden lg:flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 font-medium lg:col-span-1'>
              {expandedSections[sectionKey]
                ? 'Click to collapse'
                : 'Click to expand'}
            </div>

            <div className='hidden lg:flex justify-center items-center lg:col-span-1'>
              <span className='text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                <ChevronIcon isExpanded={expandedSections[sectionKey]} />
              </span>
            </div>
          </div>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out ${
            expandedSections[sectionKey]
              ? 'max-h-none opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {' '}
          <div className='bg-white dark:bg-gray-800'>
            {/* Features rows */}
            <div className='lg:block'>
              <div className='lg:hidden'>
                {features.map((feature, index) => (
                  <div key={index}>
                    <div
                      className={`grid grid-cols-4 py-3 px-4 md:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                        index < features.length - 1
                          ? 'border-b border-gray-100 dark:border-gray-700'
                          : ''
                      } group`}
                    >
                      <div className='flex items-center space-x-2 md:space-x-3 pr-2 md:pr-4'>
                        <span className='text-sm md:text-[15px] text-gray-700 dark:text-gray-200 font-semibold'>
                          {feature.name}
                        </span>
                        {feature.info && (
                          <ToolTipHelper
                            helpText={feature.helpingText as string[]}
                          />
                        )}
                      </div>

                      {plans.map(planName => (
                        <div
                          key={planName}
                          className='flex justify-center items-center px-2'
                        >
                          {feature.availability ? (
                            feature.availability[planName] ? (
                              <div className='flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full group-hover:scale-110 transition-all duration-200'>
                                <PricingPlanCheckedIcon />
                              </div>
                            ) : (
                              <div className='flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-red-500'>
                                <XIcon />
                              </div>
                            )
                          ) : feature.desc ? (
                            <span className='text-xs md:text-[15px] text-gray-600 dark:text-gray-300 text-center'>
                              {feature.desc[planName]}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop view - unchanged */}
              <div className='hidden lg:block'>
                {features.map((feature, index) => (
                  <div key={index}>
                    <div
                      className={`grid grid-cols-4 py-3 px-4 md:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                        index < features.length - 1
                          ? 'border-b border-gray-100 dark:border-gray-700'
                          : ''
                      } group`}
                    >
                      <div className='flex items-center space-x-2 md:space-x-3 pr-2 md:pr-4'>
                        <span className='text-sm md:text-[15px] text-gray-700 dark:text-gray-200 font-semibold'>
                          {feature.name}
                        </span>
                        {feature.info && (
                          <ToolTipHelper
                            helpText={feature.helpingText as string[]}
                          />
                        )}
                      </div>

                      {plans.map(planName => (
                        <div
                          key={planName}
                          className='flex justify-center items-center'
                        >
                          {feature.availability ? (
                            feature.availability[planName] ? (
                              <div className='flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full group-hover:scale-110 transition-all duration-200'>
                                <PricingPlanCheckedIcon />
                              </div>
                            ) : (
                              <div className='flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-red-500'>
                                <XIcon />
                              </div>
                            )
                          ) : feature.desc ? (
                            <span className='text-xs md:text-[15px] text-gray-600 dark:text-gray-300 text-center'>
                              {feature.desc[planName]}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-6 md:mt-8 w-full mx-auto'>
      <div className='hidden lg:block sticky top-[73px] z-2 bg-white dark:bg-primary-dark-light'>
        <div className='grid grid-cols-4 gap-4 xl:px-6 px-4'>
          <div className='flex items-end'></div>

          {plans.map(planName => {
            return (
              <div
                key={planName}
                className='relative text-center rounded-2xl transition-all duration-300 pt-2'
              >
                <div>
                  <div>
                    <h3 className='text-base font-bold text-gray-900 dark:text-gray-100'>
                      {getSubscriptionTitle(planName)}
                    </h3>

                    <div className='flex items-baseline justify-center'>
                      <span
                        className={clsx(
                          'text-xl xl:text-xl font-bold ',
                          planName === PLANS.Free
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent'
                        )}
                      >
                        ${getSubscriptionCost(planName)}
                      </span>
                      <span className='text-sm ml-2 font-semibold text-gray-500 dark:text-gray-400'>
                        {planName === PLANS.Free ? '' : '/month'}
                      </span>
                    </div>
                  </div>

                  {renderActionButton(planName)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='lg:hidden sticky top-[65px] z-10 grid grid-cols-4 py-3 bg-white dark:bg-primary-dark-light px-6'>
        <div className='text-base font-semibold flex items-center text-gray-700 dark:text-gray-300 pr-2 ml-8'></div>
        {plans.map(planName => (
          <div key={planName} className='text-center px-2'>
            <div className='text-base font-semibold text-gray-700 dark:text-gray-300'>
              {getSubscriptionTitle(planName)}
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              ${getSubscriptionCost(planName)}
              {planName !== PLANS.Free && '/mo'}
            </div>
          </div>
        ))}
      </div>
      {/* Features table */}
      <div className='bg-white dark:bg-gray-800 rounded-lg lg:rounded-none'>
        {renderFeatureSection(
          pricingWithFreeCoreFeatures,
          'Core Features',
          'core',
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}

        {renderFeatureSection(
          pricingWithFreeBulkActionsFeatures,
          'Bulk Actions',
          'bulk',
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
        )}

        {renderFeatureSection(
          pricingWithFreeScreenshotFeatures,
          'Tweet Screenshots',
          'screenshot',
          <svg
            className='w-5 h-5'
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
        )}
      </div>
    </div>
  );
}

export default PlanTable;
