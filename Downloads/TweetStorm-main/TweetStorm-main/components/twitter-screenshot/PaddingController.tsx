import { PaddingOptionsPostEditor } from '@/utils/constants';
import React from 'react';

interface PaddingControllerProps {
  padding: number;
  setPadding: (value: number) => void;
  paddingX: number;
  setPaddingX: (value: number) => void;
  paddingY: number;
  setPaddingY: (value: number) => void;
  isCustomPadding: boolean;
  showCustomPadding: boolean;
  setShowCustomPadding: (value: boolean) => void;
  customPaddingValue: string;
  setCustomPaddingValue: (value: string) => void;
  handleCustomPaddingKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleCustomPaddingSubmit: () => void;
  showXYPadding?: boolean;
  setShowXYPadding: (value: boolean) => void;
}

function PaddingController({
  padding,

  paddingX = 0,
  setPaddingX,
  setPaddingY,
  paddingY = 0,
  setPadding,
  isCustomPadding,
  showCustomPadding,
  setShowCustomPadding,
  customPaddingValue,
  handleCustomPaddingKeyPress,
  handleCustomPaddingSubmit,
  showXYPadding = false,
  setShowXYPadding,
}: PaddingControllerProps) {
  // Handle X padding submit
  function handleCustomPaddingXSubmit() {
    const value = paddingX;
    if (!isNaN(value) && value >= 0 && value <= 200) {
      setPaddingX(value);
    }
  }

  // Handle Y padding submit
  function handleCustomPaddingYSubmit() {
    const value = paddingY;
    if (!isNaN(value) && value >= 0 && value <= 200) {
      setPaddingY(value);
    }
  }

  // Handle Enter/Escape for X padding
  function handleCustomPaddingXKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleCustomPaddingXSubmit();
    }
    if (e.key === 'Escape') {
      setPaddingX(0);
    }
  }

  // Handle Enter/Escape for Y padding
  function handleCustomPaddingYKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleCustomPaddingYSubmit();
    }
    if (e.key === 'Escape') {
      setPaddingY(0);
    }
  }
  return (
    <>
      {/* Enhanced Padding Section */}
      <div className='mb-4'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Padding
          </span>
          <div className='flex items-center gap-2'>
            {/* Toggle between unified and X/Y padding */}
            <button
              onClick={() => setShowXYPadding(!showXYPadding)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                showXYPadding
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {showXYPadding ? 'X/Y Mode' : 'Unified'}
            </button>
            {(isCustomPadding || paddingX > 0 || paddingY > 0) && (
              <span className='text-xs text-blue-600 dark:text-blue-400 font-medium'>
                {showXYPadding
                  ? `X:${paddingX}px Y:${paddingY}px`
                  : `Custom: ${padding}px`}
              </span>
            )}
          </div>
        </div>

        {showXYPadding ? (
          // X/Y Padding Controls
          <div className='space-y-3'>
            {/* X Padding */}
            <div>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs text-gray-600 dark:text-gray-300'>
                  Horizontal (X)
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {paddingX}px
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='range'
                  min='0'
                  max='200'
                  value={paddingX}
                  onChange={e => setPaddingX(Number(e.target.value))}
                  className='flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer'
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      (paddingX / 200) * 100
                    }%, #e5e7eb ${(paddingX / 200) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <input
                  type='number'
                  value={paddingX}
                  onChange={e => setPaddingX(Number(e.target.value))}
                  onKeyDown={handleCustomPaddingXKeyPress}
                  onBlur={handleCustomPaddingXSubmit}
                  min='0'
                  max='200'
                  className='w-16 px-1 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Y Padding */}
            <div>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs text-gray-600 dark:text-gray-300'>
                  Vertical (Y)
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {paddingY}px
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='range'
                  min='0'
                  max='200'
                  value={paddingY}
                  onChange={e => setPaddingY(Number(e.target.value))}
                  className='flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer'
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      (paddingY / 200) * 100
                    }%, #e5e7eb ${(paddingY / 200) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <input
                  type='number'
                  value={paddingY}
                  onChange={e => setPaddingY(Number(e.target.value))}
                  onKeyDown={handleCustomPaddingYKeyPress}
                  onBlur={handleCustomPaddingYSubmit}
                  min='0'
                  max='200'
                  className='w-16 px-1 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>
        ) : (
          // Original Unified Padding Controls
          <>
            {/* Predefined Padding Options */}
            <div className='flex gap-2 mb-2 flex-wrap'>
              {PaddingOptionsPostEditor.map((pad: number) => (
                <button
                  key={pad}
                  onClick={() => setPadding(pad)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    padding === pad && !isCustomPadding
                      ? 'text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {pad}
                </button>
              ))}

              {/* Custom Padding Button */}
              <button
                onClick={() => {
                  setShowCustomPadding(!showCustomPadding);
                }}
                className={`px-3 py-1 text-sm rounded transition-colors border border-dashed ${
                  showCustomPadding || isCustomPadding
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom Padding Input */}
            {showCustomPadding && (
              <div className='mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    value={customPaddingValue}
                    onChange={e => setPadding(Number(e.target.value))}
                    onKeyDown={handleCustomPaddingKeyPress}
                    placeholder='Enter padding (0-200)'
                    min='0'
                    max='200'
                    className='flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                  <button
                    onClick={handleCustomPaddingSubmit}
                    className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomPadding(false);
                    }}
                    className='px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  >
                    ✕
                  </button>
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  Press Enter to apply, Escape to cancel
                </div>
              </div>
            )}

            {/* Current Padding Display */}
            {!showCustomPadding && (
              <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                Current: {padding}px
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PaddingController;
