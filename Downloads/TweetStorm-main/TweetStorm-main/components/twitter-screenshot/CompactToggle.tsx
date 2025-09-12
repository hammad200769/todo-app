function CompactToggle({
  label,
  value,
  onChange,
  size = 'sm',
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  size?: 'sm' | 'xs';
}) {
  const toggleSize = size === 'xs' ? 'h-4 w-7' : 'h-5 w-9';
  const dotSize = size === 'xs' ? 'h-3 w-3' : 'h-3.5 w-3.5';
  const translate = size === 'xs' ? 'translate-x-3' : 'translate-x-4';

  return (
    <div className='flex items-center justify-between py-1.5'>
      <span
        className={`text-xs text-gray-600 dark:text-gray-300 ${
          size === 'xs' ? 'text-xs' : 'text-sm'
        }`}
      >
        {label}
      </span>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex ${toggleSize} items-center rounded-full transition-colors ${
          value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block ${dotSize} transform rounded-full bg-white transition-transform ${
            value ? translate : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default CompactToggle;
