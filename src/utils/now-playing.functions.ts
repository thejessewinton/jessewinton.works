import { createServerFn } from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'

import { fetchNowPlaying } from './now-playing.server'

export const getNowPlaying = createServerFn({ method: 'GET' }).handler(
  async () => {
    setResponseHeaders(
      new Headers({
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=30',
      }),
    )

    return fetchNowPlaying().catch(() => null)
  },
)
