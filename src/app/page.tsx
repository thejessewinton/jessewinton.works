import Link from 'next/link';

export const revalidate = 3600;

const Index = async () => {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <h1 className="group relative inline-block max-w-xs font-medium">
        Jesse Winton
      </h1>
      <div className="mt-8">
        <p>
          I am an East Coast based{' '}
          <Link
            href="https://github.com/thejessewinton"
            target="_blank"
            className="underline-offset-4 decoration-neutral-700 underline"
          >
            <em>full-stack engineer</em>
          </Link>{' '}
          specializing in creating exceptional user experiences and user
          interfaces with modern Javascript frameworks. Typescript and
          type-safety diehard.
        </p>
        <br />
        <p>
          Currently on the hunt to join a new team of passionate and talented
          engineers to build beautiful and performant web applications.
        </p>
        <br />
        <p>
          Formerly head of engineering at{' '}
          <Link
            href="https://veroskills.com"
            target="_blank"
            className="underline-offset-4 decoration-neutral-700 underline"
          >
            <em>VeroSkills</em>
          </Link>
          . Also, take a second and checkout{' '}
          <Link
            href="/docs/resume.pdf"
            target="_blank"
            className="underline-offset-4 decoration-neutral-700 underline"
          >
            <em>my resume</em>
          </Link>
          , I put a lot of time into it.
        </p>
      </div>
    </div>
  );
};

export default Index;
