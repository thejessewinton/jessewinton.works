import Link from 'next/link'
import type { ReactNode } from 'react'

export const Component = ({
  title,
  description,
  tools,
  children,
  beta = false,
  source,
}: {
  title: string
  description: ReactNode
  tools: Array<string>
  children: ReactNode
  source?: string
  beta?: boolean
}) => {
  if (beta && process.env.NODE_ENV === 'production') return null

  return (
    <div className="flex min-h-[60vh] flex-col justify-center gap-8">
      <div className="order-2 flex flex-col gap-2 font-light md:order-1 md:col-span-4 md:mt-10">
        <div className="flex items-center gap-4">
          <h2 className="font-medium">{title}</h2>
          {beta ? (
            <span className="rounded-sm bg-blue-400 px-2 py-px text-black">
              Beta
            </span>
          ) : null}
        </div>
        <p>{description}</p>
        <ul className="mt-4 flex gap-2 text-sm">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-sm bg-neutral-100 px-2 py-1 lowercase dark:bg-neutral-800"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative order-1 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 p-10 md:order-2 md:col-span-8 dark:border-neutral-700/30">
        {children}
      </div>

      {source && <Link href={source}>Source code</Link>}
    </div>
  )
}
