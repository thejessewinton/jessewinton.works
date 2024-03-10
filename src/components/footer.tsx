import Link from 'next/link';

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/thejessewinton',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jrandallw',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thejessewinton',
  },
];

export const Footer = () => {
  return (
    <footer className="mb-0 mt-auto animate-blur flex h-14 w-full items-center border-t border-t-neutral-700">
      <div className="mx-auto flex w-full max-w-3xl flex-row items-center justify-between gap-4 px-8 text-neutral-400">
        <nav className="flex items-center justify-between gap-6 text-sm">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-sm">{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
