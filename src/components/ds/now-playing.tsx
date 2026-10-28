import { use } from 'react'
import type { getNowPlaying } from '~/utils/now-playing.functions'

export const NowPlaying = ({
  track,
}: {
  track: ReturnType<typeof getNowPlaying>
}) => {
  const nowPlaying = use(track)

  if (!nowPlaying) return null

  return (
    <p className="line-clamp-1 animate-fade-in uppercase">
      Now Playing ~ <cite className="not-italic">{nowPlaying.title}</cite> by{' '}
      <span className="text-sm">{nowPlaying.artist}</span>
    </p>
  )
}
