import { index } from '~/contentlayer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const generateMetadata = (): Metadata => {
  const data = index

  return {
    title: data.title,
    description:
      'Full-stack web developer with a passion for building beautiful, performant, and accessible websites and apps. Senior Design Engineer at PlanetScale.'
  }
}

const Index = () => {
  return (
    <div className='flex flex-col gap-2 pb-4'>
      <div className='relative z-50 animate-enter'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium'>{index.title}</h1>

        <div className='font-light [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-neutral-700 [&_a]:underline-offset-4' dangerouslySetInnerHTML={{ __html: index.body.html }} />
      </div>

      {index.works ? (
        <div className='group pointer-events-none relative mb-12 mt-8 grid animate-enter gap-12 animation-delay-300 sm:grid-cols-3'>
          {index.works.map((work) => (
            <Link
              key={work.label}
              href={work.url || ''}
              target={work.url?.startsWith('http') ? '_blank' : '_self'}
              className='pointer-events-auto relative min-h-[90px] font-light transition-all hover:!opacity-100 hover:!blur-none group-hover:opacity-40 group-hover:blur-xs'
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
    </div>
  )
}

export default Index
