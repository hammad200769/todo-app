import { CHROME_TWEET_GENERATOR_EXTENSION_LINK, URLS } from '@/utils/constants';
import Link from 'next/link';
import {
  BirdIcon,
  HeroXIcon,
  PurpleStartIcon,
  RightArrowIcon,
  RobotsIcon,
  StarIcon,
} from '../icons';
import StickyNav from './navigation/StickyNav';

function LandingPageMainSection() {
  return (
    <div className='relative z-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-slate-800 dark:via-gray-900 dark:to-black light:from-gray-50 light:via-white light:to-gray-100 lg:min-h-screen flex flex-col transition-colors duration-300'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/5 light:bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 light:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700'></div>
      </div>

      <StickyNav />

      <section className='pt-[0.5px] grow flex flex-col relative'>
        <div className='relative responsive-pad z-20 grow flex items-center pt-20 pb-32 lg:pt-0 lg:pb-0'>
          <div className='max-content-w mx-auto grow'>
            <div className='grid lg:grid-cols-[2fr_1fr] xl:grid-cols-2 gap-12 items-center'>
              <article className='order-2 lg:order-1 mt-8 sm:mt-16  lg:mt-20'>
                <div className='mb-6 flex justify-center lg:justify-start'>
                  <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r dark:from-blue-500/10 dark:to-purple-500/10 from-blue-500/20 to-purple-500/20 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-500/30 text-blue-500 dark:text-blue-300 light:text-blue-700 text-sm font-medium backdrop-blur-sm'>
                    <StarIcon />
                    AI-Powered X Tools
                  </div>
                </div>

                <h1 className='text-center mb-4 text-4xl sm:text-5xl font-bold lg:text-left xl:text-6xl leading-[1.1]'>
                  <span className='bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 dark:from-white dark:via-gray-100 dark:to-gray-200 light:from-gray-900 light:via-gray-800 light:to-gray-700 bg-clip-text text-transparent'>
                    X Automation,
                  </span>
                  <br />
                  <span className='bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent'>
                    Growth & Cleanup Tools
                  </span>
                </h1>

                <p className='mx-auto text-center mb-10 max-w-xl text-lg text-gray-500 dark:text-gray-300 light:text-gray-600 lg:mx-0 lg:text-left lg:text-xl'>
                  Generate tweets, clean up old posts, bulk-manage likes,
                  follows, and more.
                </p>

                <div className='mb-12 flex flex-wrap gap-3 justify-center lg:justify-start'>
                  <div className='flex items-center px-3 py-1.5 dark:bg-gray-800/40 bg-gray-200/60 border  dark:border-gray-700/50 border-gray-300/60 rounded-full text-sm dark:text-gray-300 text-gray-600 backdrop-blur-sm'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full mr-2'></div>
                    AI Content Generation
                  </div>
                  <div className='flex items-center px-3 py-1.5 dark:bg-gray-800/40 bg-gray-200/60 border  dark:border-gray-700/50 border-gray-300/60 rounded-full text-sm dark:text-gray-300 text-gray-600 backdrop-blur-sm'>
                    <div className='w-2 h-2 bg-blue-400 rounded-full mr-2'></div>
                    Bulk Management
                  </div>
                </div>

                <div className='flex flex-col flex-wrap sm:flex-row items-center justify-center lg:items-start lg:justify-start gap-4'>
                  <Link
                    href={URLS.signup}
                    className='group relative overflow-hidden px-12 py-4 text-center rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 hover:bg-pos-100 font-semibold text-white focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-gray-900 light:focus:ring-offset-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25'
                  >
                    <span className='relative z-10 flex items-center'>
                      Get Started Now
                      <span className='ml-2 inline-block transform transition-transform group-hover:translate-x-1 mt-0.5'>
                        <RightArrowIcon />
                      </span>
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                  </Link>

                  <Link
                    href={CHROME_TWEET_GENERATOR_EXTENSION_LINK}
                    target='_blank'
                    className='group flex items-center gap-2 px-6 py-4 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 border  dark:border-gray-600 border-gray-300  dark:hover:border-gray-500 hover:border-gray-400 rounded-xl transition-all duration-300  dark:hover:bg-gray-800/30 hover:bg-gray-100/60 backdrop-blur-sm'
                    role='button'
                  >
                    <span>Browser Extension</span>
                    <svg
                      className='w-5 h-5 group-hover:translate-x-1 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      height='1.3em'
                      width={'1.3em'}
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </Link>
                </div>

                <div className='mt-4 pt-4 border-t dark:border-gray-800/50 border-gray-200/60'>
                  <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-gray-400 dark:text-gray-400 light:text-gray-500'>
                    <div className='flex items-center'>
                      <div className='flex -space-x-1 mr-1'>
                        <div className='text-xl'>🏅</div>
                      </div>
                      <span>Trusted by 5,200+ users</span>
                    </div>
                  </div>
                </div>
              </article>

              <div className='hidden! order-1 lg:order-2 lg:justify-end lg:flex! md:justify-center'>
                <div className='relative'>
                  <div className='relative w-80 h-80 xl:w-96 xl:h-96'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-spin-slow'></div>
                    <div className='absolute inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-spin-reverse-slow'></div>
                    <div className='absolute inset-8 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full animate-spin-slow'></div>

                    <div className='absolute inset-12 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-full border-4 dark:border-gray-700 border-gray-300 shadow-2xl flex items-center justify-center'>
                      <div className='w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl'>
                        <RobotsIcon />
                      </div>
                    </div>

                    <div className='absolute top-4 right-4 w-12 h-12 bg-blue-500/30 dark:bg-blue-500/30 light:bg-blue-500/50 rounded-lg rotate-12 animate-bounce flex items-center justify-center'>
                      <BirdIcon />
                    </div>

                    <div className='absolute bottom-8 left-2 w-10 h-10 bg-purple-500/30 dark:bg-purple-500/30 light:bg-purple-500/50 rounded-full -rotate-12 animate-pulse flex items-center justify-center'>
                      <PurpleStartIcon />
                    </div>

                    <div className='absolute top-16 left-0 w-8 h-8 bg-pink-500/30 dark:bg-pink-500/30 light:bg-pink-500/50 rounded-lg rotate-45 animate-bounce delay-300 flex items-center justify-center'>
                      <HeroXIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPageMainSection;

// Add these CSS animations to your global CSS file:
/*

*/
