import {
  Children,
  type ReactElement,
  type ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
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

// Seeded shuffle so layout is deterministic but randomized
const shuffle = <T,>(arr: T[], seed: number): T[] => {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = ((s >>> 0) % (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const computeLayout = (
  items: { width: number; height: number }[],
  columns: number,
  gap: number,
  columnWidth: number,
): TileLayout => {
  if (items.length === 0) return { items: [], tileWidth: 0, tileHeight: 0 }

  // Build a large pool of shuffled items (3x) so we have enough to fill
  // all columns to a uniform height without visible repetition
  const pool: number[] = []
  for (let pass = 0; pass < 3; pass++) {
    pool.push(
      ...shuffle(
        Array.from({ length: items.length }, (_, i) => i),
        42 + pass * 97,
      ),
    )
  }

  // Place items into columns
  const columnHeights = new Array(columns).fill(0)
  const columnItems: LayoutItem[][] = Array.from({ length: columns }, () => [])

  for (const idx of pool) {
    const item = items[idx]
    if (!item) continue
    const shortest = columnHeights.indexOf(Math.min(...columnHeights))
    const x = shortest * (columnWidth + gap)
    const y = columnHeights[shortest]
    const scaledHeight = (item.height / item.width) * columnWidth

    columnItems[shortest].push({
      x,
      y,
      width: columnWidth,
      height: scaledHeight,
      sourceIndex: idx,
    })
    columnHeights[shortest] += scaledHeight + gap
  }

  // Use the SHORTEST column as tile height — guarantees every column
  // reaches it, and taller columns get clipped by overflow: hidden
  const tileHeight = Math.min(...columnHeights) - gap
  const tileWidth = columns * (columnWidth + gap)

  // Flatten, filter, and clamp: no item may extend past tileHeight
  const results: LayoutItem[] = []
  for (const colItems of columnItems) {
    for (const item of colItems) {
      if (item.y >= tileHeight) break
      const maxH = tileHeight - item.y
      results.push({
        ...item,
        height: Math.min(item.height, maxH),
      })
    }
  }

  return { items: results, tileWidth, tileHeight }
}

const MAX_ITEMS = 1200

const useResponsiveColumns = (
  columns: number,
  columnWidth: number,
): { columns: number; columnWidth: number } => {
  const [screen, setScreen] = useState<{ columns: number; columnWidth: number }>({
    columns,
    columnWidth,
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) {
        setScreen({ columns: 2, columnWidth: Math.floor((w - 48) / 2) })
      } else if (w < 1024) {
        setScreen({ columns: 3, columnWidth: Math.floor((w - 80) / 3) })
      } else {
        setScreen({ columns, columnWidth })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [columns, columnWidth])

  return screen
}

export const Canvas = ({
  children,
  className,
  columns: columnsProp = 6,
  gap = 24,
  columnWidth: columnWidthProp = 300,
  minScale = 0.75,
  maxScale = 5,
  initialTransform,
}: CanvasProps) => {
  const { columns, columnWidth } = useResponsiveColumns(columnsProp, columnWidthProp)
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
          'relative h-dvh w-dvw cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing',
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
      className="absolute overflow-hidden"
      style={{
        transform: `translate(${ox}px, ${oy}px)`,
        width: tw,
        height: th,
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
