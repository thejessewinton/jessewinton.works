import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Link, createFileRoute } from '@tanstack/react-router'
import { LabComponents } from '~/data/lab'

export const Route = createFileRoute('/lab')({
  component: Lab,
})

function Lab() {
  return (
    <div className="relative flex flex-col gap-12 md:flex-row">
      <div className="sticky top-40 flex h-fit w-80 flex-col gap-2 self-start">
        <h1 className="font-medium">Lab</h1>
        <Link
          to="/"
          className="-ml-5.5 group flex items-center gap-1 text-neutral-400 text-sm"
        >
          <ChevronLeftIcon className="motion-safe:group-hover:-translate-x-0.5 size-4 transition-transform" />
          Go back
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-12">
        {LabComponents.map(({ Component, Background, title }, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <h2 className="sr-only">{title}</h2>
              <div
                key={index}
                className="relative flex aspect-2/1 w-full items-center justify-center overflow-hidden rounded-2xl border-[0.5px] border-neutral-700 bg-neutral-900/40"
              >
                <Component />
                <Background className="-z-10 absolute inset-0 animate-fade-in" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
