type CircularLoaderProps = {
  width?: number;
  height?: number;
  borderWidth?: number;
};

function CircularLoader({
  width = 48,
  height = 48,
  borderWidth = 5,
}: CircularLoaderProps) {
  return (
    <div className='flex-cc'>
      <div
        className='animate-spin rounded-[50%] border-t-gray-800 border-gray-300'
        style={{ width, height, borderWidth }}
      ></div>
    </div>
  );
}

export default CircularLoader;
