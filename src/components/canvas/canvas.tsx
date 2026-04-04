import {
  type ReactNode,
  createContext,
  memo,
  useContext,
  useMemo,
} from 'react'
import { cn } from '~/utils/cn'
import { type CanvasBounds, type CanvasTransform, useCanvas } from './use-canvas'

interface CanvasContextValue {
  transform: CanvasTransform
  getViewportBounds: () => CanvasBounds
}

const CanvasContext = createContext<CanvasContextValue | null>(null)

export const useCanvasContext = () => {
  const ctx = useContext(CanvasContext)
  if (!ctx) throw new Error('useCanvasContext must be used within a Canvas')
  return ctx
}

interface CanvasProps {
  children: ReactNode
  className?: string
  minScale?: number
  maxScale?: number
  initialTransform?: Partial<CanvasTransform>
}

export const Canvas = ({
  children,
  className,
  minScale,
  maxScale,
  initialTransform,
}: CanvasProps) => {
  const { transform, containerRef, handlers, getViewportBounds } = useCanvas({
    minScale,
    maxScale,
    initialTransform,
  })

  const ctx = useMemo(
    () => ({ transform, getViewportBounds }),
    [transform, getViewportBounds],
  )

  return (
    <CanvasContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={cn('relative h-full w-full overflow-hidden', className)}
        {...handlers}
      >
        <div
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </CanvasContext.Provider>
  )
}

interface CanvasItemProps {
  children: ReactNode
  x: number
  y: number
  width?: number
  height?: number
  className?: string
  padding?: number
}

export const CanvasItem = memo(
  ({ children, x, y, width, height, className, padding = 200 }: CanvasItemProps) => {
    const { getViewportBounds } = useCanvasContext()

    if (width != null && height != null) {
      const bounds = getViewportBounds()
      const visible =
        x + width + padding > bounds.left &&
        x - padding < bounds.right &&
        y + height + padding > bounds.top &&
        y - padding < bounds.bottom

      if (!visible) return null
    }

    return (
      <div
        className={cn('absolute', className)}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width,
          height,
        }}
      >
        {children}
      </div>
    )
  },
)

CanvasItem.displayName = 'CanvasItem'
