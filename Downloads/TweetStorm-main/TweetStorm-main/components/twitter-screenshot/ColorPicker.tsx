'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { DisableIcon } from '../icons';

function ColorPicker({
  value,
  onChange,
  label,
}: {
  value: string | undefined;
  onChange: (color: string) => void;
  label: string;
}) {
  const [customColor, setCustomColor] = useState(value);

  const presetColors = [
    '#FFFFFF',
    '#f3f4f6',
    '#3b82f6',
    '#10b981',
    '#8b5cf6',
    '#6366f1',
    '#000000',
    '#ef4444',
    '#f59e0b',
    '#84cc16',
    '#06b6d4',
    '#ec4899',
    '#6b7280',
  ];

  function handleColorChange(color: string) {
    setCustomColor(color);
    onChange(color);
  }

  function handleRemoveColor() {
    setCustomColor('transparent');
    onChange('transparent');
  }

  return (
    <div className='mb-4'>
      <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
        {label}
      </span>
      <div className='flex gap-2 items-center align-middle mb-3 flex-wrap'>
        {presetColors.map(color => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={clsx(
              'w-8 h-8 rounded border-2',
              value === color
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300 dark:border-gray-600'
            )}
            style={{ backgroundColor: color }}
          />
        ))}
        <button
          onClick={handleRemoveColor}
          className='w-8 h-8 text-sm flex items-center text-red-500 hover:underline self-start'
        >
          <DisableIcon />
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          Custom Color
        </span>
        <span className='flex items-center gap-2'>
          <input
            type='color'
            value={customColor}
            onChange={e => handleColorChange(e.target.value)}
            className='w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer'
          />
          <input
            type='text'
            value={customColor}
            onChange={e => handleColorChange(e.target.value)}
            className='flex-1 text-sm text-gray-500 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 outline-none focus:border-blue-500'
            placeholder='#ffffff'
          />
        </span>
      </div>
    </div>
  );
}

export default ColorPicker;
