import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '~/utils/cn'

const PIXELS_PER_SECOND = 30
// Matches the moving share of the marquee keyframes; the rest is the pause at each end.
const TRAVEL_SHARE = 0.6

interface MarqueeProps {
  children: ReactNode
  className?: string
}

export const Marquee = ({ children, className }: MarqueeProps) => {
  const containerRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const measure = () => {
      setOverflow(Math.max(0, content.offsetWidth - container.clientWidth))
    }

    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(content)

    return () => observer.disconnect()
  }, [])

  const style =
    overflow > 0
      ? ({
          '--marquee-distance': `-${overflow}px`,
          '--marquee-duration': `${overflow / PIXELS_PER_SECOND / TRAVEL_SHARE}s`,
        } as CSSProperties)
      : undefined

  return (
    <span
      ref={containerRef}
      className={cn(
        'overflow-hidden whitespace-nowrap motion-reduce:text-ellipsis',
        overflow > 0 &&
          'motion-safe:animate-marquee-mask motion-safe:mask-marquee',
        className,
      )}
      style={style}
    >
      <span
        ref={contentRef}
        className={cn(
          'motion-safe:inline-block',
          overflow > 0 && 'motion-safe:animate-marquee',
        )}
      >
        {children}
      </span>
    </span>
  )
}
