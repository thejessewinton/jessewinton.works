import type { Metadata } from 'next'
import { experienceIndex } from '~/contentlayer'
import { getAllExperience } from '~/content'

export const metadata: Metadata = {
  title: 'Plays'
}

export default function Plays() {
  const allExperience = getAllExperience()

  return (
    <div className='flex flex-col gap-2 pb-4'>
      <div className='relative z-50 w-full animate-enter'>
        <h1 className='mb-4 text-left font-medium'>{experienceIndex.title}</h1>
        <div
          className='font-light'
          dangerouslySetInnerHTML={{
            __html: experienceIndex.body.html
          }}
        />
      </div>
      <div className='group relative mt-8 flex w-full animate-enter flex-col divide-y divide-neutral-300 overflow-hidden border-t border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800'>
        {allExperience.map(([year, experiences]) => {
          return (
            <div className='relative top-0 flex gap-20 py-4 md:p-0' key={year}>
              <time className='absolute -z-20 pt-3 text-sm text-neutral-500'>{year}</time>

              <div className='ml-[25%] flex-1 divide-y divide-neutral-300 dark:divide-neutral-800'>
                {experiences.map((job) => (
                  <div
                    key={job.title}
                    className='flex-1 items-center justify-between py-2 transition-all before:absolute before:-left-1/2 before:h-full before:w-full before:content-[""] md:flex hover:md:!opacity-100 hover:md:!blur-none group-hover:md:opacity-40 group-hover:md:blur-xs'
                  >
                    <div>
                      {job.title} - {job.role}
                      <div
                        className='text-sm text-neutral-500 [&>p]:mb-0'
                        dangerouslySetInnerHTML={{
                          __html: job.body.html
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
