import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { allIndices } from '~/content-collections'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
}

export default function Index() {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="relative z-50 animate-enter">
        <h1 className="group relative mb-4 inline-block w-full font-medium">
          {index.title}
        </h1>

        <div
          className="max-w-none space-y-4 font-light text-neutral-900 dark:text-neutral-400"
          dangerouslySetInnerHTML={{ __html: index.html }}
        />
      </div>

      <div className="my-12 space-y-12">
        <div
          className="group relative animate-enter"
          style={{
            animationDelay: '300ms',
          }}
        >
          <h3 className="mb-8 font-medium">Now</h3>
          <div className="flex flex-col gap-12 text-neutral-900 dark:text-neutral-400">
            {index.now}
          </div>
        </div>
        <div
          className="group pointer-events-none relative animate-enter"
          style={{
            animationDelay: '450ms',
          }}
        >
          <h3 className="mb-8 font-medium">Before</h3>
          <div className="flex flex-col gap-12">
            {index.works.map((work, i) => {
              return (
                <Link
                  href={work.url}
                  style={{
                    animationDelay: `${i * 150 + 300}ms`,
                  }}
                  key={work.dates}
                  className="pointer-events-auto block animate-enter"
                >
                  <div className="relative block space-y-5 font-light transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!">
                    <header className="flex items-center justify-between gap-5">
                      <div className="flex flex-col font-normal md:flex-row md:items-center">
                        <span>{work.company}</span>
                        <span className="hidden md:block">,</span>
                        <span className="text-neutral-900 text-sm md:ml-1 md:text-base dark:text-neutral-400">
                          {work.title}
                        </span>
                      </div>
                      <div className="h-px grow bg-neutral-300 dark:bg-neutral-800" />
                      <span className="text-neutral-900 dark:text-neutral-400">
                        {work.dates}
                      </span>
                    </header>
                    <div className="text-neutral-900 dark:text-neutral-400">
                      {work.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div
          className="group pointer-events-none relative animate-enter"
          style={{
            animationDelay: '600ms',
          }}
        >
          <h3 className="mb-8 animate-enter font-medium">Tech</h3>
          <div className="flex flex-wrap gap-3">
            {index.tech.map((item, i) => {
              return (
                <div
                  style={{
                    animationDelay: `${i * 150 + 300}ms`,
                  }}
                  key={item}
                  className="block animate-enter rounded-full border border-neutral-300/20 bg-neutral-100 px-3 dark:border-neutral-700/20 dark:bg-neutral-800"
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="group pointer-events-none relative animate-enter"
          style={{
            animationDelay: '750ms',
          }}
        >
          <h3 className="mb-8 animate-enter font-medium">Projects</h3>
          <div className="flex flex-col gap-12">
            {index.projects.map((project, i) => {
              return (
                <Fragment key={project.title}>
                  {project.url ? (
                    <Link
                      href={project.url}
                      style={{
                        animationDelay: `${i * 150 + 750}ms`,
                      }}
                      key={project.title}
                      className="pointer-events-auto block animate-enter"
                      target={
                        project.url.startsWith('http') ? '_blank' : undefined
                      }
                    >
                      <div className="relative block space-y-5 font-light transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!">
                        <header className="flex items-center justify-between gap-5">
                          <div className="flex items-center font-normal">
                            <span>{project.title}</span>
                          </div>
                          <div className="h-px grow bg-neutral-300 dark:bg-neutral-800" />
                          <span className="text-neutral-900 dark:text-neutral-400">
                            {project.label ??
                              project.url.replace(/https?:\/\//, '')}
                          </span>
                        </header>
                        <div className="text-neutral-900 dark:text-neutral-400">
                          {project.description}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      style={{
                        animationDelay: `${i * 150 + 300}ms`,
                      }}
                      key={project.title}
                      className="pointer-events-auto block animate-enter"
                    >
                      <div className="relative block space-y-5 font-light transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!">
                        <header className="flex items-center justify-between gap-5">
                          <div className="flex items-center font-normal">
                            <span>{project.title}</span>
                          </div>
                          <div className="h-px grow bg-neutral-300 dark:bg-neutral-800" />
                          <span className="text-neutral-900 dark:text-neutral-400">
                            Coming soon
                          </span>
                        </header>
                        <div className="text-neutral-900 dark:text-neutral-400">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
        <div
          className="group pointer-events-none relative animate-enter"
          style={{
            animationDelay: '1000ms',
          }}
        >
          <h3 className="mb-8 animate-enter font-medium">Writing</h3>
          <div className="flex flex-col gap-12">
            {index.writing.map((post, i) => {
              return (
                <Fragment key={post.title}>
                  <Link
                    href={post.url}
                    style={{
                      animationDelay: `${i * 150 + 750}ms`,
                    }}
                    key={post.title}
                    className="pointer-events-auto block animate-enter"
                  >
                    <div className="relative block space-y-5 font-light transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!">
                      <header className="flex items-center justify-between gap-5">
                        <div className="flex items-center font-normal">
                          <span>{post.title}</span>
                        </div>
                        <div className="h-px grow bg-neutral-300 dark:bg-neutral-800" />
                        <span className="text-neutral-900 dark:text-neutral-400">
                          {post.date}
                        </span>
                      </header>
                      <div className="text-neutral-900 dark:text-neutral-400">
                        {post.description}
                      </div>
                    </div>
                  </Link>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
