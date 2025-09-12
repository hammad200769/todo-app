function MyGenerationsTableHeader({ text }: { text: string }) {
  return (
    <th>
      <div className='text-left whitespace-nowrap dark:bg-primary-dark px-4 py-2 font-medium'>
        <span>{text}</span>
      </div>
    </th>
  );
}

export default MyGenerationsTableHeader;
