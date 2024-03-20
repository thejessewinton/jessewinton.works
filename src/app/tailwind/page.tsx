import { tailwind } from '~/contentlayer'
import type { Metadata } from 'next'


export const generateMetadata = (): Metadata => {

  return {
    title: tailwind.title,
    description:
      'Full-stack web developer with a passion for building beautiful, performant, and accessible websites and apps. Senior Design Engineer at PlanetScale.'
  }
}

export default function Tailwind(){
  return (
    <div className='flex flex-col gap-2 pb-4 mt-[10vh]'>
      <div className='relative z-50 animate-enter'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium'>{tailwind.title}</h1>

        <div className='font-light [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-neutral-700 [&_a]:underline-offset-4' dangerouslySetInnerHTML={{ __html: tailwind.body.html }} />
      </div>

      
    </div>
  )
}
