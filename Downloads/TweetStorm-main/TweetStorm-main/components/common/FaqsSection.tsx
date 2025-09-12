'use client';
import { useState } from 'react';
import H2Heading from '../ai-tweet-generator/H2Heading';

type AccordionItems = {
  question: string;
  answer: string | JSX.Element;
};
function Faqs({ accordionItems }: { accordionItems: AccordionItems[] }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: any) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4'>
      <div className='mx-auto mt-8 sm:mt-20 px-4 sm:px-0 mb-5'>
        <H2Heading className='text-center text-[48px]! mb-10'> FAQs</H2Heading>
        <div className='space-y-0'>
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className='border-b border-gray-200 dark:border-gray-700'
            >
              <button
                type='button'
                className='flex items-center justify-between cursor-pointer w-full py-5 font-medium text-left text-sm sm:text-base text-gray-900 dark:text-white '
                onClick={() => toggleAccordion(index)}
                aria-expanded={openAccordion === index}
              >
                <span className='leading-relaxed'>{item.question}</span>
                <svg
                  className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                    openAccordion === index ? 'rotate-180' : ''
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
                  openAccordion === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                  <div className='text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line'>
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
