import { TwitterIconOutlined } from '../icons';

interface HeadingProps {
  headingType: string;
  text: string;
}
function Heading({ headingType, text }: HeadingProps) {
  return (
    <div className='pt-12 sm:pt-16 lg:pt-20'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold flex flex-wrap items-center justify-center gap-2'>
        <span className='text-3xl sm:text-5xl lg:text-6xl'> Twitter</span>
        (<TwitterIconOutlined height='1em' width='1em' />)
        <span className='text-3xl sm:text-5xl lg:text-6xl'>{headingType}</span>
        <span className='text-3xl sm:text-5xl lg:text-6xl'>
          Video Downloader
        </span>
      </h1>
      <p className='text-center text-base sm:text-lg lg:text-xl mt-4 px-4'>
        {text}
      </p>
    </div>
  );
}

export default Heading;
