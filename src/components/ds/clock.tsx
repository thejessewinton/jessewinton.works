import NumberFlow from '@number-flow/react'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __CLOCK_TIME__?: number
  }
}

const CLOCK_ID = 'clock'

const getTimeParts = (time: number) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(time)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''

  return {
    hour: Number(get('hour')),
    minute: Number(get('minute')),
    second: Number(get('second')),
    period: get('dayPeriod'),
  }
}

// Prerendered HTML holds the build-time value. NumberFlow digits live in a
// shadow root this script can't reach, so it hides the clock until mount,
// fixes the period text, and saves the time so hydration renders the same.
const paintScript = `(() => {
  const time = Date.now()
  window.__CLOCK_TIME__ = time
  const clock = document.getElementById('${CLOCK_ID}')
  clock.querySelector('[data-unit="period"]').textContent = (${getTimeParts})(time).period
})()`

const getInitialTime = () => {
  if (typeof window === 'undefined') return Date.now()

  const isHydrating = document.getElementById(CLOCK_ID) !== null
  return (isHydrating && window.__CLOCK_TIME__) || Date.now()
}

const msUntilNextSecond = () => 1000 - (Date.now() % 1000)

const twoDigits = { minimumIntegerDigits: 2 }

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

  const { hour, minute, second, period } = getTimeParts(time)

  return (
    <>
      <span id={CLOCK_ID}>
        <NumberFlow value={hour} data-unit="hour" suffix=":" />
        <NumberFlow
          value={minute}
          format={twoDigits}
          data-unit="minute"
          suffix=":"
        />
        <NumberFlow
          value={second}
          format={twoDigits}
          data-unit="second"
          suffix=" "
        />
        <span data-unit="period">{period}</span>
      </span>
      <script dangerouslySetInnerHTML={{ __html: paintScript }} />
    </>
  )
}
