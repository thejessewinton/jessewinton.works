'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export const newYorkTime = () => {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
    }),
  )
}

export const Clock = () => {
  const [time, setTime] = useState(newYorkTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(newYorkTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="tabular-nums tracking-tighter">
      {format(time, 'hh:mm:ss a')}
    </span>
  )
}
