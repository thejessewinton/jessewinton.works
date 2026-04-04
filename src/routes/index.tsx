import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Clock } from '~/components/clock'
import { Link } from '~/components/link'
import { site } from '~/data/site'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex w-full gap-16 leading-tight md:gap-48">
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
        <ClientOnly
          fallback={
            <span className="tabular-nums tracking-tighter">&nbsp;</span>
          }
        >
          <Clock />
        </ClientOnly>
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
