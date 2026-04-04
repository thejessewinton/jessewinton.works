import {
  Children,
  type ReactElement,
  type ReactNode,
  createContext,
  memo,
  useContext,
  useMemo,
  useRef,
} from 'react'
import { cn } from '~/utils/cn'
import { type CanvasTransform, useCanvas } from './use-canvas'

interface CanvasContextValue {
  transform: CanvasTransform
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

  const tileWidth = columns * (columnWidth + gap)
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
  const { transform, containerRef, handlers } = useCanvas({
    minScale,
    maxScale,
    initialTransform,
  })

  const ctx = useMemo(() => ({ transform }), [transform])

  const items = Children.toArray(children) as ReactElement<CanvasItemProps>[]

  const tile = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  const prevRangeRef = useRef({ startCol: 0, endCol: 0, startRow: 0, endRow: 0 })

  const tileRange = useMemo(() => {
    if (tile.tileWidth === 0 || tile.tileHeight === 0)
      return { startCol: 0, endCol: 0, startRow: 0, endRow: 0 }

    const rect = containerRef.current?.getBoundingClientRect()
    const vw = rect?.width ?? 1920
    const vh = rect?.height ?? 1080

    const viewLeft = -transform.x / transform.scale
    const viewTop = -transform.y / transform.scale
    const viewRight = (vw - transform.x) / transform.scale
    const viewBottom = (vh - transform.y) / transform.scale

    const tw = tile.tileWidth
    const th = tile.tileHeight

    const startCol = Math.floor(viewLeft / tw) - 1
    const endCol = Math.ceil(viewRight / tw)
    const startRow = Math.floor(viewTop / th) - 1
    const endRow = Math.ceil(viewBottom / th)

    const prev = prevRangeRef.current
    if (
      prev.startCol === startCol &&
      prev.endCol === endCol &&
      prev.startRow === startRow &&
      prev.endRow === endRow
    ) {
      return prev
    }

    const next = { startCol, endCol, startRow, endRow }
    prevRangeRef.current = next
    return next
  }, [tile, transform, containerRef])

  const tiles = useMemo(() => {
    const { startCol, endCol, startRow, endRow } = tileRange
    const result: { key: string; ox: number; oy: number }[] = []
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        result.push({
          key: `${col},${row}`,
          ox: col * tile.tileWidth,
          oy: row * tile.tileHeight,
        })
      }
    }
    return result
  }, [tileRange, tile.tileWidth, tile.tileHeight])

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
          {tiles.map(({ key, ox, oy }) => (
            <TileGroup key={key} ox={ox} oy={oy} layout={tile.items} items={items} />
          ))}
        </div>
      </div>
    </CanvasContext.Provider>
  )
}

interface TileGroupProps {
  ox: number
  oy: number
  layout: LayoutResult[]
  items: ReactElement<CanvasItemProps>[]
}

const TileGroup = memo(({ ox, oy, layout, items }: TileGroupProps) => {
  return (
    <>
      {layout.map((layoutItem, i) => {
        const child = items[i]
        if (!child) return null
        return (
          <div
            key={i}
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
      })}
    </>
  )
})

TileGroup.displayName = 'TileGroup'

interface CanvasItemProps {
  children: ReactNode
  width: number
  height: number
  className?: string
}

export const CanvasItem = ({ children }: CanvasItemProps) => {
  return <>{children}</>
}
