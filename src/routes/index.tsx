import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Clock } from '~/components/ds/clock'
import { site } from '~/data/site'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="relative flex h-full w-full gap-16 self-center pt-40 leading-tight md:gap-48">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-8">
          <span className="font-medium">Jesse Winton</span>
          <span className="flex flex-col gap-1 md:flex-row">
            {site.now.title}
            <span className="hidden md:inline">&mdash;</span>
            <Link
              to={site.now.url}
              target="_blank"
              className="decoration-[1.15px] underline-offset-6 hover:underline"
            >
              {site.now.company}
            </Link>
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-medium">Previously</span>
          <div className="flex flex-col gap-2">
            {site.prev.map((prev) => {
              return (
                <span className="flex flex-col gap-1 md:flex-row" key={prev}>
                  {prev}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-8">
          <span className="font-medium">NYC</span>
          <Clock />
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-medium">Online</span>
          <div className="flex flex-col">
            {site.connections.map((connection) => {
              return (
                <Link
                  to={connection.url}
                  key={connection.title}
                  target={
                    connection.url.includes('http') ? '_blank' : undefined
                  }
                  className="py-1 decoration-[1.15px] underline-offset-6 first-of-type:pt-0 hover:underline"
                >
                  {connection.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
