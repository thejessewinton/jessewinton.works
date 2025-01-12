'use client'

import { useMemo, useState } from 'react'
import { cn } from '~/utils/classnames'

export const Calendar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const activeItems = useMemo(
    () => Array.from({ length: activeIndex }).map((_, index) => index),
    [activeIndex],
  )

  return (
    <div className="inline-flex max-w-2xl flex-wrap gap-6">
      {Array.from({ length: 365 }).map((_, index) => {
        return (
          <div
            onMouseEnter={() => {
              setActiveIndex(index + 1)
            }}
            onMouseLeave={() => {
              setActiveIndex(0)
            }}
            key={index}
            className="size-2"
          >
            <div
              className={cn(
                'size-1 rounded-full transition-colors',
                activeItems.includes(index)
                  ? 'bg-neutral-100'
                  : 'bg-neutral-500',
              )}
              style={{
                transitionDelay: `${index * 0.001}s`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
