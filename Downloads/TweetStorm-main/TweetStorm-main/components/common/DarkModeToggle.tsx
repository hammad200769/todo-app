import { useTheme } from '@/hooks/hooks';
import { THEME } from '@/types/types';
import clsx from 'clsx';
import { DarkModeIcon, LightModeIcon } from '../icons';

// mr-3 lg:ml-4

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex-cc'>
      <button
        onClick={toggleTheme}
        aria-label='Toggle dark mode'
        className={clsx(
          'p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out focus:outline-hidden focus:ring-4 focus:ring-primary focus:ring-opacity-50',
          theme === THEME.Light
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            : 'bg-gray-700 text-white hover:bg-gray-600'
        )}
      >
        {theme === THEME.Light ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </div>
  );
}

export default DarkModeToggle;
