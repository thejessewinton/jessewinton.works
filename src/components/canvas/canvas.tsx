import {
  Children,
  type ReactElement,
  type ReactNode,
  createContext,
  memo,
  useContext,
  useMemo,
} from 'react'
import { cn } from '~/utils/cn'
import {
  type CanvasBounds,
  type CanvasTransform,
  useCanvas,
} from './use-canvas'

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
  columns?: number
  gap?: number
  columnWidth?: number
  minScale?: number
  maxScale?: number
  initialTransform?: Partial<CanvasTransform>
}

interface Position {
  x: number
  y: number
}

interface LayoutResult {
  x: number
  y: number
  width: number
  height: number
}

const computeLayout = (
  items: { width: number; height: number }[],
  columns: number,
  gap: number,
  columnWidth: number,
): LayoutResult[] => {
  if (items.length === 0) return []

  const columnHeights = new Array(columns).fill(0)
  const results: LayoutResult[] = []

  for (const item of items) {
    const shortest = columnHeights.indexOf(Math.min(...columnHeights))
    const x = shortest * (columnWidth + gap)
    const y = columnHeights[shortest]
    const scaledHeight = (item.height / item.width) * columnWidth

    results.push({ x, y, width: columnWidth, height: scaledHeight })
    columnHeights[shortest] += scaledHeight + gap
  }

  return results
}

export const Canvas = ({
  children,
  className,
  columns = 6,
  gap = 24,
  columnWidth = 300,
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

  const items = Children.toArray(children) as ReactElement<CanvasItemProps>[]

  const layout = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  return (
    <CanvasContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={cn('relative h-dvh w-dvw overflow-hidden', className)}
        {...handlers}
      >
        <div
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          {items.map((child, i) => {
            const item = layout[i]
            if (!item) return null
            return (
              <CanvasItemInner
                key={child.key}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                className={child.props.className}
              >
                {child.props.children}
              </CanvasItemInner>
            )
          })}
        </div>
      </div>
    </CanvasContext.Provider>
  )
}

interface CanvasItemProps {
  children: ReactNode
  width: number
  height: number
  className?: string
}

export const CanvasItem = ({ children }: CanvasItemProps) => {
  return <>{children}</>
}

interface CanvasItemInnerProps {
  children: ReactNode
  x: number
  y: number
  width: number
  height: number
  className?: string
  padding?: number
}

const CanvasItemInner = memo(
  ({
    children,
    x,
    y,
    width,
    height,
    className,
    padding = 200,
  }: CanvasItemInnerProps) => {
    const { getViewportBounds } = useCanvasContext()

    const bounds = getViewportBounds()
    const visible =
      x + width + padding > bounds.left &&
      x - padding < bounds.right &&
      y + height + padding > bounds.top &&
      y - padding < bounds.bottom

    if (!visible) return null

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

CanvasItemInner.displayName = 'CanvasItemInner'
