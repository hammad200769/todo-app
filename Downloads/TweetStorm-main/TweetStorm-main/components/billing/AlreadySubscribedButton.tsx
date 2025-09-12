import clsx from 'clsx';

function AlreadySubscribedButton({ table }: { table: boolean }) {
  return (
    <button
      className={clsx(
        'rounded-md py-[10px] px-6 text-gray-500 bg-gray-200 dark:bg-gray-800 disabled cursor-not-allowed font-semibold',
        table ? '' : 'w-full'
      )}
    >
      Current Plan
    </button>
  );
}

export default AlreadySubscribedButton;
