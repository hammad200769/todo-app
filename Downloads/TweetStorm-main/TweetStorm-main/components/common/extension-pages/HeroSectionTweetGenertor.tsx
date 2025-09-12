import { ChromeIconColorFull } from '@/components/icons';
import { FirefoxIconColorFull } from '@/components/icons/FirefoxIconColorFull';
import {
  CHROME_TWEET_GENERATOR_EXTENSION_LINK,
  FIREFOX_TWEET_GENERATOR_EXTENSION_LINK,
} from '@/utils/constants';
import Link from 'next/link';

type HeroSectionProps = {
  heading: string;
  subheading: string;
};

function HeroSectionForTweetGenerator({
  heading,
  subheading,
}: HeroSectionProps) {
  return (
    <section className='py-20 md:py-40'>
      <div className='responsive-pad'>
        <div className='text-center max-w-5xl mx-auto'>
          <h1 className='text-3xl sm:text-5xl font-bold leading-[1.1]! mb-4'>
            {heading}
          </h1>
          {/* <p className='text-lg'>{subheading}</p> */}
          <h2 className='text-xl font-medium mb-4 mt-2'>{subheading}</h2>

          <div className='mt-16'>
            <p className='text-primary-dark dark:text-white font-semibold uppercase'>
              Install Browser Extension
            </p>{' '}
            <div className='mt-4 flex flex-col md:flex-row gap-x-8 gap-y-4 justify-center items-center text-center text-lg font-bold text-primary-dark dark:text-white'>
              <Link
                href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                target='_blank'
                className='flex-cc gap-3 py-3 px-6 bg-primary text-white rounded-md border-primary-dark hover:scale-[102%] transition-transform'
              >
                <ChromeIconColorFull width='3rem' height='3rem' />
                <span>Add to Chrome</span>
              </Link>
              <Link
                href={FIREFOX_TWEET_GENERATOR_EXTENSION_LINK}
                target='_blank'
                className='flex-cc gap-3 py-3 px-6 bg-primary text-white rounded-md border-primary-dark hover:scale-[102%] transition-transform'
              >
                <FirefoxIconColorFull width='3rem' height='3rem' />
                <span>Add to Firefox</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionForTweetGenerator;
