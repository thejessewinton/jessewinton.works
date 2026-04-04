import {
  Children,
  type ReactElement,
  type ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
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

interface LayoutItem {
  x: number
  y: number
  width: number
  height: number
  sourceIndex: number
}

interface TileLayout {
  items: LayoutItem[]
  tileWidth: number
  tileHeight: number
}

const computeLayout = (
  items: { width: number; height: number }[],
  columns: number,
  gap: number,
  columnWidth: number,
): TileLayout => {
  if (items.length === 0) return { items: [], tileWidth: 0, tileHeight: 0 }

  // First pass: place all items to find the natural max height
  const columnHeights = new Array(columns).fill(0)
  const results: LayoutItem[] = []

  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]
    const shortest = columnHeights.indexOf(Math.min(...columnHeights))
    const x = shortest * (columnWidth + gap)
    const y = columnHeights[shortest]
    const scaledHeight =
      ((item?.height ?? 0) / (item?.width ?? 0)) * columnWidth

    results.push({
      x,
      y,
      width: columnWidth,
      height: scaledHeight,
      sourceIndex: idx,
    })
    columnHeights[shortest] += scaledHeight + gap
  }

  // Use the tallest column as the fixed tile height
  const tileHeight = Math.max(...columnHeights)
  const tileWidth = columns * (columnWidth + gap)

  // Second pass: keep filling every column up to tileHeight by cycling items
  let fillIdx = 0
  for (let col = 0; col < columns; col++) {
    while (columnHeights[col] + gap < tileHeight) {
      const item = items[fillIdx % items.length]
      const x = col * (columnWidth + gap)
      const y = columnHeights[col]
      const scaledHeight =
        ((item?.height ?? 0) / (item?.width ?? 0)) * columnWidth

      // Clip the last item in each column so it ends exactly at tileHeight
      const remaining = tileHeight - y
      const clippedHeight = Math.min(scaledHeight, remaining)

      results.push({
        x,
        y,
        width: columnWidth,
        height: clippedHeight,
        sourceIndex: fillIdx % items.length,
      })
      columnHeights[col] += scaledHeight + gap
      fillIdx++
    }
  }

  return { items: results, tileWidth, tileHeight }
}

const MAX_ITEMS = 1200

export const Canvas = ({
  children,
  className,
  columns = 6,
  gap = 24,
  columnWidth = 300,
  minScale = 0.75,
  maxScale = 5,
  initialTransform,
}: CanvasProps) => {
  const items = Children.toArray(children) as ReactElement<CanvasItemProps>[]

  const tile = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  const tileRef = useRef(tile)
  tileRef.current = tile

  const [tileRange, setTileRange] = useState({
    startCol: 0,
    endCol: 1,
    startRow: 0,
    endRow: 1,
  })
  const prevRangeRef = useRef(tileRange)

  const onTransformChange = useCallback(
    (current: CanvasTransform, container: HTMLDivElement | null) => {
      const t = tileRef.current
      const rect = container?.getBoundingClientRect()
      const vw = rect?.width ?? 1920
      const vh = rect?.height ?? 1080

      const tw = t.tileWidth
      const th = t.tileHeight
      if (tw === 0 || th === 0) return

      const viewLeft = -current.x / current.scale
      const viewTop = -current.y / current.scale
      const viewRight = (vw - current.x) / current.scale
      const viewBottom = (vh - current.y) / current.scale

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
      )
        return

      const next = { startCol, endCol, startRow, endRow }
      prevRangeRef.current = next
      setTileRange(next)
    },
    [],
  )

  const { currentRef, containerRef, innerRef, handlers } = useCanvas({
    minScale,
    maxScale,
    initialTransform,
    onTransformChange,
  })

  const ctx = useMemo(() => ({ transform: currentRef.current }), [currentRef])

  const tiles = useMemo(() => {
    const { startCol, endCol, startRow, endRow } = tileRange
    const itemsPerTile = tile.items.length
    if (itemsPerTile === 0) return []
    const maxTiles = Math.max(1, Math.floor(MAX_ITEMS / itemsPerTile))

    const centerCol = (startCol + endCol) / 2
    const centerRow = (startRow + endRow) / 2

    const all: { key: string; ox: number; oy: number; dist: number }[] = []
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        all.push({
          key: `${col},${row}`,
          ox: col * tile.tileWidth,
          oy: row * tile.tileHeight,
          dist: (col - centerCol) ** 2 + (row - centerRow) ** 2,
        })
      }
    }

    all.sort((a, b) => a.dist - b.dist)
    if (all.length > maxTiles) all.length = maxTiles

    return all
  }, [tileRange, tile.tileWidth, tile.tileHeight, tile.items.length])

  return (
    <CanvasContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={cn(
          'relative h-dvh w-dvw cursor-grab select-none overflow-hidden active:cursor-grabbing',
          className,
        )}
        {...handlers}
      >
        <div
          ref={innerRef}
          style={{
            transform: `translate(${currentRef.current.x}px, ${currentRef.current.y}px) scale(${currentRef.current.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          {tiles.map(({ key, ox, oy }) => (
            <TileGroup
              key={key}
              ox={ox}
              oy={oy}
              tw={tile.tileWidth}
              th={tile.tileHeight}
              layout={tile.items}
              items={items}
            />
          ))}
        </div>
      </div>
    </CanvasContext.Provider>
  )
}

interface TileGroupProps {
  ox: number
  oy: number
  tw: number
  th: number
  layout: LayoutItem[]
  items: ReactElement<CanvasItemProps>[]
}

const TileGroup = memo(({ ox, oy, tw, th, layout, items }: TileGroupProps) => {
  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${ox}px, ${oy}px)`,
        width: tw,
        height: th,
        contain: 'strict',
      }}
    >
      {layout.map((layoutItem, i) => {
        const child = items[layoutItem.sourceIndex]
        if (!child) return null
        return (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              transform: `translate(${layoutItem.x}px, ${layoutItem.y}px)`,
              width: layoutItem.width,
              height: layoutItem.height,
              contentVisibility: 'auto',
              containIntrinsicSize: `${layoutItem.width}px ${layoutItem.height}px`,
            }}
          >
            {child.props.children}
          </div>
        )
      })}
    </div>
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
