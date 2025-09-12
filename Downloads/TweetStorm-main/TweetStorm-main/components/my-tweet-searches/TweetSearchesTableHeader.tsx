import clsx from 'clsx';

type TweetSearchesTableHeaderProps = {
  text: string;
  align?: 'left' | 'center' | 'right';
};

function TweetSearchesTableHeader({
  text,
  align = 'left',
}: TweetSearchesTableHeaderProps) {
  return (
    <th>
      <div
        className={clsx(
          'text-left whitespace-nowrap px-4 py-2 font-medium dark:bg-primary-dark',
          align === 'left' && 'text-left',
          align === 'right' && 'text-right',
          align === 'center' && 'text-center'
        )}
      >
        <span>{text}</span>
      </div>
    </th>
  );
}

export default TweetSearchesTableHeader;
