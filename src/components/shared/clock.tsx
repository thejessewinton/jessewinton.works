'use client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export const newYorkTime = () => {
  const now = new Date()
  return new Date(
    now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
    }),
  )
}

export const Clock = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [time, setTime] = useState(newYorkTime)

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setTime(newYorkTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) return <span className="block" />

  return (
    <div>
      <span className="font-mono tabular-nums tracking-tighter">
        {format(time, 'h:mm:ss')}
      </span>
      <span>{format(time, ' a')}</span>
    </div>
  )
}
