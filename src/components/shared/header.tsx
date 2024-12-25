import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex justify-between container py-10 px-8 mx-auto">
      <h1 className="text-sm">
        Jesse Winton /{' '}
        <span className="font-serif italic font-light">The Lab</span>
      </h1>
      <Link
        href="https://jessewinton.works"
        className="group items-center flex gap-2 justify-center"
      >
        <span className="font-serif italic text-sm font-light">Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-3 group-hover:-rotate-12 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </Link>
    </header>
  );
};
