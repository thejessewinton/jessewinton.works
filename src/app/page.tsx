import type { Metadata } from 'next'
import Link from 'next/link'
import { type ReactNode, Suspense } from 'react'
import { Clock } from '~/components/clock'
import { Glitch } from '~/components/glitch'
import { Arrow } from '~/components/icons'
import { Weather } from '~/components/weather'

import { allIndices } from '~/content-collections'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
}

export default function Index() {
  return (
    <div className="grid w-full grid-cols-1 justify-between gap-12 leading-tight md:grid-cols-[repeat(2,max-content)] md:gap-30 lg:grid-cols-[repeat(5,max-content)]">
      <Section title="Jesse Winton">
        <span>{index.now.title}</span>
        <Link href={index.now.url} target="_blank">
          <Glitch text={index.now.company} />
        </Link>
      </Section>
      <Section title="Location">
        <Clock />
        <Suspense fallback={null}>
          <Weather />
        </Suspense>
      </Section>
      <Section title="Tech">
        {index.tech.map((tech) => {
          return <p key={tech}>{tech}</p>
        })}
      </Section>
      <Section title="Experience">
        {index.experience.map((experience) => {
          return (
            <p key={experience.company}>
              <span className="tabular-nums tracking-tighter">
                {experience.dates}
              </span>{' '}
              — {experience.title}
              <span className="font-medium"> {experience.company}</span>
            </p>
          )
        })}
      </Section>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Connect</span>
        <div className="flex flex-col">
          {index.connections.map((connection) => {
            return (
              <Link
                href={connection.url}
                key={connection.title}
                className="group flex items-center gap-2.5 py-1 font-medium first-of-type:pt-0"
              >
                <span>{connection.title}</span>
                <Arrow className="size-4 opacity-0 transition-all group-hover:opacity-100" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Section = ({
  title,
  children,
}: { title: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-8">
      <span>{title}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
