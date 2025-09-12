type GenerationTaglineProps = {
  text: string;
};

function GenerationTagline({ text }: GenerationTaglineProps) {
  return (
    <p className='mx-auto dark:text-gray-300 mt-3 max-w-md text-base text-gray-500 sm:text-lg md:max-w-3xl md:text-xl'>
      {text}
    </p>
  );
}

export default GenerationTagline;
