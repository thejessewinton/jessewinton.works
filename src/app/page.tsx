import type { Metadata } from 'next';
import Link from 'next/link';
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

      {data.works ? (
        <div className="group pointer-events-none relative mt-8 mb-12 grid animate-enter gap-12 animation-delay-300 sm:grid-cols-3">
          {data.works.map((work) => (
            <Link
              key={work.label}
              href={work.url || ''}
              target={work.url?.startsWith('http') ? '_blank' : '_self'}
              className="pointer-events-auto relative min-h-[90px] font-light transition-all hover:!opacity-100 hover:!blur-none group-hover:opacity-40 group-hover:blur-xs"
            >
              <h2 className="mb-4 text-sm text-neutral-900 dark:text-neutral-400">
                {work.label}
              </h2>
              <div className="gap-6">
                <span className="font-normal">{work.title}</span>
                <div className="text-neutral-900 dark:text-neutral-400">
                  {work.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Index;
