import { URLS } from '@/utils/constants';
import Image from 'next/image';
import { InlineLink } from '../common/Links';
import Faqs from './Faqs';

const useCase = [
  {
    title: 'Research & Content Saving',
    desc: 'Save videos from favorite creators to study trends, archive insights, and keep content offline.',
  },
  {
    title: 'Repurposing Content',
    desc: 'Download clips for quoting, editing, or repurposing into your own content (with credit where needed).',
  },
  {
    title: 'Mobile-Friendly Interface',
    desc: "Optimized for touch. Save clips directly to your phone's gallery — no extra apps required.",
  },
  {
    title: 'Integrated with Twitter Suite',
    desc: (
      <>
        Combine video downloads with{' '}
        <InlineLink href={URLS.tweetGeneration}>tweet generation</InlineLink>,
        hashtag tools, and smart replies to upgrade your workflow.
      </>
    ),
  },
];

const getVideoLink = [
  {
    step: 1,
    text: (
      <>
        Open <InlineLink href='https://x.com'>X</InlineLink> and find the video
        you want to save.
      </>
    ),
  },
  { step: 2, text: 'Tap the share icon below the tweet.' },
  {
    step: 3,
    text: 'Click on the share icon (usually an arrow) below the video.',
    img: '/img/video-share-button.png',
    alt: 'Share button on X (Twitter)',
  },
  {
    step: 4,
    text: "Click on 'Copy link to Tweet'. This will copy the video link to your clipboard.",
    img: '/img/copy-link-download.png',
    alt: 'Copy link to Tweet',
  },
];

const whyChoose = [
  {
    title: 'Completely Free & No Limits',
    desc: 'Download as many Twitter videos as you want, no paywalls, no signup required.',
  },
  {
    title: 'HD Quality Downloads',
    desc: "Whether it's memes, tutorials, or viral clips, get clean MP4 downloads in top quality.",
  },
  {
    title: 'Works Across All Devices',
    desc: 'Desktop, mobile, or tablet — optimized for all major browsers.',
  },
  {
    title: 'Re-download from Retweets or Threads',
    desc: 'Handles media embedded in retweets, quote tweets, and threads.',
  },
  {
    title: 'Part of TweetStormAI Toolkit',
    desc: 'Download videos and access tweet generators, automation, and more.',
  },
];

function Content() {
  return (
    <div className='w-full'>
      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center'>
          What is X Video Downloader?
        </h2>
        <p className='text-gray-600 dark:text-gray-300 sm:text-base leading-relaxed max-w-3xl mx-auto mb-4'>
          X Video Downloader by <InlineLink href='/'>TweetStorm.ai</InlineLink>{' '}
          is a lightweight yet powerful Twitter Video Downloader that lets you
          save videos from X (Twitter) in just a few clicks. Whether you&apos;re
          collecting trending reels, archiving campaign clips, or downloading
          meme replies for fun, this tool does the job fast.
        </p>
        <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-4'>
          Designed for smooth performance, it supports multiple formats and
          high-quality downloads. No signups. No watermark. Just paste, click
          and save.
        </p>
        <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto'>
          To use the Twitter Video Downloader, just paste the tweet URL into the{' '}
          <InlineLink href='/'>TweetStorm</InlineLink>&apos;s tool, click
          &quot;Download&quot;, and instantly save the video in your preferred
          format.
        </p>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8'>
          How to Get a Video Link
        </h2>

        <div className='space-y-6'>
          {getVideoLink.map((item, idx) => (
            <div
              key={idx}
              className='flex flex-col sm:items-start gap-x-4 gap-y-2 p-4'
            >
              <div className='flex w-full items-center gap-4'>
                <span className='w-10 h-10 flex items-center justify-center bg-primary font-bold rounded-full shadow-sm text-white'>
                  {item.step}
                </span>
                <p className='text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed'>
                  {item.text}
                </p>
              </div>

              <div className='space-y-3'>
                {item.img && (
                  <div className='flex justify-center sm:justify-start'>
                    <Image
                      src={item.img}
                      alt={`${item.alt}`}
                      width={303}
                      height={438}
                      className='rounded-lg shadow-md max-w-full sm:max-w-sm'
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8'>
          How to Download a Video
        </h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            'Paste the copied tweet URL into the input field above.',
            'Click Download to fetch video formats.',
            'Choose from available quality/resolution options.',
            'Click your preferred format to save the Twitter video directly to your device.',
          ].map((text, idx) => (
            <div
              key={idx}
              className='flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm'
            >
              <div className='w-10 h-10 flex items-center justify-center bg-primary text-white font-bold rounded-full mb-3'>
                {idx + 1}
              </div>
              <p className='text-gray-700 dark:text-gray-200'>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8'>
          Why Choose TweetStorm&apos;s X Video Downloader?
        </h2>
        <div className='flex justify-center mb-8'>
          <Image
            src='/img/why-choose-tweetstorm.webp'
            alt='Why Choose TweetStorm X Twitter Video Downloader, TweetStormAI'
            width={851}
            height={315}
            className='rounded-lg shadow-md'
          />
        </div>
        <div className='grid sm:grid-cols-2 gap-6'>
          {whyChoose.map((item, idx) => (
            <div
              key={idx}
              className='p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm'
            >
              <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                {item.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-base'>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold mb-8'>
          Built for Speed, Simplicity & Real Use Cases
        </h2>
        <div className='flex justify-center mb-8'>
          <Image
            src='/img/video-downloader-user-cases.webp'
            alt="TweetStorm's Twitter Video Downloader is Built for Speed, Simplicity and Smart Use Cases, TweetStormAI"
            width={851}
            height={315}
            className='rounded-lg shadow-md'
          />
        </div>
        <div className='grid sm:grid-cols-2 gap-6'>
          {useCase.map((item, idx) => (
            <div
              key={idx}
              className='p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm'
            >
              <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                {item.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-base'>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Faqs />
    </div>
  );
}

export default Content;
