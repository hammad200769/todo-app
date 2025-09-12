'use client';
import { useState } from 'react';

const accordionItems = [
  {
    id: 1,
    question: "1. What is TweetStorm's X (Twitter) Video Downloader?",
    answer: (
      <div>
        <p className='mb-2'>
          TweetStorm&apos;s X Video Downloader is a free, browser-based tool
          that lets you download videos from Twitter (now X) instantly. No
          signup, no watermark, just paste the tweet link, click download and
          save the video in HD quality.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    question: '2. How do I copy a Twitter video link?',
    answer: (
      <div>
        <p className='mb-2'>To get the video link:</p>
        <ul className='list-disc pl-5'>
          <li>Open the tweet with the video</li>
          <li>
            Tap the <b>Share</b> icon
          </li>
          <li>
            Select <b>Copy link</b>, the URL is now in your clipboard and ready
            to paste into the downloader.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    question: '3. How can I download a video from X (Twitter)?',
    answer: (
      <div>
        <p className='mb-2'>Just follow these steps:</p>
        <ul className='list-disc pl-5'>
          <li>Paste the copied tweet URL into the downloader field</li>
          <li>
            Click <b>Download</b>
          </li>
          <li>Choose your preferred resolution</li>
          <li>Click to save the video in MP4 format to your device</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    question: '4. Is this Twitter video downloader free to use?',
    answer: (
      <div>
        <p className='mb-2'>
          Yes! TweetStorm&apos;s downloader is 100% free. There are no hidden
          fees, no watermarks and no account required.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    question: '5. Can I download Twitter videos in HD?',
    answer: (
      <div>
        <p className='mb-2'>
          Absolutely. The tool supports high-resolution formats so you can save
          memes, tutorials or reels in crisp MP4 quality.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    question: '6. Does this work on mobile devices too?',
    answer: (
      <div>
        <p className='mb-2'>
          Yes, the downloader is fully optimized for mobile. You can save
          Twitter videos directly to your phone without installing an app.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    question:
      '7. Can I use this tool to download videos from retweets or threads?',
    answer: (
      <div>
        <p className='mb-2'>
          Yes. Our tool supports videos embedded in retweets, quote tweets and
          threads. Just grab the original tweet link and paste it.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    question: '8. Is it legal to download videos from Twitter/X?',
    answer: (
      <div>
        <p className='mb-2'>
          TweetStorm&apos;s tool is for personal and fair use only. Always
          respect the rights of the content creator and provide credit when
          repurposing or reposting.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    question: '9. What makes TweetStorm better than other Twitter downloaders?',
    answer: (
      <div>
        <p className='mb-2'>
          Unlike basic downloaders, TweetStorm is part of a full Twitter
          automation suite, including tweet generation, reply tools and hashtag
          helpers. You&apos;re not just saving videos, you&apos;re scaling your
          Twitter presence.
        </p>
      </div>
    ),
  },
];
function Faqs() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: any) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <div className='mx-auto mt-8 sm:mt-20 px-4 sm:px-0 mb-5'>
      <h2 className='text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6'>
        FAQs
      </h2>
      <div className='space-y-0'>
        {accordionItems.map(item => (
          <div
            key={item.id}
            className='border-b border-gray-200 dark:border-gray-700'
          >
            <button
              type='button'
              className='flex items-center justify-between cursor-pointer w-full py-5 font-medium text-left text-sm sm:text-base text-gray-900 dark:text-white '
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={openAccordion === item.id}
            >
              <span className='leading-relaxed'>{item.question}</span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openAccordion === item.id ? 'rotate-180' : ''
                }`}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 6'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5 5 1 1 5'
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openAccordion === item.id
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                <div className='text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300'>
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqs;
