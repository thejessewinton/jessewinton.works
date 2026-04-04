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

interface LayoutResult {
  x: number
  y: number
  width: number
  height: number
}

interface TileLayout {
  items: LayoutResult[]
  tileWidth: number
  tileHeight: number
}

const computeLayout = (
  items: { width: number; height: number }[],
  columns: number,
  gap: number,
  columnWidth: number,
): TileLayout => {
  if (items.length === 0)
    return { items: [], tileWidth: 0, tileHeight: 0 }

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

  const tileWidth = columns * (columnWidth + gap) - gap
  const tileHeight = Math.max(...columnHeights)

  return { items: results, tileWidth, tileHeight }
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

  const tile = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  const bounds = getViewportBounds()

  const visibleTiles = useMemo(() => {
    if (tile.tileWidth === 0 || tile.tileHeight === 0) return []

    const tw = tile.tileWidth + gap
    const th = tile.tileHeight + gap

    const startCol = Math.floor(bounds.left / tw) - 1
    const endCol = Math.ceil(bounds.right / tw) + 1
    const startRow = Math.floor(bounds.top / th) - 1
    const endRow = Math.ceil(bounds.bottom / th) + 1

    const tiles: { col: number; row: number; ox: number; oy: number }[] = []
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        tiles.push({ col, row, ox: col * tw, oy: row * th })
      }
    }
    return tiles
  }, [tile, gap, bounds])

  return (
    <CanvasContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={cn(
          'relative h-dvh w-dvw cursor-grab overflow-hidden select-none active:cursor-grabbing',
          className,
        )}
        {...handlers}
      >
        <div
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          {visibleTiles.map(({ col, row, ox, oy }) =>
            tile.items.map((layoutItem, i) => {
              const child = items[i]
              if (!child) return null
              return (
                <div
                  key={`${col},${row},${i}`}
                  className="absolute overflow-hidden"
                  style={{
                    transform: `translate(${ox + layoutItem.x}px, ${oy + layoutItem.y}px)`,
                    width: layoutItem.width,
                    height: layoutItem.height,
                  }}
                >
                  {child.props.children}
                </div>
              )
            }),
          )}
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
