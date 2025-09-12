import { TweetPreset } from '@/types/types';

interface PresetsProps {
  presetName: string;
  setPresetName: (name: string) => void;
  addPreset: () => void;
  presets: TweetPreset[];
  deletePreset: (presetId: number) => void;
  usingPreset: (options: TweetPreset['options']) => void;
}

function Presets({
  presetName,
  setPresetName,
  addPreset,
  deletePreset,
  presets,
  usingPreset,
}: PresetsProps) {
  return (
    <div className='space-y-6'>
      {/* Presets Table */}
      <div className='bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-900 overflow-hidden'>
        <div className='px-6 py-4'>
          <h3 className='text-lg font-semibold text-gray-900'>Saved Presets</h3>
        </div>

        {presets && presets.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full divide-y divide-gray-200 dark:divide-gray-600'>
              <thead className='bg-gray-50'>
                <tr className='dark:bg-gray-500'>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-50 uppercase tracking-wider'>
                    Preset Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-50 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {presets.map((preset, index) => (
                  <tr
                    key={preset.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-700 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-base font-medium text-gray-900 dark:text-gray-50'>
                        {preset.preset_name}
                      </div>
                    </td>
                    <td className='p-3 flex gap-2 whitespace-nowrap'>
                      <button
                        onClick={() => usingPreset(preset.options)}
                        className='inline-flex cursor-pointer items-center py-2 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
                      >
                        Use
                      </button>
                      <button
                        onClick={() => deletePreset(preset.id)}
                        className='inline-flex cursor-pointer items-center py-2 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='px-6 py-8 text-center'>
            <div className='text-gray-500'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400 mb-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
              <p className='text-base font-medium text-gray-900 dark:text-gray-200 mb-1'>
                No presets yet
              </p>
              <p className='text-base text-gray-500 dark:text-gray-200'>
                Create your first preset below
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add New Preset */}
      <div className='bg-white dark:bg-gray-700 rounded-lg shadow-sm border dark:border-gray-900 border-gray-200 p-6'>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            Add New Preset
          </h3>
          <p className='text-base text-gray-600 dark:text-gray-200'>
            Save your current settings as a preset for quick access later.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex-1'>
            <label htmlFor='preset-name' className='sr-only'>
              Preset name
            </label>
            <input
              id='preset-name'
              type='text'
              placeholder='Enter preset name...'
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 transition-colors'
            />
          </div>
          <button
            onClick={() => addPreset()}
            disabled={!presetName.trim()}
            className='px-6 py-2 bg-primary cursor-pointer text-white font-medium rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-primary-disabled__dark disabled:cursor-not-allowed transition-colors'
          >
            Add Preset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Presets;
