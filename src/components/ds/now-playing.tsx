import { use } from 'react'

import { Marquee } from '~/components/ds/marquee'
import type { getNowPlaying } from '~/utils/now-playing.functions'

export const NowPlaying = ({
  track,
}: {
  track: ReturnType<typeof getNowPlaying>
}) => {
  const nowPlaying = use(track)

  if (!nowPlaying) return null

  return (
    <p className="flex animate-fade-in uppercase">
      <span className="shrink-0 whitespace-pre">Now Playing ~ </span>
      <Marquee>
        <cite className="not-italic">{nowPlaying.title}</cite> by{' '}
        <span className="text-sm">{nowPlaying.artist}</span>
      </Marquee>
    </p>
  )
}
