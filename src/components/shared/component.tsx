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
            <span className="rounded-md bg-blue-400 px-2 py-px text-black text-xs">
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
                className="rounded-lg bg-neutral-100 px-2 py-1 lowercase dark:bg-neutral-800"
              >
                {tool}
              </li>
            ))}
          </ul>

          <Link
            className="group flex items-center gap-2 rounded-lg bg-neutral-100 py-1 pr-1.5 pl-2 text-neutral-900 transition active:scale-95 dark:bg-neutral-800 dark:text-neutral-400"
            href={`https://github.com/thejessewinton/jessewinton.works/blob/main/src/components/lab/${filename}`}
            target="_blank"
          >
            Source
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6 text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="relative order-1 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 p-10 md:order-2 md:col-span-8 dark:border-neutral-700/30">
        {children}
      </div>
    </div>
  )
}
