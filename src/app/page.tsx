import type { Metadata } from 'next'
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
    <div className="flex w-full gap-16 leading-tight md:gap-48">
      <div className="flex flex-col gap-8">
        <span className="font-medium">Jesse Winton</span>
        <span className="flex flex-col gap-1 md:flex-row">
          {index.now.title}
          <span className="hidden md:inline">—</span>
          <Link href={index.now.url} target="_blank">
            {index.now.company}
          </Link>
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <span className="font-medium">NYC</span>
        <Clock />
        <div className="flex flex-col">
          {index.connections.map((connection) => {
            return (
              <Link
                href={connection.url}
                key={connection.title}
                target="_blank"
                className="py-1 first-of-type:pt-0"
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
