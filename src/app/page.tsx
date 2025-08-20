import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Clock } from '~/components/clock'
import { Link } from '~/components/link'

import { allIndices } from '~/content-collections'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
}

export default function Index() {
  return (
    <div className="grid w-full grid-cols-1 gap-28 leading-tight md:justify-items-center md:gap-16 lg:grid-cols-3">
      <Section title="Jesse Winton">
        <span>
          {index.now.title} at{' '}
          <Link href={index.now.url} target="_blank">
            {index.now.company}
          </Link>
        </span>
      </Section>
      <Section title="NYC">
        <Clock />
      </Section>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Connect</span>
        <div className="flex flex-col">
          {index.connections.map((connection) => {
            return (
              <Link
                href={connection.url}
                key={connection.title}
                target="_blank"
                className="py-1 font-medium first-of-type:pt-0"
              >
                {connection.title}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Section = ({
  title,
  children,
}: { title: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-8">
      <span className="font-medium">{title}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
