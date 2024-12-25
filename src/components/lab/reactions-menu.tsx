'use client'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import { type RefObject, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useOnClickOutside } from 'usehooks-ts'
import { useLongPress } from '~/hooks/use-long-press'
import { cn } from '~/utils/classnames'

const reactions = ['🎅', '🎄', '🤶', '❄️', '☃️', '🎁', '🧑‍🎄', '⛪']

export const ReactionsMenu = () => {
  const [open, setOpen] = useState(false)

  const { ...longPressHandlers } = useLongPress({
    duration: 500,
    callback: () => setOpen(true),
  })

  const ref = useRef<HTMLElement>(null)

  const handleClose = () => setOpen(false)

  useHotkeys('Escape', handleClose)
  useOnClickOutside(ref as RefObject<HTMLDivElement>, handleClose)

  const blobVariants: Variants = {
    initial: {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
      opacity: 0,
    },
    transitioning: {
      x: 0,
      y: -82,
      width: 16,
      height: 44,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.1,
      },
    },
    open: {
      width: 250,
      x: 40,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.15,
        type: 'spring',
        bounce: 0.3,
      },
    },
    exit: {
      opacity: 1,
      width: [250, 44, 16],
      x: [40, 0, 0],
      y: [null, -82, -20],
      height: [44, 44, 16],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1],
        ease: 'easeInOut',
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  }

  const reactionVariants: Variants = {
    initial: {
      opacity: 0,
      x: 20,
      filter: 'blur(4px)',
      rotate: '40deg',
    },
    open: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      rotate: '0deg',
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      filter: 'blur(4px)',
      rotate: '40deg',
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <>
      <Goo />
      <div
        className="absolute inset-0 flex w-full items-center justify-center gap-8"
        style={{
          filter: 'url(#goo)',
        }}
      >
        <div className="relative" ref={ref as RefObject<HTMLDivElement>}>
          <button
            type="button"
            className={cn(
              'relative z-10 flex h-8 select-none items-center rounded-full px-3 text-neutral-800 text-xs tracking-tight transition-colors duration-500 md:text-sm',
              open ? 'bg-neutral-100' : 'bg-neutral-300',
            )}
            {...longPressHandlers}
          >
            Merry Christmas and a Happy New Year!
          </button>

          <div
            className="relative"
            style={{
              filter: 'url(#goo)',
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="blob"
                  className={cn(
                    '-z-10 no-scrollbar absolute right-0 flex h-full origin-left items-center gap-3 overflow-x-scroll rounded-full px-4',
                    open ? 'bg-neutral-100' : 'bg-neutral-300',
                  )}
                  variants={blobVariants}
                  initial="initial"
                  animate={['transitioning', 'open']}
                  exit="exit"
                >
                  {reactions.map((reaction) => (
                    <motion.button
                      type="button"
                      className="text-xl"
                      key={reaction}
                      variants={reactionVariants}
                      initial="initial"
                      animate="open"
                      exit="exit"
                      onClick={handleClose}
                    >
                      {reaction}
                    </motion.button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div
        className={cn(
          '-z-10 absolute inset-0 bg-black/10 transition-all',
          open ? 'bg-black/10' : 'bg-transparent',
        )}
      />
    </>
  )
}

const Goo = () => {
  return (
    <svg aria-hidden="true">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}
