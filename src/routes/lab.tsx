import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lab')({
  component: Lab,
})

function Lab() {
  return (
    <div className="relative flex gap-12">
      <div className="sticky top-40 h-fit w-80 self-start">
        <h1 className="font-medium">Lab</h1>
      </div>
      <div className="flex flex-1 flex-col gap-12">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex aspect-2/1 w-full items-center justify-center rounded-2xl bg-neutral-900"
            >
              {index}
            </div>
          )
        })}
      </div>
    </div>
  )
}
