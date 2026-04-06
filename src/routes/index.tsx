import { createFileRoute } from '@tanstack/react-router'
import { Link } from '~/components/common/link'
import { Clock } from '~/components/ds/clock'
import { site } from '~/data/site'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="relative flex h-full w-full gap-16 px-12 leading-tight md:gap-48 lg:px-40">
      <div className="flex flex-col gap-8">
        <span className="font-medium">Jesse Winton</span>
        <span className="flex flex-col gap-1 md:flex-row">
          {site.now.title}
          <span className="hidden md:inline">&mdash;</span>
          <Link href={site.now.url} target="_blank">
            {site.now.company}
          </Link>
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <span className="font-medium">NYC</span>

        <Clock />

        <div className="flex flex-col">
          {site.connections.map((connection) => {
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
