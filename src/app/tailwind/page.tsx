import { tailwind } from '~/contentlayer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: tailwind.title,
  description: tailwind.description
}

export default function Tailwind() {
  return (
    <div className='flex flex-col gap-2 pb-4'>
      <div className='relative z-50 animate-blur'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium'>
          {tailwind.title}
        </h1>

        <div
          className='prose prose-neutral max-w-none pb-8 font-light dark:prose-invert prose-headings:text-base prose-headings:font-medium prose-a:font-normal prose-a:no-underline prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:font-extralight prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none prose-code:dark:bg-neutral-950 prose-code:dark:text-white'
          dangerouslySetInnerHTML={{ __html: tailwind.body.html }}
        />
      </div>
    </div>
  )
}
