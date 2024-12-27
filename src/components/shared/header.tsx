import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="container mx-auto mb-10 flex justify-between">
      <Link href="/" className="group flex items-center justify-center gap-2">
        <CaretLeft />
        <span className="font-normal font-serif italic">Back</span>
      </Link>
      <h1 className="font-medium">
        Jesse Winton /{' '}
        <span className="font-normal font-serif italic">The Lab</span>
      </h1>
    </header>
  )
}
