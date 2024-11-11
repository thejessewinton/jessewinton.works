import { allIndices } from '~/content-collections'
import type { Metadata } from 'next'
import Link from 'next/link'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description
}

export default function Index() {
  return (
    <div className='flex flex-col gap-2 pb-4'>
      <div className='relative z-50 animate-enter'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs font-medium'>{index.title}</h1>

        <div
          className='prose prose-neutral max-w-none font-light dark:prose-invert prose-a:font-normal prose-a:no-underline'
          dangerouslySetInnerHTML={{ __html: index.html }}
        />
      </div>

      {index.works ? (
        <div className='group pointer-events-none relative my-12 flex flex-col gap-12 animation-delay-300'>
          {index.works.map((work, i) => (
            <div
              style={{
                animationDelay: `${i * 150 + 300}ms`
              }}
              key={work.label}
              className='pointer-events-auto animate-enter'
            >
              <Link
                href={work.url || ''}
                target={work.url?.startsWith('http') ? '_blank' : '_self'}
                className='relative block min-h-[90px] font-light transition-all hover:md:!opacity-100 hover:md:!blur-none group-hover:md:opacity-40 group-hover:md:blur-xs'
              >
                <h2 className='mb-5 text-sm text-neutral-900 dark:text-neutral-400'>{work.label}</h2>

                <span className='font-normal'>{work.title}</span>
                <div className='text-neutral-900 dark:text-neutral-400'>{work.description}</div>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
