'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useElementMousePosition } from '~/hooks/use-ref-mouse-position'
import { cn } from '~/utils/classnames'

export const LineGrid = () => {
  const items = Array.from({ length: 54 }, (_, i) => i)
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const { x } = useElementMousePosition(ref)

  const itemWidth = 9

  return (
    <div
      className="flex items-end gap-2 p-4"
      ref={ref}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {items.map((_, i) => {
        const itemCenterX = i * itemWidth + itemWidth / 2
        const distance = Math.abs(x! - itemCenterX)
        const maxScale = 4
        const falloffDistance = 30

        return (
          <motion.div
            className={cn(
              'w-px rounded-md',
              i % 8 ? 'h-4 bg-neutral-500' : 'h-6 bg-orange-700',
            )}
            key={i}
            style={{
              scaleY: isHovering
                ? Math.max(
                    1,
                    maxScale - (distance / falloffDistance) * (maxScale - 1),
                  )
                : 1,
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
