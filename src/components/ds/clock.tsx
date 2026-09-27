import { useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'

const TIME_ZONE = 'America/New_York'

const formatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
} as const

const getNewYorkTime = () => {
  return Temporal.Now.zonedDateTimeISO(TIME_ZONE).toLocaleString(
    'en-US',
    formatOptions,
  )
}

const msUntilNextSecond = () => {
  const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE)
  const nextSecond = now
    .round({ smallestUnit: 'second', roundingMode: 'floor' })
    .add({ seconds: 1 })

  return now.until(nextSecond).total({ unit: 'milliseconds' })
}

export const Clock = () => {
  const [display, setDisplay] = useState(getNewYorkTime)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      setDisplay(getNewYorkTime())
      timeoutId = setTimeout(tick, msUntilNextSecond())
    }

    timeoutId = setTimeout(tick, msUntilNextSecond())

    return () => clearTimeout(timeoutId)
  }, [])

  return <span className="tabular-nums tracking-tighter">{display}</span>
}
