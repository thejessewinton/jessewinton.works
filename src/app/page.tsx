import { index } from '~/contentlayer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: index.title,
  description: index.description
}

export default function Index() {
  return (
    <div className='mt-40 flex flex-col gap-2 pb-4'>
      <div className='relative z-50 animate-enter'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium'>{index.title}</h1>

        <div
          className='prose prose-neutral max-w-none font-light dark:prose-invert prose-a:font-normal prose-a:no-underline'
          dangerouslySetInnerHTML={{ __html: index.body.html }}
        />
      </div>

      {index.works ? (
        <div className='group pointer-events-none relative mb-12 mt-8 grid animate-enter gap-12 animation-delay-300 sm:grid-cols-3'>
          {index.works.map((work) => (
            <Link
              key={work.label}
              href={work.url || ''}
              target={work.url?.startsWith('http') ? '_blank' : '_self'}
              className='pointer-events-auto relative min-h-[90px] font-light transition-all hover:md:!opacity-100 hover:md:!blur-none group-hover:md:opacity-40 group-hover:md:blur-xs'
            >
              <h2 className='mb-4 text-sm text-neutral-900 dark:text-neutral-400'>{work.label}</h2>
              <div className='gap-6'>
                <span className='font-normal'>{work.title}</span>
                <div className='text-neutral-900 dark:text-neutral-400'>{work.description}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      {index.experiences ? (
        <div className='group relative my-8 flex w-full animate-enter flex-col divide-y divide-neutral-300 overflow-hidden border-t border-neutral-300 animation-delay-500 dark:divide-neutral-800 dark:border-neutral-800'>
          {index.experiences.map((experience) => {
            return (
              <Link
                href={experience.url || ''}
                target={experience.url?.startsWith('http') ? '_blank' : '_self'}
                className='relative top-0 flex items-start gap-20'
                key={experience.company}
              >
                <time className='absolute -z-20 pt-6 text-sm text-neutral-500'>{experience.endDate}</time>

                <div className='ml-[25%] flex-1 divide-y divide-neutral-300 dark:divide-neutral-800'>
                  <div className='flex-1 items-center justify-between py-6 transition-all before:absolute before:-left-1/2 before:h-full before:w-full before:content-[""] md:flex hover:md:!opacity-100 hover:md:!blur-none group-hover:md:opacity-40 group-hover:md:blur-xs'>
                    <div>
                      <span className='block text-xs text-neutral-500'>{experience.company}</span>
                      {experience.role}
                      <div
                        className='prose prose-neutral mt-2 max-w-none text-neutral-500 dark:prose-invert prose-a:font-normal prose-a:no-underline prose-em:italic prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:font-extralight prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none prose-code:dark:bg-neutral-950 prose-code:dark:text-white'
                        dangerouslySetInnerHTML={{
                          __html: experience.description.html
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
