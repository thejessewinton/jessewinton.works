import type { Metadata } from 'next';
import { getIndex } from 'utils/content';

export const generateMetadata = (): Metadata => {
  const data = getIndex();
  return {
    title: data.title,
    description:
      'Full-stack web developer with a passion for building beautiful, performant, and accessible websites and apps. Looking for the next gig.Full-stack web developer with a passion for building beautiful, performant, and accessible websites and apps. Looking for the next gig.',
  };
};

const Index = () => {
  const data = getIndex();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="relative z-50 animate-enter">
        <h1 className="group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium">
          <>{data.title}</>
        </h1>

        <div
          className="font-light"
          dangerouslySetInnerHTML={{ __html: data.body.html }}
        />
      </div>
    </div>
  );
};

export default Index;
