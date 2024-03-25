import { allCompanies } from '~/contentlayer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PageParams = {
  params: {
    slug: string
  }
}

const getCompany = (slug: string) => {
  return allCompanies.find((company) => company.slug === slug)
}

export const generateMetadata = ({ params }: PageParams): Metadata => {
  const company = getCompany(params.slug)

  if (!company) {
    notFound()
  }

  return {
    title: company.title,
    description: company.description
  }
}

export const generateStaticParams = () => {
  return allCompanies.map((company) => ({
    params: {
      slug: company.slug
    }
  }))
}

export default function Tailwind({ params }: PageParams) {
  const company = getCompany(params.slug)

  if (!company) {
    notFound()
  }

  return (
    <div className='flex flex-col gap-2 pb-4'>
      <div className='relative z-50 animate-blur'>
        <h1 className='group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium'>{company.title}</h1>

        <div
          className='prose-quoteless prose prose-neutral max-w-none pb-8 font-light dark:prose-invert prose-headings:text-base prose-headings:font-medium prose-p:mb-8 prose-a:font-normal prose-a:no-underline prose-blockquote:font-normal prose-blockquote:not-italic prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:font-extralight prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none prose-code:dark:bg-neutral-950 prose-code:dark:text-white'
          dangerouslySetInnerHTML={{ __html: company.body.html }}
        />
      </div>
    </div>
  )
}
