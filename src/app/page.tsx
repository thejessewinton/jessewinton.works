export const revalidate = 3600;

const Index = async () => {
  return (
    <div className="flex flex-col gap-2 pt-32 pb-4">
      <h1 className="group relative inline-block max-w-xs font-medium">
        Jesse Winton
      </h1>
      <div className="mt-8">
        <p>
          I am an East Coast based <em>full-stack engineer</em> specializing in
          creating exceptional user experiences and user interfaces with modern
          Javascript frameworks. Typescript and typesafety diehard.
        </p>
        <br />
        <p>
          Currently on the hunt to join a team of passionate and talented
          engineers to build beautiful and performant web applications.
        </p>
      </div>
    </div>
  );
};

export default Index;
