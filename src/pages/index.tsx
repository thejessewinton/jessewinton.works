import type { NextPage } from "next";

import { Head } from "components/Head";
import { Button } from "elements/Button";

const Index: NextPage = () => {
  return (
    <>
      <Head title="Full-stack front-end engineer." />
      <div className="container">
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <h1 className="leading-tight mb-6">Next.js, baby!</h1>

          <p>
            I am a NYC based front-end engineer specializing in creating
            exceptional user experiences and user interfaces with modern
            Javascript frameworks, and a big fan of Next.js.
          </p>

          <p>
            Currently working as the Lead Front-End Engineer at VeroSkills,
            based out of Birmingham, AL.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Button to="mailto:jwinton@veroskills.com">Get in touch</Button>
            <Button to="https://veroskills.com">Check out VeroSkills</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
