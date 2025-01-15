import Link from 'next/link'
import { Clock } from './shared/clock'
import { Weather } from './shared/weather'

const links = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thejessewinton',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/thejessewinton',
  },
]

export const Footer = () => {
  return (
    <footer className="mt-auto mb-0 flex h-20 w-full animate-blur items-center py-8">
      <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-between gap-4 px-4 text-neutral-500 md:px-8">
        <nav className="group flex items-center justify-between gap-6 text-sm">
          {links.map((link) => (
            <Link
              href={link.href}
              className="transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!"
              key={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4">
          <Weather />
          <Clock />
          <span className="text-sm">&copy;{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
