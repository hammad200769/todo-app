import { stopClickPropagation } from '@/utils/utils';
import DialogWrapper from '../common/DialogBackground';

type TweetIdeasDialogProps = {
  onClose: () => void;
};

function TweetIdeasDialog({ onClose }: TweetIdeasDialogProps) {
  return (
    <DialogWrapper onClick={onClose}>
      <div
        className='p-4 bg-white  dark:bg-primary-dark-light max-w-[672px] m-auto shadow-xl rounded-lg relative'
        onClick={stopClickPropagation}
      >
        <h4 className='font-semibold text-xl'>💡 Ideas to Write about</h4>
        <hr className='my-2' />

        <div className='mt-5 text-sm space-y-2'>
          <blockquote>
            - Promote my gaming PC e-Commerce using Black Friday references.
          </blockquote>
          <blockquote>
            - How AI is revolutioning the Social media paradigm
          </blockquote>
          <blockquote>- Advertise my new e-bike</blockquote>
          <blockquote>
            - I wrote a new blog post about Tech Startups, promote it with
            hashtags
          </blockquote>
        </div>
      </div>
    </DialogWrapper>
  );
}

export default TweetIdeasDialog;
