import Link from 'next/link'
import type { ReactNode } from 'react'
import { Arrow } from '~/components/icons'

export default function TailwindLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mt-40 w-full animate-blur'>
      <Link href='/' className='group -mt-16 mb-8 inline-flex items-center gap-2 font-serif italic'>
        <Arrow className='-mt-1 h-3 w-3' />
        Index
      </Link>

      {children}
    </div>
  )
}
