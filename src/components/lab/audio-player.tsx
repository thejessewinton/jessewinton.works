'use client'

import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { create } from 'zustand'
import LoveSong from '~/assets/love-song.jpeg'
import MiddleOfNowhere from '~/assets/middle-of-nowhere.jpeg'
import { cn } from '~/utils/cn'

const tracks = [
  {
    title: 'A Love Song Seven Ways',
    artist: 'Benjamin Lazar Davis',
    art: LoveSong,
  },
  {
    title: 'Middle of Nowhere',
    artist: 'Vancouver Sleep Clinic',
    art: MiddleOfNowhere,
  },
]

type PlayerState = {
  isPlaying: boolean
  setIsPlaying: () => void
  trackIndex: number
  setTrackIndex: (trackIndex: number) => void
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  setIsPlaying: () => set({ isPlaying: !get().isPlaying }),
  trackIndex: 0,
  setTrackIndex: (trackIndex) => set({ trackIndex }),
}))

export const AudioPlayer = () => {
  return (
    <MotionConfig
      transition={{
        duration: 0.25,
        ease: 'easeInOut',
        stiffness: 260,
        damping: 20,
        type: 'spring',
      }}
    >
      <div className="flex flex-col gap-4 rounded-lg border border-neutral-200/40 bg-linear-to-br from-transparent to-neutral-200/40 p-8 shadow-black/10 shadow-md dark:border-neutral-700/40 dark:to-neutral-800/40">
        <TrackInfo />
        <div className="mt-4 flex items-center justify-center gap-4">
          <BackButton />
          <PlayPause />
          <SkipButton />
        </div>
      </div>
    </MotionConfig>
  )
}

const BackButton = () => {
  const [array, setArray] = useState<Array<number>>([0, 1])
  const { trackIndex, setTrackIndex } = usePlayerStore()

  const handleClick = () => {
    setTrackIndex(trackIndex === 0 ? trackIndex + 1 : trackIndex - 1)
    setArray(([_, second]) => [second!, Math.floor(Math.random() * 1000) + 1])
  }

  const variants = {
    enter: {
      x: 5,
      opacity: 0,
      scale: 0.3,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: -5,
      opacity: 0,
      scale: 0.5,
    },
  }

  return (
    <>
      <svg height="0" width="0" className="absolute">
        <title>Previous</title>
        <defs>
          <clipPath id="back" clipPathUnits="objectBoundingBox">
            <path d="M1,.21 Q1,0 .81,.09L.187,.4 Q0,.5 .187,.59L.81,.90 Q1,1 1,.79Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={cn('flex justify-center gap-4')}>
        <button
          onClick={() => {
            handleClick()
          }}
          type="button"
          className="flex size-5 items-center justify-center"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {array.map((index) => {
              return (
                <motion.span
                  className="size-4 bg-neutral-800 dark:bg-white"
                  style={{
                    clipPath: 'url(#back)',
                  }}
                  key={index}
                  variants={variants}
                  initial="enter"
                  animate="animate"
                  exit="exit"
                  layout
                />
              )
            })}
          </AnimatePresence>
        </button>
      </div>
    </>
  )
}

const SkipButton = () => {
  const [array, setArray] = useState<Array<number>>([0, 1])
  const { trackIndex, setTrackIndex } = usePlayerStore()

  const handleClick = () => {
    setTrackIndex(trackIndex === tracks.length - 1 ? 0 : trackIndex + 1)
    setArray(([first]) => [Math.floor(Math.random() * 1000) + 1, first!])
  }

  const variants = {
    enter: {
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
      scale: 0.5,
    },
  }

  return (
    <>
      <svg height="0" width="0" className="absolute">
        <title>Skip</title>
        <defs>
          <clipPath id="skip" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(-1, 1) translate(-1, 0)"
              d="M1,.21 Q1,0 .81,.09L.187,.4 Q0,.5 .187,.59L.81,.90 Q1,1 1,.79Z"
            />
          </clipPath>
        </defs>
      </svg>
      <div className={cn('flex justify-center gap-4')}>
        <button
          onClick={() => {
            handleClick()
          }}
          type="button"
          className="flex size-5 items-center justify-center"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {array.map((index) => {
              return (
                <motion.span
                  className="size-4 bg-neutral-800 text-black dark:bg-white"
                  style={{
                    clipPath: 'url(#skip)',
                  }}
                  key={index}
                  variants={variants}
                  initial="enter"
                  animate="animate"
                  exit="exit"
                  layout
                />
              )
            })}
          </AnimatePresence>
        </button>
      </div>
    </>
  )
}

const PlayPause = () => {
  const { isPlaying, setIsPlaying } = usePlayerStore()

  const variants = {
    enter: {
      opacity: 0,
      scale: 0.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.1,
    },
  }

  return (
    <motion.button
      onClick={() => setIsPlaying()}
      className="flex w-[40px] items-center justify-center"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={isPlaying ? 'playing' : 'paused'}
          variants={variants}
          initial="enter"
          animate="animate"
          exit="exit"
          layout
          className="block"
        >
          {isPlaying ? (
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Pause</title>
              <rect
                x="5"
                y="0"
                width="10"
                height="38"
                rx="2"
                className="h-full fill-neutral-800 dark:fill-white"
              />
              <rect
                x="19"
                y="0"
                width="10"
                height="38"
                rx="2"
                className="h-full fill-neutral-800 dark:fill-white"
              />
            </svg>
          ) : (
            <svg
              width="29"
              height="38"
              viewBox="0 0 29 38"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
            >
              <title>Play</title>
              <path
                d="M28.0031 17.6687C28.9531 18.302 28.9531 19.698 28.0031 20.3313L2.48751 37.3417C1.42422 38.0505 -7.17281e-06 37.2883 -7.18805e-06 36.0104L-7.59374e-06 1.98963C-7.60898e-06 0.711717 1.42423 -0.050511 2.48751 0.658348L28.0031 17.6687Z"
                className="fill-neutral-800 dark:fill-white"
              />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

const TrackInfo = () => {
  const { isPlaying, trackIndex } = usePlayerStore()

  const variants = {
    initial: {
      filter: 'blur(5px)',
      transform: 'scale(0.9)',
      opacity: 0,
    },
    animate: {
      filter: 'blur(0px)',
      transform: 'scale(1)',
      opacity: 1,
    },
    exit: {
      filter: 'blur(5px)',
      transform: 'scale(0.9)',
      opacity: 0,
    },
  }

  return (
    <>
      <motion.div
        animate={{
          transform: isPlaying ? 'scale(1)' : 'scale(0.95)',
        }}
        initial={false}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={tracks[trackIndex]!.art.src}
            className="size-64 overflow-hidden rounded-md shadow-black/20 shadow-xs"
          >
            <Image priority src={tracks[trackIndex]!.art} alt="" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          key={tracks[trackIndex]!.title}
        >
          <h2 className="font-bold text-lg">{tracks[trackIndex]!.title}</h2>
          <p className="text-neutral-500">{tracks[trackIndex]!.artist}</p>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
