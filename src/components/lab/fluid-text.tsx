'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  type ComponentPropsWithRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

type FluidTextProps = {
  children: string
} & ComponentPropsWithRef<'div'>

export const FluidText = ({
  children,
  className,
  ...props
}: FluidTextProps) => {
  const uniqueId = useId()
  const initialRender = useRef(true)
  const textsRef = useRef<string[]>([])
  const [direction, setDirection] = useState(1)
  const [currentText, setCurrentText] = useState(children)

  useEffect(() => {
    if (initialRender.current) {
      textsRef.current.push(children)
      initialRender.current = false
      return
    }

    const currentIndex = textsRef.current.indexOf(children)
    const previousIndex = textsRef.current.indexOf(currentText)

    if (currentIndex === -1) {
      textsRef.current.push(children)
      setDirection(1)
    } else if (currentIndex < previousIndex) {
      setDirection(-1)
    } else if (currentIndex > previousIndex) {
      setDirection(1)
    }

    setCurrentText(children)
  }, [currentText, children])

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {}

    return currentText.split('').map((char, index) => {
      const lowerChar = char.toLowerCase()
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: index === 0 ? char.toUpperCase() : lowerChar,
      }
    })
  }, [currentText, uniqueId])

  const variants = {
    initial: (direction: number) => {
      return { opacity: 0, x: direction * 5 }
    },
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => {
      return { opacity: 0, x: direction * -5 }
    },
  }

  return (
    <div className={className} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 18,
              mass: 0.3,
            }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
