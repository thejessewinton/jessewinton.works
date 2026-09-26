import { createFileRoute } from '@tanstack/react-router'
import { LabComponents } from '~/data/lab'

export const Route = createFileRoute('/lab')({
  component: Lab,
})

function Lab() {
  return (
    <div className="relative flex flex-col gap-12 md:flex-row">
      <div className="sticky top-40 h-fit w-80 self-start">
        <h1 className="font-medium">Lab</h1>
      </div>
      <div className="flex flex-1 flex-col gap-12">
        {LabComponents.map(({ Component, title }, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <h2 className="sr-only">{title}</h2>
              <div
                key={index}
                className="flex aspect-2/1 w-full items-center justify-center overflow-hidden rounded-2xl border-[0.5px] border-neutral-700 bg-neutral-900/40"
              >
                <Component />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
