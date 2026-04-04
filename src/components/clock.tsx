import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const newYorkTime = () => {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
    }),
  )
}

export const Clock = () => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(newYorkTime())
    const interval = setInterval(() => {
      setTime(newYorkTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!time) {
    return <span className="tabular-nums tracking-tighter">&nbsp;</span>
  }

  return (
    <span className="tabular-nums tracking-tighter">
      {format(time, 'h:mm:ss a')}
    </span>
  )
}
