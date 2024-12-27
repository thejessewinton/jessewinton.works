'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useWeather } from '~/hooks/use-weather'
import { cn } from '~/utils/classnames'

export const Weather = () => {
  const { data, isLoading } = useWeather()
  const [unit, setUnit] = useState<'c' | 'f'>('f')

  const handleSetUnit = () => {
    setUnit((prev) => (prev === 'c' ? 'f' : 'c'))
  }

  return (
    <button
      type="button"
      onClick={handleSetUnit}
      className="flex cursor-pointer items-center justify-center gap-2 text-neutral-500 text-sm outline-none transition-colors focus-visible:text-neutral-400"
    >
      <motion.div
        className={cn(
          'flex',
          'data-[starting-style]:translate-y-4 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:blur-sm',
          'data-[ending-style]:translate-y-4 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:blur-0',
        )}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={unit}
              className="block"
              initial={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
              transition={{
                type: 'spring',
                damping: 10,
              }}
            >
              {unit === 'c'
                ? `${data!.current.temperature_2m}°C`
                : `${((data!.current.temperature_2m * 9) / 5 + 32).toFixed()}°F`}
            </motion.span>
          </AnimatePresence>
        )}
      </motion.div>
      <span className="inline-block">{'— NYC'}</span>
    </button>
  )
}

const Loader = () => {
  const [array, setArray] = useState<Array<number>>([0, 1, 2])

  useEffect(() => {
    const interval = setInterval(() => {
      setArray(([first, second]) => [
        Math.floor(Math.random() * 1000) + 1,
        first!,
        second!,
      ])
    }, 750)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    initial: {
      x: -5,
      opacity: 0,
      scale: 0.3,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: 5,
      opacity: 0,
      scale: 0.3,
    },
  }

  return (
    <div className="flex w-fit items-center justify-center gap-1">
      <AnimatePresence initial={false} mode="popLayout">
        {array.map((index) => {
          return (
            <motion.div
              className="size-1 rounded-full bg-neutral-800 dark:bg-white"
              key={index}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
