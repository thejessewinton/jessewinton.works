import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock } from '~/components/shared/clock'
import { Glitch } from '~/components/shared/glitch'
import { Weather } from '~/components/shared/weather'

import { allIndices } from '~/content-collections'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
}

export default function Index() {
  return (
    <div className="grid w-full grid-cols-1 justify-between gap-12 leading-tight md:grid-cols-[repeat(2,max-content)] md:gap-30 lg:grid-cols-[repeat(4,max-content)]">
      <div className="flex flex-col gap-8">
        <span className="font-medium ">Jesse Winton</span>
        <span>
          {index.now.title} —{' '}
          <Link href={index.now.url} target="_blank">
            <Glitch text={index.now.company} />
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">NYC</span>
        <div className="flex flex-col gap-2">
          <Clock />
          <Weather />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Tech</span>
        <div className="flex flex-col gap-2">
          {index.tech.map((tech) => {
            return <p key={tech}>{tech}</p>
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Experience</span>
        <div className="flex flex-col gap-2">
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
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Projects</span>
        <div className="flex flex-col">
          {index.projects.map((project) => {
            return (
              <Link
                href={project.url}
                key={project.title}
                className="group flex items-center justify-between gap-1 py-1 font-medium first-of-type:pt-0"
              >
                <span>{project.title}</span>
                <ArrowUpRight className="opacity-0 blur-sm transition-all group-hover:opacity-100 group-hover:blur-none" />
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Connect</span>
        <div className="flex flex-col">
          {index.connections.map((connection) => {
            return (
              <Link
                href={connection.url}
                key={connection.title}
                className="group flex items-center justify-between py-1 font-medium first-of-type:pt-0"
              >
                <span>{connection.title}</span>
                <ArrowUpRight className="opacity-0 blur-sm transition-all group-hover:opacity-100 group-hover:blur-none" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
