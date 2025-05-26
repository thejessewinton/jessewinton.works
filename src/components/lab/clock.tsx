'use client'
import { type CSSProperties, useEffect, useState } from 'react'

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

  const hoursNumbers = Array.from({ length: 12 }, (_, i) => i + 1)

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setTime(newYorkTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) return null

  return (
    <div
      className="relative flex size-80 rotate-180 animate-fade-blur items-center justify-center rounded-full border border-neutral-500"
      style={
        {
          '--now-h': time.getHours(),
          '--now-m': time.getMinutes(),
          '--now-s': time.getSeconds(),
          '--hours-degrees':
            'calc(var(--now-h) + var(--now-m) / 60 / 12 * 360deg)',
          '--minutes-degrees':
            'calc(((var(--now-m) / 60) * 360) + ((var(--now-s) / 60) * 6))',
          '--seconds-degrees': 'calc((var(--now-s) / 60) * 360)',
        } as CSSProperties
      }
    >
      {hoursNumbers.map((hour) => (
        <div
          key={hour}
          className="-translate-x-1/2 absolute left-1/2 font-medium text-neutral-600 text-sm"
          style={{
            transform: `rotate(${hour * 30 + 180}deg) translateY(-130px)`,
          }}
        >
          {hour}
        </div>
      ))}
      <div
        className="absolute top-1/2 h-[var(--height)] w-[var(--width)] rounded-xs bg-neutral-500"
        style={
          {
            '--height': '120px',
            '--width': '1.5px',
            transformOrigin: 'center 0',
            left: 'calc(50% - var(--width) / 2)',
            transform: 'rotate(calc(var(--seconds-degrees) * 1deg))',
          } as CSSProperties
        }
      />
      <div
        className="absolute top-1/2 h-[var(--height)] w-[var(--width)] rounded-xs bg-neutral-600"
        style={
          {
            '--height': '100px',
            '--width': '3px',
            transformOrigin: 'center 0',
            left: 'calc(50% - var(--width) / 2)',
            transform: 'rotate(calc(var(--minutes-degrees) * 1deg))',
          } as CSSProperties
        }
      />
      <div
        className="absolute top-1/2 h-[var(--height)] w-[var(--width)] rounded-xs bg-neutral-600 transition-all"
        style={
          {
            '--height': '75px',
            '--width': '3px',
            transformOrigin: 'center 0',
            left: 'calc(50% - var(--width) / 2)',
            transform: 'rotate(calc(var(--hours-degrees) * 1deg))',
          } as CSSProperties
        }
      />
    </div>
  )
}
