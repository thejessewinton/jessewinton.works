import { HTMLAttributeAnchorTarget } from 'react';

import Link from 'next/link';

const Button = ({
  href,
  target = '_self',
  children,
}: {
  href: string;
  target?: HTMLAttributeAnchorTarget;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="py-3 px-6 max-h-12 font-semibold cursor-pointer flex items-center justify-center rounded transition-all bg-gray-100 text-neutral-900 gap-3 text-xs lg:text-lg hover:bg-transparent hover:text-white hover:border-white border border-solid border-transparent relative overflow-hidden  disabled:cursor-not-allowed"
    >
      {children}
    </Link>
  );
};

const Index = async () => {
  return (
    <>
      <div className="container">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <h1 className="leading-tight mb-6 text-6xl">Next.js, baby!</h1>

          <p>
            I am a NYC based full-stack engineer specializing in creating
            exceptional user experiences and user interfaces with modern
            Javascript frameworks.
          </p>

          <p>
            Co-founder and Head of Engineering at VeroSkills, based out of
            Birmingham, AL.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Button href="mailto:jwinton@veroskills.com">Get in Touch</Button>
            <Button href="https://veroskills.com" target="_blank">
              Check out VeroSkills
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
