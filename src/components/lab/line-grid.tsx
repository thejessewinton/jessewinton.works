'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '~/utils/classnames'

export const LineGrid = () => {
  const items = Array.from({ length: 54 }, (_, i) => i)
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const isHovered = useMotionValue(0)

  const mappedScale = useTransform(
    mouseX,
    [-48, -38.4, -24, 0, 24, 38.4, 48],
    [1, 1, 2.1, 3.2, 2.1, 1, 1],
  )

  const scaleValue = useSpring(mappedScale, {
    stiffness: 400,
    damping: 90,
  })

  return (
    <motion.div
      onMouseMove={({ pageX }) => {
        isHovered.set(1)
        mouseX.set(pageX)
      }}
      onMouseLeave={() => {
        isHovered.set(0)
        mouseX.set(Number.POSITIVE_INFINITY)
      }}
      ref={cursorRef}
      className="flex items-end gap-2 p-4"
    >
      {items.map((_, i) => {
        return (
          <motion.div
            key={i}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            className={cn(
              'w-px rounded-md',
              i % 8 ? 'h-4 bg-neutral-500' : 'h-6 bg-white',
            )}
            style={{ scale: scaleValue }}
          />
        )
      })}
    </motion.div>
  )
}
