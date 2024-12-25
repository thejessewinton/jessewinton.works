'use client'

import * as ContextMenu from '@radix-ui/react-context-menu'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { type SVGProps, useMemo, useState } from 'react'
import { cn } from '~/utils/classnames'

type Size = 'small' | 'medium' | 'large'

export const PowerWidget = () => {
  const [size, setSize] = useState<Size>('small')
  const baseSize = 175

  const sizes: Record<
    Size,
    {
      width: number
      height: number
    }
  > = {
    small: {
      width: baseSize,
      height: baseSize,
    },
    medium: {
      width: baseSize * 2,
      height: baseSize,
    },
    large: {
      width: baseSize * 2,
      height: baseSize * 2,
    },
  }

  const items = useMemo(
    () => [
      {
        device: 'Macbook Pro',
        percentage: 33,
        icon: (
          <path
            fill="currentColor"
            d="M232,172H220V72a20,20,0,0,0-20-20H56A20,20,0,0,0,36,72V172H24a4,4,0,0,0-4,4v16a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V176A4,4,0,0,0,232,172ZM44,72A12,12,0,0,1,56,60H200a12,12,0,0,1,12,12V172H44ZM228,192a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V180H228ZM148,88a4,4,0,0,1-4,4H112a4,4,0,0,1,0-8h32A4,4,0,0,1,148,88Z"
          />
        ),
      },
      {
        device: 'iPhone',
        percentage: 19,
        icon: (
          <path
            fill="currentColor"
            d="M176,20H80A20,20,0,0,0,60,40V216a20,20,0,0,0,20,20h96a20,20,0,0,0,20-20V40A20,20,0,0,0,176,20ZM68,60H188V196H68ZM80,28h96a12,12,0,0,1,12,12V52H68V40A12,12,0,0,1,80,28Zm96,200H80a12,12,0,0,1-12-12V204H188v12A12,12,0,0,1,176,228Z"
          />
        ),
      },
      {
        device: 'iPad',
        percentage: 50,
        icon: (
          <path
            fill="currentColor"
            d="M192,28H64A20,20,0,0,0,44,48V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V48A20,20,0,0,0,192,28ZM52,68H204V188H52ZM64,36H192a12,12,0,0,1,12,12V60H52V48A12,12,0,0,1,64,36ZM192,220H64a12,12,0,0,1-12-12V196H204v12A12,12,0,0,1,192,220Z"
          />
        ),
      },
      {
        device: 'Airpods Pro',
        percentage: 66,
        icon: (
          <path
            fill="currentColor"
            d="M199.05,57.48A100.07,100.07,0,0,0,28,128v56a20,20,0,0,0,20,20H64a20,20,0,0,0,20-20V144a20,20,0,0,0-20-20H36.08A92,92,0,0,1,128,36h.7a91.75,91.75,0,0,1,91.22,88H192a20,20,0,0,0-20,20v40a20,20,0,0,0,20,20h16a20,20,0,0,0,20-20V128A99.43,99.43,0,0,0,199.05,57.48ZM64,132a12,12,0,0,1,12,12v40a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V132Zm156,52a12,12,0,0,1-12,12H192a12,12,0,0,1-12-12V144a12,12,0,0,1,12-12h28Z"
          />
        ),
      },
    ],
    [],
  )

  return (
    <ContextMenu.Root>
      <MotionConfig
        transition={{
          duration: 1,
          ease: 'easeInOut',
          type: 'spring',
          bounce: 0.3,
          visualDuration: 0.25,
        }}
      >
        <ContextMenu.Trigger>
          <AnimatePresence initial={false}>
            <motion.div
              animate={{
                width: sizes[size].width,
                height: sizes[size].height,
                opacity: 1,
                filter: 'blur(0px)',
              }}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className={cn(
                'grid rounded-2xl border border-neutral-700/40 bg-neutral-800 p-2',
              )}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {size === 'large' ? (
                  <motion.div layoutId="widget" className="flex flex-col">
                    {items.map((item) => {
                      return (
                        <motion.div
                          layoutId="widget"
                          key={item.device}
                          className="flex items-center justify-between"
                        >
                          <motion.div
                            layoutId="icon"
                            className="py-4 pr-4 pl-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="#000000"
                              viewBox="0 0 256 256"
                              className="size-5 text-white"
                            >
                              {item.icon}
                            </svg>
                          </motion.div>

                          <div className="flex flex-1 items-center justify-between border-neutral-700/40 border-b py-6 pr-6">
                            <span className="text-white text-xs">
                              {item.device}
                            </span>
                            <div className="flex items-center gap-4">
                              <motion.span
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                className="text-[10px] text-white"
                              >
                                {item.percentage}%
                              </motion.span>

                              <BatteryIcon percentage={item.percentage} />
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                ) : size === 'medium' ? (
                  <motion.div
                    layoutId="widget"
                    className="grid grid-cols-4 place-items-center"
                  >
                    {items.map((item) => {
                      return (
                        <motion.div
                          key={item.device}
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.div
                            layout
                            className="relative flex items-center justify-center"
                          >
                            <ChargeLevelIndicator
                              percentage={item.percentage}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="#000000"
                              viewBox="0 0 256 256"
                              className="absolute size-8 text-white"
                            >
                              {item.icon}
                            </svg>
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-lg tracking-tighter"
                          >
                            {item.percentage}%
                          </motion.span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    layoutId="widget"
                    className="grid grid-cols-2 place-items-center"
                  >
                    {items.map((item) => {
                      return (
                        <motion.div key={item.device}>
                          <motion.div
                            layout
                            className="relative flex items-center justify-center"
                          >
                            <ChargeLevelIndicator
                              percentage={item.percentage}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="#000000"
                              viewBox="0 0 256 256"
                              className="absolute size-8 text-white"
                            >
                              {item.icon}
                            </svg>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </ContextMenu.Trigger>

        <ContextMenu.Content className="rounded-md border border-neutral-700/40 bg-neutral-800/20 p-2 shadow-black/10 shadow-lg backdrop-blur-xl">
          <ContextMenu.Label className="mb-1 ml-4 font-light text-neutral-400 text-xs">
            Size
          </ContextMenu.Label>
          <ContextMenu.RadioGroup
            value={size}
            onValueChange={(e) => setSize(e as Size)}
            className="space-y-1"
          >
            {Object.keys(sizes).map((key) => {
              return (
                <ContextMenu.RadioItem
                  value={key}
                  key={key}
                  className="flex items-center gap-1 rounded-xs px-2 text-sm capitalize outline-hidden focus:bg-blue-700"
                >
                  <div className="size-3">
                    <ContextMenu.ItemIndicator>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </ContextMenu.ItemIndicator>
                  </div>
                  {key}
                </ContextMenu.RadioItem>
              )
            })}
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </MotionConfig>
    </ContextMenu.Root>
  )
}

type ChargeLevelIndicatorProps = SVGProps<SVGSVGElement> & {
  percentage?: number
  size?: number
  strokeWidth?: number
  color?: string
}

const ChargeLevelIndicator = ({
  size = 64,
  strokeWidth = 5,
  className,
  percentage = 75,
  ...props
}: ChargeLevelIndicatorProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn('-rotate-90 mx-auto transform', className)}
        {...props}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-neutral-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          className={cn({
            'stroke-red-500': percentage < 20,
            'stroke-yellow-300': percentage >= 20 && percentage < 40,
            'stroke-green-500': percentage >= 40,
          })}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      </svg>
    </>
  )
}

const BatteryIcon = ({ percentage }: { percentage: number }) => {
  return (
    <motion.div layout className="flex items-center gap-px">
      <div className="relative h-2 w-3.5 rounded-xs border border-white p-px">
        <div
          className={cn('h-full rounded-xs', {
            'bg-red-500': percentage < 20,
            'bg-yellow-300': percentage >= 20 && percentage < 40,
            'bg-green-500': percentage >= 40,
          })}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      <div className="h-1 w-[.75px] rounded-xs bg-white" />
    </motion.div>
  )
}
