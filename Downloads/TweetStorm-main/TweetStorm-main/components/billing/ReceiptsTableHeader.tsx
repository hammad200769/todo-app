function ReceiptsTableHeader({ text }: { text: string }) {
  return (
    <th>
      <div className='text-left whitespace-nowrap px-4 py-2 text-sm text-neutral-gray dark:text-white font-bold'>
        <span>{text}</span>
      </div>
    </th>
  );
}

export default ReceiptsTableHeader;
