import { TweetPosition } from '@/types/types';

interface PositionSetterProps {
  position: TweetPosition;
  setPosition: (position: TweetPosition) => void;
}

function PositionSetter({ position, setPosition }: PositionSetterProps) {
  const positions: TweetPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-center',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  function handlePositionClick(selectedPosition: TweetPosition) {
    setPosition(selectedPosition);
  }

  return (
    <div className='grid grid-cols-3 place-items-center gap-2 bg-gray-300 dark:bg-gray-700 py-2 rounded-lg'>
      {positions.map(pos => (
        <button
          key={pos}
          onClick={() => handlePositionClick(pos)}
          className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-200 hover:scale-150 ${
            position === pos
              ? 'bg-blue-500 dark:bg-blue-400 shadow-md'
              : 'bg-gray-500 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
          }`}
          title={pos.replace('-', ' ')}
        />
      ))}
    </div>
  );
}

export default PositionSetter;
