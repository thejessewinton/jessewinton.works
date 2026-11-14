const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

let missingEnvLogged = false

type SpotifyCurrentlyPlaying = {
  is_playing?: boolean
  currently_playing_type?: string
  item?: {
    name?: string
    artists?: Array<{ name?: string }>
  } | null
}

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    if (!missingEnvLogged) {
      missingEnvLogged = true
      console.error(
        'Spotify now playing needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN.',
      )
    }
    return null
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  )

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) return null

  const json: { access_token?: string } = await response.json()

  return json.access_token ?? null
}

export const fetchNowPlaying = async () => {
  const accessToken = await getAccessToken()

  if (!accessToken) return null

  const response = await fetch(NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204 || !response.ok) return null

  const json: SpotifyCurrentlyPlaying = await response.json()
  const title = json.item?.name
  const artist = json.item?.artists
    ?.flatMap((artist) => (artist.name ? [artist.name] : []))
    .join(', ')

  if (!json.is_playing || json.currently_playing_type !== 'track') return null
  if (!title || !artist) return null

  return { title, artist }
}
