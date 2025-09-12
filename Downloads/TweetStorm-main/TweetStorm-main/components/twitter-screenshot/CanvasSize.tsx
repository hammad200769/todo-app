import { canvasSizes } from '@/utils/constants';
import { Dispatch, SetStateAction } from 'react';

interface CanvasSizeProps {
  canvasWidth: string | number;
  canvasHeight: string | number;
  setCanvasWidth: (width: string) => void;
  setCanvasHeight: (height: string) => void;
  setCanvasAspectRatio: Dispatch<SetStateAction<string | null>>;
  showSizeMenu: boolean;
  setShowSizeMenu: (value: boolean) => void;
}
function CanvasSize({
  canvasWidth,
  canvasHeight,
  setCanvasWidth,
  setCanvasHeight,
  setCanvasAspectRatio,
  showSizeMenu,
  setShowSizeMenu,
}: CanvasSizeProps) {
  return (
    <>
      <div className='mb-4 relative'>
        <button
          onClick={() => setShowSizeMenu(!showSizeMenu)}
          className='w-full flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
        >
          <span>Canvas Size</span>
          <span
            className={`transform transition-transform ${
              showSizeMenu ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </button>
        {/* Current size display */}
        <div className='text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md'>
          Current: {canvasWidth} × {canvasHeight}
        </div>
        {showSizeMenu && (
          <div className='absolute top-full left-0 right-0 z-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 max-h-48 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-2'>
              {canvasSizes.map(size => (
                <button
                  key={`${size.label}`}
                  onClick={() => {
                    setCanvasHeight(size.height as string);
                    setCanvasWidth(size.width as string);
                    setCanvasAspectRatio(size.aspectRatio as string);
                    setShowSizeMenu(false);
                  }}
                  className={`px-3 py-2 text-sm rounded transition-colors text-left ${
                    canvasWidth === size.width && canvasHeight === size.height
                      ? 'text-gray-900 dark:text-white bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className='font-medium'>{size.label}</div>
                  <div className='text-xs text-gray-500 dark:text-gray-400'>
                    {size.width} × {size.height}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CanvasSize;
