'use client'

import { format } from 'date-fns'
import Script from 'next/script'
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
  const [time, setTime] = useState(() => {
    if (typeof window !== 'undefined' && window.__INITIAL_TIME__) {
      return new Date(window.__INITIAL_TIME__)
    }
    return new Date()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(newYorkTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <span className="tabular-nums tracking-tighter">
        {format(time, 'h:mm:ss a')}
      </span>
      <InlineScript />
    </>
  )
}

declare global {
  interface Window {
    __INITIAL_TIME__?: number
  }
}

const InlineScript = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `(${(
          () => {
            const nycTime = new Date(
              new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
                hour12: false,
              }),
            )
            window.__INITIAL_TIME__ = nycTime.getTime()
          }
        ).toString()})()`,
      }}
    />
  )
}
