import Link from 'next/link'

export const Header = () => {
  return (
    <header className="container mx-auto mb-10 flex justify-between">
      <h1 className="font-medium">
        Jesse Winton /{' '}
        <span className="font-normal font-serif italic">The Lab</span>
      </h1>
      <Link href="/" className="group flex items-center justify-center gap-2">
        <span className="font-normal font-serif italic">Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="group-hover:-rotate-12 size-3 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </Link>
    </header>
  )
}
