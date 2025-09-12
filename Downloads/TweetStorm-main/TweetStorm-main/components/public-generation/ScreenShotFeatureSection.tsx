import { CrossIcon, PricingPlanCheckedIcon } from '@/components/icons';
import clsx from 'clsx';
import ToolTipHelper from '../common/pricing/ToolTipHelper';

type ScreenshotFeaturesSectionProps = {
  features: Array<{
    component?: JSX.Element;
    text: string | JSX.Element;
    checked: boolean;
    info?: boolean;
    helpingText?: string[];
  }>;
  isExpanded: boolean;
  onToggle: () => void;
  textSize?: string;
};

function ScreenshotFeaturesSection({
  features,
  isExpanded,
  onToggle,
  textSize,
}: ScreenshotFeaturesSectionProps) {
  return (
    <div className='border-t dark:border-gray-700 pt-4'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center'>
          <button
            onClick={onToggle}
            className='text-base cursor-pointer p-2 dark:bg-slate-800 bg-blue-100 rounded-md flex items-center  font-semibold text-blue-600 dark:text-blue-400 '
          >
            <div className='text-blue-600 dark:text-blue-400'>
              <svg
                className='w-6 h-6 mr-2'
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
            </div>
            Twitter Screenshots
            <svg
              className={clsx(
                'w-3 h-3 ml-1 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
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
      </div>

      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div>
          <ul>
            {features.map((feature, index) => (
              <li key={index} className='flex gap-2 items-center text-left'>
                <div className='flex-shrink-0 mt-0.5'>
                  {feature.checked ? (
                    <div>
                      <PricingPlanCheckedIcon />
                    </div>
                  ) : (
                    <div>
                      <span className='text-danger dark:text-red-400'>
                        <CrossIcon />
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {feature.component ? (
                    feature.component
                  ) : (
                    <p
                      className={clsx(
                        'text-gray-700 dark:text-gray-300 leading-relaxed',
                        textSize ? textSize : 'text-base'
                      )}
                    >
                      {feature.text}
                    </p>
                  )}
                </div>

                {feature.info && (
                  <div className='flex-shrink-0'>
                    <ToolTipHelper helpText={feature.helpingText as string[]} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ScreenshotFeaturesSection;
