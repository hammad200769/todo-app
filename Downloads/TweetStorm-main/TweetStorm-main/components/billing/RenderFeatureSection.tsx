import { PricingFeatureRow, SUBSCRIPTION_NAME } from '@/types/types';
import ToolTipHelper from '../common/pricing/ToolTipHelper';
import { PricingPlanCheckedIcon, XIcon } from '../icons';
function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform duration-200 ${
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
function RenderFeatureSection(
  features: PricingFeatureRow[],
  title: string,
  sectionKey: string,
  toggleSection: (key: string) => void,
  plans: SUBSCRIPTION_NAME[],
  expandedSections: { [key: string]: boolean },
  icon?: JSX.Element
) {
  return (
    <div className='overflow-hidden bg-white dark:bg-gray-800'>
      <button
        onClick={() => toggleSection(sectionKey)}
        className='w-full cursor-pointer flex justify-between py-3 px-6 bg-soft-white dark:bg-primary-dark-light duration-200 border-y border-gray-200 dark:border-gray-500'
      >
        <div className='font-semibold text-base text-gray-900 dark:text-gray-100 tracking-wide flex items-center group'>
          {icon && (
            <span className='mr-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200'>
              {icon}
            </span>
          )}
          <span className='text-blue-600 dark:text-blue-400 transition-colors duration-200'>
            {title}
          </span>
        </div>
        <div className='flex gap-5'>
          <div className='flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 font-medium'>
            {features.length} feature{features.length !== 1 ? 's' : ''}
          </div>
          <div className='flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 font-medium'>
            {expandedSections[sectionKey]
              ? 'Click to collapse'
              : 'Click to expand'}
          </div>

          <span className='ml-auto text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
            <ChevronIcon isExpanded={expandedSections[sectionKey]} />
          </span>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          expandedSections[sectionKey]
            ? 'max-h-none opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className='bg-white border-b border-b-gray-200 dark:border-b-gray-500 dark:bg-gray-800'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 py-3 px-6 border-b border-gray-100 dark:border-gray-700 hover:dark:bg-gray-700 hover:bg-gray-50 transition-all duration-200 ${
                index === features.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <div className='flex items-center space-x-3 '>
                <span className='text-[15px] dark:text-gray-100 font-semibold'>
                  {feature.name}
                </span>
                {feature.info && (
                  <ToolTipHelper helpText={feature.helpingText as string[]} />
                )}
              </div>

              {plans.map(planName => (
                <div
                  key={planName}
                  className='flex justify-center items-center'
                >
                  {feature.availability ? (
                    feature.availability[planName] ? (
                      <div className='flex items-center justify-center w-6 h-6 rounded-full'>
                        <PricingPlanCheckedIcon />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700'>
                        <XIcon />
                      </div>
                    )
                  ) : feature.desc ? (
                    <span className='text-[15px] text-gray-700 dark:text-gray-300'>
                      {feature.desc[planName]}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderFeatureSection;
