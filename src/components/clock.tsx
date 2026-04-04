import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

const getNewYorkTime = () => formatter.format(new Date())

export const Clock = () => {
  const [display, setDisplay] = useState(getNewYorkTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(getNewYorkTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span className="tabular-nums tracking-tighter">{display}</span>
}
