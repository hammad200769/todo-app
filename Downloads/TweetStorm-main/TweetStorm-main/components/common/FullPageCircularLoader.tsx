function FullPageCircularLoader() {
  return (
    <div className='fixed inset-0 bg-black/30 flex-cc'>
      <div className='animate-spin rounded-[50%] border-t-black border-white border-[5px] h-14 w-14'></div>
    </div>
  );
}

export default FullPageCircularLoader;
