import { URLS } from '@/utils/constants';
import { ReactNode } from 'react';
import { InlineLink } from '../common/Links';

const samplePrompts: Array<string> = [
  'A travel blogger who explores different cultures and destinations.',
  'A professional bio for a marketing manager with 5 years of experience in digital marketing.',
  'A business bio for a tech startup founder who is innovating in the field of artificial intelligence.',
  'An author promoting their latest book and sharing writing tips.',
  'A fitness trainer who shares workout routines and healthy living tips.',
  'A funny bio for someone who loves napping and tasting different pizzas.',
];

const effectiveBioTips: Array<{ title: string; content: ReactNode }> = [
  {
    title: 'Use Hashtags and Handles',
    content:
      'When users search for hashtags on Twitter, profiles that include those hashtags and handles in their bios may appear in the search results. Incorporate relevant hashtags or @mentions to connect with specific communities or individuals. This can increase your visibility and engagement within those circles.',
  },
  {
    title: 'Include Keywords',
    content:
      "Twitter bios are searchable, meaning users can find profiles by entering keywords in Twitter's search bar. By including relevant keywords in your bio, you increase the chances of your profile appearing in search results related to those topics. This can attract users interested in those topics. However, avoid overloading your bio with too many keywords, as this can make it sound forced or spammy.",
  },
  {
    title: 'Add a Call to Action',
    content:
      'Encourage visitors to follow you, visit your website, or check out your latest project. A well-crafted CTA can increase engagement with your profile, such as follows, clicks, or visits to your website. Also highlight the benefits or value users will gain by following through with the CTA.',
  },
  {
    title: 'Add Social Proof',
    content:
      'If you have a significant following on other platforms or have been featured in notable publications, consider mentioning it in your bio. Social proof can enhance your credibility and attract more followers.',
  },
  {
    title: 'Highlight Your Expertise',
    content:
      'Highlighting your expertise or interests in your Twitter bio is crucial for communicating your authority, passion, and areas of knowledge to potential followers. It gives users a clear reason to follow you and engage with your content.',
  },
  {
    title: 'Show Your Personality',
    content:
      "Let your personality shine through your bio. Use a tone and style that reflects who you are. Whether you're witty, serious, inspirational, or humorous, make sure your bio mirrors your personal or professional brand. Add a touch of humor, or a motivational quote if that's more your style. Sharing a fun fact about yourself or a unique hobby can also make your profile more relatable, memorable and human.",
  },
  {
    title: 'Use a Twitter Bio Generator',
    content: (
      <p>
        Consider using a Twitter bio generator to create a unique and engaging
        bio quickly. Our{' '}
        <InlineLink href='/' decorated={false}>
          Tweetstorm
        </InlineLink>{' '}
        platform offers an bio generator for twitter that helps you write cool
        bios tailored to your personality and interests. By using AI, you can
        ensure your bio includes relevant keywords and hashtags, enhancing your
        profile&apos;s visibility and attractiveness.
      </p>
    ),
  },
  {
    title: 'Keep it Updated',
    content:
      "Your Twitter bio isn't set in stone. As your interests or priorities evolve, don't hesitate to update your bio to reflect these changes. Keeping your bio fresh and relevant shows that you're active and engaged on the platform.",
  },
];

const goodBioExamples: Array<{ title: string; content: string }> = [
  {
    title: 'Professional Bio',
    content:
      'People-first HR leader | Culture Champion | Building inclusive workplaces | #HRTrends',
  },
  {
    title: 'Personal Bio',
    content:
      'Art is the lie that reveals truth | Painter & Sculptor | 🎨🖌️ #ArtLover #CreateEveryday',
  },
  {
    title: 'Hilarious Bio',
    content:
      'Professional napper 💤 | Unofficial pizza taste tester 🍕 | Tweets are 90% sarcasm.',
  },
  {
    title: 'Influencer Bio',
    content:
      'Creator of captivating content ✨ | Storyteller | Travel enthusiast 🌍 | Sharing my adventures and insights one post at a time.',
  },
  {
    title: 'Business Bio',
    content:
      'Tech startup founder | Innovating the future of AI | Join us on our journey to revolutionize technology.',
  },
];

function BioGeneratorArticle() {
  return (
    <article className='mt-10 max-w-3xl mx-auto space-y-12 text-base leading-relaxed'>
      <section>
        <h2 className='text-3xl font-bold mb-6'>
          About this Twitter Bio Generator
        </h2>
        <p>
          Our AI-powered Twitter Bio Generator helps you create unique and
          interesting twitter bios that make a great first impression. Whether
          you&apos;re a professional looking to showcase your expertise, an
          influencer aiming to attract followers, or simply updating your
          profile, our tool offers personalized bio suggestions based on your
          inputs.
        </p>
        <p className='mt-4'>
          By leveraging advanced AI models that includes GPT4, our bio generator
          ensures that your twitter profile stands out, reflects your
          personality, and attracts the right audience.
          <InlineLink href={URLS.login}> Start generating{'  '}</InlineLink>
          creative and impactful bios effortlessly using our Twitter Bio
          Generator to make a great twitter profile.
        </p>
      </section>
      <section>
        <h2 className='text-3xl font-bold mb-6'>
          Sample Bio Generator Prompts
        </h2>
        <p>
          Here are some sample prompts that can be used to generate twitter bio
          using our bio generator:
        </p>
        <ul className='mt-5 space-y-2'>
          {samplePrompts.map((prompt, index) => (
            <li key={index}>
              <p>- {prompt}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className='text-3xl font-bold mb-6'>
          Suggestions for Writing a Good Twitter Bio
        </h2>
        <p>
          Writing a good twitter bio is crucial for making a strong impression.
          Follow these tips to craft a nice bio for twitter:
        </p>
        <ul className='space-y-6 mt-6'>
          {effectiveBioTips.map(item => (
            <li key={item.title}>
              <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
              {typeof item.content === 'string' ? (
                <p>{item.content}</p>
              ) : (
                item.content
              )}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className='text-3xl font-bold mb-6'>
          Examples of Good Twitter Bios
        </h2>
        <p>Here are some examples of nice twitter bios to inspire you:</p>
        <ul className='mt-5 space-y-6'>
          {goodBioExamples.map(item => (
            <li key={item.title} className='space-y-1'>
              <h3 className='font-bold'>{item.title}:</h3>
              <p className='italic'>{item.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default BioGeneratorArticle;
