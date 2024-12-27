'use client'

import { motion, useMotionValue, useTransform } from 'motion/react'
import { type MouseEvent, useRef } from 'react'
import { cn } from '~/utils/classnames'

export const LineGrid = () => {
  const items = Array.from({ length: 54 }, (_, i) => i)

  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue<number>(0)

  const mappedScale = useTransform(
    mouseX,
    [-48, -38.4, -24, 0, 24, 38.4, 48],
    [1, 1, 2.1, 3.2, 2.1, 1, 1],
  )

  console.log(mappedScale.get(), mouseX.get())

  const handleMouseMove = (event: MouseEvent) => {
    const rect = cursorRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(event.clientX - rect.left)
  }

  return (
    <div
      className="flex items-end gap-2 p-4"
      onMouseMove={handleMouseMove}
      ref={cursorRef}
    >
      {items.map((_, i) => {
        const mappedScale = useTransform(mouseX, (value) => {
          const itemX = i * 10
          const distance = Math.abs(value - itemX)
          const maxDistance = 48
          if (distance > maxDistance) return 1
          const scale = 1 + 3.2 * (1 - distance / maxDistance)
          return scale
        })

        return (
          <motion.div
            key={i}
            className={cn(
              'rounded-md',
              i % 8 ? 'h-4 bg-neutral-500' : 'h-6 bg-white',
            )}
            style={{
              width: 1,
              scaleY: mappedScale,
            }}
            transition={{ damping: 20, stiffness: 200, type: 'spring' }}
          />
        )
      })}
    </div>
  )
}
