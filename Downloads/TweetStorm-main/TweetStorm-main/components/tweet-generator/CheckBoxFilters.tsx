import React from 'react';

type CheckboxFilterTypes = {
  label: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CheckboxFilter({ label, isChecked, onChange }: CheckboxFilterTypes) {
  return (
    <label className='flex items-center gap-1.5'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
        className='w-4 h-4 rounded-xs'
      />
      <span className='text-sm'>{label}</span>
    </label>
  );
}

export default CheckboxFilter;
