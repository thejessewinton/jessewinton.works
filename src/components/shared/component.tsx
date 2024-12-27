import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { ReactNode } from 'react'

export type ComponentProps = {
  title: string
  description: ReactNode
  tools: Array<string>
  children: ReactNode
  filename: string
  beta?: boolean
}

export const Component = ({
  title,
  description,
  tools,
  children,
  beta = false,
  filename,
}: {
  title: string
  description: ReactNode
  tools: Array<string>
  children: ReactNode
  filename?: string
  beta?: boolean
}) => {
  if (beta && process.env.NODE_ENV === 'production') return null

  return (
    <div className="flex min-h-[60vh] flex-col justify-center gap-8">
      <div className="order-2 flex flex-col gap-2 font-light md:order-1 md:col-span-4 md:mt-10">
        <div className="flex items-center gap-4">
          <h3 className="font-medium">{title}</h3>

          {beta ? (
            <span className="rounded-sm bg-blue-400 px-2 py-px text-black">
              Beta
            </span>
          ) : null}
        </div>
        <p>{description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <ul className="flex items-center gap-2">
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-sm bg-neutral-100 px-2 py-1 lowercase dark:bg-neutral-800"
              >
                {tool}
              </li>
            ))}
          </ul>
          <Link
            className="group flex items-center gap-1 rounded-sm bg-neutral-100 py-1 pr-2.5 pl-2 text-neutral-800"
            href={`https://github.com/thejessewinton/jessewinton.works/blob/main/src/components/lab/${filename}`}
          >
            Source
            <CaretRight className="size-3 text-inherit transition-transform group-hover:translate-x-0.25" />
          </Link>
        </div>
      </div>
      <div className="relative order-1 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 p-10 md:order-2 md:col-span-8 dark:border-neutral-700/30">
        {children}
      </div>
    </div>
  )
}
