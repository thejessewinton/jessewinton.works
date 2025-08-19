import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Clock } from '~/components/shared/clock'
import { Weather } from '~/components/shared/weather'

export default function Index() {
  return (
    <div className="flex w-full flex-col flex-wrap justify-between gap-24 md:flex-row">
      <div>
        <span className="font-medium">Jesse Winton</span>
        <p>Senior Frontend Engineer</p>
        <p>— Cosmos</p>
      </div>
      <div>
        <span className="font-medium">Located</span>
        <span className="block">NYC</span>
        <Clock />
        <Weather />
      </div>
      <div>
        <span className="font-medium">Tech</span>
        <p>React</p>
        <p>TypeScript</p>
        <p>Motion</p>
        <p>Three.js</p>
        <p>GraphQL</p>
        <p>WebGL</p>
        <p>Svelte</p>
      </div>
      <div>
        <span className="font-medium">Experience</span>
        <p>
          2024-25 — Design Engineer{' '}
          <span className="font-medium">[Appwrite]</span>
        </p>
        <p>
          2023-24 — Senior Design Engineer{' '}
          <span className="font-medium">[PlanetScale]</span>
        </p>
      </div>
      <div className="w-fit">
        <span className="font-medium">Connect</span>
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
  )
}
