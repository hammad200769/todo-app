type GenerationHeadingProps = {
  text: string;
};

function GenerationHeading({ text }: GenerationHeadingProps) {
  return (
    <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl'>
      {text}
    </h2>
  );
}

export default GenerationHeading;
