function MyGenerationsTableField({ value }: { value: string }) {
  return (
    <td>
      <div className='flex w-full justify-start text-start'>
        <div className='flex px-4 py-3'>
          <div className='min-h-6 inline-flex items-center justify-center space-x-1 whitespace-nowrap rounded-xl px-2 py-0.5 text-sm font-medium tracking-tight rtl:space-x-reverse text-success-700 bg-success-500/10'>
            <span className=''>{value}</span>
          </div>
        </div>
      </div>
    </td>
  );
}

export default MyGenerationsTableField;
