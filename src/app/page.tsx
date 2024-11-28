import type { Metadata } from 'next'
import Link from 'next/link'
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
          className="prose prose-neutral dark:prose-invert max-w-none space-y-4 font-light prose-a:font-italic prose-a:font-serif! prose-a:no-underline"
          dangerouslySetInnerHTML={{ __html: index.html }}
        />
      </div>

      <div className="my-12 space-y-12">
        <div className="group pointer-events-none relative">
          <h3
            className="mb-8 animate-enter font-medium"
            style={{
              animationDelay: `${300}ms`,
            }}
          >
            Work
          </h3>
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
                      <div className="flex items-center font-normal">
                        <span>{work.company}</span>
                        <span>, {work.title}</span>
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
        <div className="group pointer-events-none relative">
          <h3
            className="mb-8 animate-enter font-medium"
            style={{
              animationDelay: `${300}ms`,
            }}
          >
            Tech
          </h3>
          <div className="flex flex-wrap gap-3">
            {index.tech.map((item, i) => {
              return (
                <div
                  style={{
                    animationDelay: `${i * 150 + 300}ms`,
                  }}
                  key={item}
                  className="pointer-events-auto block animate-enter rounded-full border border-neutral-700/20 bg-neutral-800 px-3"
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
        <div className="group pointer-events-none relative">
          <h3
            className="mb-8 animate-enter font-medium"
            style={{
              animationDelay: `${300}ms`,
            }}
          >
            Projects
          </h3>
          <div className="flex flex-col gap-12">
            {index.projects.map((project, i) => {
              return (
                <>
                  {project.url ? (
                    <Link
                      href={project.url}
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
                            {project.url.replace(/https?:\/\//, '')}
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
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
