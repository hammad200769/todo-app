import { useEffect } from 'react';
import CopyGeneratedContentButton from '../common/CopyGeneratedContentButton';
import TweetContentContainer from '../common/TweetContentContainer';
import TweetGeneratedContentLink from '../common/TweetGeneratedContentLink';
import TweetWrapper from '../common/TweetWrapper';

type GeneratedBioBlockProps = {
  content: string;
};

function GeneratedBioBlock({ content }: GeneratedBioBlockProps) {
  useEffect(() => {
    const element = document.getElementById('generatedContentContainer');
    if (element) {
      const rect = element.getBoundingClientRect();

      const offsetTop = rect.top + window.scrollY;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, [content]);

  return (
    <div
      id='generatedContentContainer'
      className='mx-auto mb-10 pt-10 max-w-xl'
    >
      <TweetWrapper>
        <TweetContentContainer content={content} />
        <div className='flex-c gap-3 p-4 border-t border-gray-200 dark:border-dark-mode-border'>
          <TweetGeneratedContentLink url='https://twitter.com/settings/profile'>
            Change my bio
          </TweetGeneratedContentLink>
          <CopyGeneratedContentButton content={content} />
        </div>
      </TweetWrapper>
    </div>
  );
}

export default GeneratedBioBlock;
