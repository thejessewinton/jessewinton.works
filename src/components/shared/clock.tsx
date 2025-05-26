'use client'
import { Tooltip } from '@base-ui-components/react/tooltip'
import { format } from 'date-fns'
import { type CSSProperties, useEffect, useState } from 'react'
import { cn } from '~/utils/cn'

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

  if (!isMounted) return null

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <div
            className="relative flex size-6 rotate-180 items-center justify-center rounded-full border border-neutral-500"
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
            <div
              className="absolute top-1/2 h-[var(--height)] w-[var(--width)] rounded-xs bg-neutral-500"
              style={
                {
                  '--height': '8px',
                  '--width': '0.5px',
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
                  '--height': '7px',
                  '--width': '1px',
                  transformOrigin: 'center 0',
                  left: 'calc(50% - var(--width) / 2)',
                  transform: 'rotate(calc(var(--minutes-degrees) * 1deg))',
                } as CSSProperties
              }
            />
            <div
              className="absolute top-1/2 h-[var(--height)] w-[var(--width)] rounded-xs bg-neutral-600"
              style={
                {
                  '--height': '5px',
                  '--width': '1px',
                  transformOrigin: 'center 0',
                  left: 'calc(50% - var(--width) / 2)',
                  transform: 'rotate(calc(var(--hours-degrees) * 1deg))',
                } as CSSProperties
              }
            />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={10} side="top">
            <Tooltip.Popup
              className={cn(
                'flex items-center justify-center gap-2 rounded-md border border-neutral-200/40 bg-neutral-100/40 px-2 py-1 font-mono text-sm backdrop-blur-lg transition-all dark:border-neutral-700/40 dark:bg-neutral-950/20',
                'data-[starting-style]:translate-y-4 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:blur-sm',
                'data-[ending-style]:translate-y-4 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:blur-0',
              )}
            >
              {format(time, 'hh:mm:ss a')} EST
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
