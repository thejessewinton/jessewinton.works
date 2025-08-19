import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { Clock } from '~/components/shared/clock'
import { Weather } from '~/components/shared/weather'

import { allIndices } from '~/content-collections'

const index = allIndices[0]!

export const metadata: Metadata = {
  title: index.title,
  description: index.description,
}

export default function Index() {
  return (
    <div className="flex w-full flex-col flex-wrap justify-between gap-20 leading-tight md:flex-row">
      <div className="flex flex-col gap-8">
        <span className="font-medium ">Jesse Winton</span>
        <p>{index.now}</p>
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
                {experience.dates} — {experience.title}
                <span className="font-medium"> [{experience.company}]</span>
              </p>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="font-medium">Connect</span>
        <div className="flex flex-col gap-2 leading-tight">
          <a href="/" className="flex items-center justify-between gap-1">
            [Github] <ArrowUpRight />
          </a>
          <a href="/" className="flex items-center justify-between gap-1">
            [Twitter] <ArrowUpRight />
          </a>
          <a href="/" className="flex items-center justify-between gap-1">
            [Email] <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  )
}
