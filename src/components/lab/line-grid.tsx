'use client'

import { motion } from 'motion/react'
import { useMousePosition } from '~/hooks/use-mouse-position'

export const LineGrid = () => {
  const items = Array.from({ length: 40 }, (_, i) => i)
  const { x, y } = useMousePosition()

  return (
    <div className="flex items-center gap-3">
      {items.map((_, i) => {
        return (
          <motion.div
            className="h-10 w-px bg-neutral-300 dark:bg-neutral-700"
            key={i}
            animate={{
              scale: x && y ? 1.5 : 1,
              rotate: x && y ? 360 : 0,
            }}
          />
        )
      })}
    </div>
  )
}
