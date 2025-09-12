import ResumeSubscriptionButton from './ResumeSubscriptionButton';

function ResumeSubscriptionBlock() {
  return (
    <div className='mt-12'>
      <h2 className='text-2xl dark:text-white'>Resume Subscription</h2>
      <div className='bg-white dark:bg-primary-dark shadow-sm sm:rounded-lg p-6 mt-4'>
        <p className='font-light text-sm mb-5'>
          Having second thoughts about cancelling your subscription? You can
          instantly reactive your subscription at any time until the end of your
          current billing cycle. You will not be charged for resuming the
          subscription.
        </p>
        <ResumeSubscriptionButton />
      </div>
    </div>
  );
}

export default ResumeSubscriptionBlock;
