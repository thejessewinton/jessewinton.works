import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __CLOCK_TIME__?: number
  }
}

const CLOCK_ID = 'clock'

// Stringified into the inline script below, so it may only reference globals.
const formatTime = (time: number) => {
  return new Date(time).toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })
}

// Prerendered HTML holds the build-time value. This runs before first paint
// to show the real time, and saves it so hydration renders the same text.
const paintScript = `(() => {
  const time = Date.now()
  window.__CLOCK_TIME__ = time
  document.getElementById('${CLOCK_ID}').textContent = (${formatTime})(time)
})()`

const getInitialTime = () => {
  if (typeof window === 'undefined') return Date.now()

  const isHydrating = document.getElementById(CLOCK_ID) !== null
  return (isHydrating && window.__CLOCK_TIME__) || Date.now()
}

const msUntilNextSecond = () => 1000 - (Date.now() % 1000)

export const Clock = () => {
  const [time, setTime] = useState(getInitialTime)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      setTime(Date.now())
      timeoutId = setTimeout(tick, msUntilNextSecond())
    }

    timeoutId = setTimeout(tick, msUntilNextSecond())

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <span id={CLOCK_ID}>{formatTime(time)}</span>
      <script dangerouslySetInnerHTML={{ __html: paintScript }} />
    </>
  )
}
