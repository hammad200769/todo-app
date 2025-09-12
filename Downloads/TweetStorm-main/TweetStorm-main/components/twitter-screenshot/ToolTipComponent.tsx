// Updated ToolTipComponent
import clsx from 'clsx';
import { LockIcon } from '../icons';

function ToolTipComponent({
  message,
  presets,
  showOnParentHover = false,
}: {
  message: string;
  presets?: boolean;
  showOnParentHover?: boolean;
}) {
  return (
    <div
      className={clsx(
        'relative flex items-center text-gray-500 dark:text-gray-400 text-sm cursor-default',
        !showOnParentHover && 'group'
      )}
    >
      <LockIcon />

      <div
        className={clsx(
          'absolute mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs px-3 py-2 text-xs text-white bg-black rounded-lg transition-opacity duration-200 pointer-events-none z-10',
          presets ? 'top-full' : 'bottom-full',
          showOnParentHover
            ? 'opacity-0 group-hover:opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        )}
      >
        {message}
      </div>
    </div>
  );
}

export default ToolTipComponent;
