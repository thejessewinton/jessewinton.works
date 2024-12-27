'use client'

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef, useState } from 'react'
import { cn } from '~/utils/classnames'

export const LineGrid = () => {
  const items = Array.from({ length: 54 }, (_, i) => i)
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const y = useMotionValue(0)
  const yVelocity = useVelocity(y)
  const scale = useTransform(yVelocity, [-3000, 0, 3000], [2, 1, 2], {
    clamp: false,
  })

  useMotionValueEvent(yVelocity, 'change', (latest) => {
    console.log('Velocity', latest)
  })

  return (
    <div
      className="flex items-end gap-2 p-4"
      ref={ref}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {items.map((_, i) => {
        return (
          <motion.div
            className={cn(
              'w-px rounded-md',
              i % 8 ? 'h-4 bg-neutral-500' : 'h-6 bg-orange-700',
            )}
            key={i}
            style={{
              scaleY: isHovering ? scale.get() : 1,
            }}
            transition={{
              type: 'spring',
              bounce: 0.25,
            }}
          />
        )
      })}
    </div>
  )
}
