import {
  MASS_TWEET_DELETIONS_EXTENSION_LINK,
  MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX,
} from '@/utils/constants';
import Link from 'next/link';
import { ChromeIconColorFull, TickIcon } from '../icons';
import { FirefoxIconColorFull } from '../icons/FirefoxIconColorFull';

type HeroSectionProps = {
  heading: string;
  subheading: string;
  features: string[];
  videoUrl: string;
};

function HeroSection({
  heading,
  subheading,
  features,
  videoUrl,
}: HeroSectionProps) {
  return (
    <section className='py-14 sm:py-20 lg:py-36'>
      <div className='lg:pl-6'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-x-4 gap-y-8 mx-auto max-w-[1320px]'>
          <div className='px-6 lg:px-0 text-center lg:text-left max-w-3xl mx-auto lg:mx-0'>
            <h1 className='text-4xl sm:text-[42px] xl:text-[46px] font-extrabold leading-[1.1]!'>
              {heading}
            </h1>
            <h2 className='text-xl sm:text-2xl font-semibold leading-[1.1]! mb-4 mt-2'>
              {subheading}
            </h2>
            <ul className='mt-10 text-primary-dark dark:text-white space-y-2.5 w-fit mx-auto lg:mx-0 text-lg text-left'>
              {features.map((feature, index) => (
                <li key={index} className='flex-c font-medium gap-2'>
                  <span className='dark:text-green-400 text-green-700'>
                    <TickIcon width='1.7em' height='1.7em' />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className='mt-8'>
              <p className='text-primary-dark dark:text-white font-semibold uppercase'>
                Install Browser Extension
              </p>
              <div className='mt-2 flex flex-wrap gap-x-4 gap-y-4 items-center justify-center text-lg lg:justify-start text-center font-medium text-primary-dark dark:text-white'>
                <Link
                  href={MASS_TWEET_DELETIONS_EXTENSION_LINK}
                  target='_blank'
                  className='flex-cc font-bold gap-3 py-3 px-6 bg-primary text-white rounded-md border-primary-dark hover:scale-[102%] transition-transform'
                >
                  <ChromeIconColorFull width='2.4rem' height='2.4rem' />
                  <span>Add to Chrome</span>
                </Link>
                <Link
                  href={MASS_TWEET_DELETIONS_EXTENSION_LINK_FIREFOX}
                  target='_blank'
                  className='flex-cc font-bold gap-3 py-3 px-6 bg-primary text-white rounded-md border-primary-dark hover:scale-[102%] transition-transform'
                >
                  <FirefoxIconColorFull width='2.4rem' height='2.4rem' />
                  <span>Add to Firefox</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='px-1 max-w-3xl mx-auto'>
            <div className='px-2 py-2 rounded-[12px] shadow-lg bg-neutral-gray__dark dark:bg-[#121212]'>
              <video controls autoPlay={true} loop muted className='rounded-lg'>
                <source src={videoUrl} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
