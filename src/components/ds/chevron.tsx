import { motion } from 'motion/react'

interface ChevronProps {
  side: 'left' | 'right'
  size: number
}

export const Chevron = ({ side, size = 16 }: ChevronProps) => {
  const path = {
    left: 'M15 6 L9 12 L15 18',
    right: 'M9 6 L15 12 L9 18',
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={false}
        animate={{ d: path[side] }}
        transition={{ duration: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
      />
    </svg>
  )
}
