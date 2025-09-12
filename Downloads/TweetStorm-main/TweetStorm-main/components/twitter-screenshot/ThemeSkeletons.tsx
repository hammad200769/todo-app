import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { DarkModeIcon, LightModeIcon } from '../icons';

interface ThemeSkeletonsProps {
  theme?: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'dark' | 'light' | string>>;
  scTheme?: 'light' | 'dark' | string;
  handleThemeChange: (theme: 'light' | 'dark' | string) => void;
}

function ThemeSkeletons({
  theme = 'light',
  setTheme,
  scTheme,
  handleThemeChange,
}: ThemeSkeletonsProps) {
  const isDark = theme === 'dark';
  return (
    <div
      className={clsx(
        'relative p-4 rounded-xl border-4 cursor-pointer transition-all duration-300 hover:scale-105',
        isDark ? 'bg-gray-800' : 'bg-white',
        isDark && scTheme === 'dark' && 'border-primary',
        !isDark && scTheme === 'light' && 'border-primary'
      )}
      onClick={() => {
        setTheme(isDark ? 'dark' : 'light');
        handleThemeChange(isDark ? 'dark' : 'light');
      }}
    >
      <div
        className={clsx(
          'absolute top-3 right-3 p-1.5 rounded-full text-gray-50',
          isDark ? 'bg-gray-800' : 'bg-gray-400'
        )}
      >
        {isDark ? <DarkModeIcon /> : <LightModeIcon />}
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex gap-1'>
          <div
            className={clsx(
              'w-5 h-5 rounded-full',
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            )}
          ></div>
          <div className='flex flex-col gap-2 mb-2'>
            <div
              className={clsx(
                'h-2 w-12 rounded',
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              )}
            ></div>
            <div
              className={clsx(
                'h-1 w-5 rounded',
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              )}
            ></div>
          </div>
        </div>

        <div className='flex-1'>
          <div
            className={clsx(
              'h-3 w-14 rounded mb-2',
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            )}
          ></div>
          <div
            className={clsx(
              'h-3 w-16 rounded mb-3',
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            )}
          ></div>

          <div className='flex gap-2'>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={clsx(
                  'h-1 w-5 rounded',
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                )}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSkeletons;
