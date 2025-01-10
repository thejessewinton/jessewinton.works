'use client'

import { motion, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '~/utils/classnames'

const WaveBar = ({
  hovered,
  mouseX,
  index,
}: {
  hovered: boolean
  mouseX: number
  index: number
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const scaleY = useSpring(1, {
    damping: 30,
    stiffness: 200,
  })

  const interpolateScale = useCallback((distance: number) => {
    const normalizedDist = Math.abs(distance / 48)
    if (normalizedDist > 1) return 1

    return 1 + 2.2 * (1 - normalizedDist * normalizedDist)
  }, [])

  useEffect(() => {
    const bar = barRef.current
    if (!bar || mouseX === null) return

    const rect = bar.getBoundingClientRect()
    const barCenter = rect.left + rect.width / 2
    const distance = mouseX - barCenter

    const newScale = interpolateScale(distance)
    scaleY.set(newScale)
  }, [mouseX, interpolateScale, scaleY])

  return (
    <motion.div
      ref={barRef}
      className={cn(
        'w-px rounded-md',
        index % 8 ? 'h-4 bg-neutral-500' : 'h-6 bg-white',
      )}
      initial={false}
      transition={{
        type: 'spring',
        stiffness: hovered ? 300 : 200,
        damping: hovered ? 25 : 20,
      }}
      style={{
        scaleY,
      }}
    />
  )
}

export const LineGrid = () => {
  const [mouseX, setMouseX] = useState<number>(0)

  return (
    <motion.div
      className="flex items-end gap-2 p-4"
      onMouseMove={({ clientX }) => setMouseX(clientX)}
      onMouseLeave={() => setMouseX(0)}
    >
      {Array.from({ length: 60 }).map((_, index) => (
        <WaveBar
          key={index}
          hovered={mouseX !== null}
          mouseX={mouseX}
          index={index}
        />
      ))}
    </motion.div>
  )
}
