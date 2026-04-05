import {
  Children,
  type ReactElement,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '~/utils/cn'
import { type CanvasTransform, useCanvas } from './use-canvas'

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
  const n = items.length
  if (n === 0) return { items: [], tileWidth: 0, tileHeight: 0 }

  const poolSize = n * 3
  const pool = new Array<number>(poolSize)
  for (let pass = 0; pass < 3; pass++) {
    const offset = pass * n
    for (let i = 0; i < n; i++) pool[offset + i] = i
    let s = 42 + pass * 97
    for (let i = n - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff
      const j = (s >>> 0) % (i + 1)
      const ai = offset + i
      const aj = offset + j
      const tmp = pool[ai]!
      pool[ai] = pool[aj]!
      pool[aj] = tmp
    }
  }

  const columnHeights = new Float64Array(columns)
  const columnItems: LayoutItem[][] = Array.from({ length: columns }, () => [])

  for (let p = 0; p < poolSize; p++) {
    const idx = pool[p]!
    const item = items[idx]!

    // Linear scan for shortest column
    let shortest = 0
    let shortestH = columnHeights[0]!
    for (let c = 1; c < columns; c++) {
      if (columnHeights[c]! < shortestH) {
        shortest = c
        shortestH = columnHeights[c]!
      }
    }

    const scaledHeight = (item.height / item.width) * columnWidth
    columnItems[shortest]!.push({
      x: shortest * (columnWidth + gap),
      y: columnHeights[shortest]!,
      width: columnWidth,
      height: scaledHeight,
      sourceIndex: idx,
    })
    columnHeights[shortest]! += scaledHeight + gap
  }

  // Tile height from tallest column
  let tileHeight = columnHeights[0]!
  for (let c = 1; c < columns; c++) {
    if (columnHeights[c]! > tileHeight) tileHeight = columnHeights[c]!
  }
  tileHeight -= gap

  // Fill shorter columns until they reach tileHeight
  for (let c = 0; c < columns; c++) {
    let fillIdx = 0
    while (columnHeights[c]! < tileHeight) {
      const item = items[fillIdx % n]!
      const scaledHeight = (item.height / item.width) * columnWidth
      columnItems[c]!.push({
        x: c * (columnWidth + gap),
        y: columnHeights[c]!,
        width: columnWidth,
        height: scaledHeight,
        sourceIndex: fillIdx % n,
      })
      columnHeights[c]! += scaledHeight + gap
      fillIdx++
    }
  }

  const tileWidth = columns * (columnWidth + gap)

  // Flatten + clamp
  const results: LayoutItem[] = []
  for (let c = 0; c < columns; c++) {
    const col = columnItems[c]!
    for (let i = 0; i < col.length; i++) {
      const item = col[i]!
      if (item.y >= tileHeight) break
      const maxH = tileHeight - item.y
      if (item.height <= maxH) {
        results.push(item)
      } else {
        results.push({
          x: item.x,
          y: item.y,
          width: item.width,
          height: maxH,
          sourceIndex: item.sourceIndex,
        })
      }
    }
  }

  return { items: results, tileWidth, tileHeight }
}

const MAX_ITEMS = 1200

const getResponsiveValues = (columns: number, columnWidth: number) => {
  if (typeof window === 'undefined') return { columns, columnWidth }
  const w = window.innerWidth
  if (w < 640) return { columns: 2, columnWidth: Math.floor((w - 48) / 2) }
  if (w < 1024) return { columns: 3, columnWidth: Math.floor((w - 80) / 3) }
  return { columns, columnWidth }
}

const useResponsiveColumns = (columns: number, columnWidth: number) => {
  const [screen, setScreen] = useState(() =>
    getResponsiveValues(columns, columnWidth),
  )

  useEffect(() => {
    const update = () => {
      setScreen(getResponsiveValues(columns, columnWidth))
    }
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
  const { columns, columnWidth } = useResponsiveColumns(
    columnsProp,
    columnWidthProp,
  )

  // Stabilize children array — only update ref when keys change
  const childArrayRef = useRef<ReactElement<CanvasItemProps>[]>([])
  const rawChildren = Children.toArray(
    children,
  ) as ReactElement<CanvasItemProps>[]
  const childrenChanged =
    rawChildren.length !== childArrayRef.current.length ||
    rawChildren.some((c, i) => c.key !== childArrayRef.current[i]?.key)
  if (childrenChanged) {
    childArrayRef.current = rawChildren
  }
  const items = childArrayRef.current

  const tile = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  const renderItem = useCallback(
    (sourceIndex: number) =>
      childArrayRef.current[sourceIndex]?.props.children ?? null,
    [],
  )

  return (
    <div
      className={cn(
        'relative h-dvh w-dvw cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing',
        className,
      )}
    >
      <TileRenderer
        tile={tile}
        renderItem={renderItem}
        minScale={minScale}
        maxScale={maxScale}
        initialTransform={initialTransform}
      />
    </div>
  )
}

interface TileRendererProps {
  tile: TileLayout
  renderItem: (sourceIndex: number) => ReactNode
  minScale: number
  maxScale: number
  initialTransform?: Partial<CanvasTransform>
}

const TileRenderer = ({
  tile,
  renderItem,
  minScale,
  maxScale,
  initialTransform,
}: TileRendererProps) => {
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

  const tiles = useMemo(() => {
    const { startCol, endCol, startRow, endRow } = tileRange
    const itemsPerTile = tile.items.length
    if (itemsPerTile === 0) return []
    const maxTiles = Math.max(1, Math.floor(MAX_ITEMS / itemsPerTile))
    const totalTiles = (endCol - startCol + 1) * (endRow - startRow + 1)

    // Fast path: no sorting needed when all tiles fit
    if (totalTiles <= maxTiles) {
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
    }

    // Slow path: sort by distance from center, keep closest
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
    all.length = maxTiles
    return all
  }, [tileRange, tile.tileWidth, tile.tileHeight, tile.items.length])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-none"
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
            renderItem={renderItem}
          />
        ))}
      </div>
    </div>
  )
}

interface TileGroupProps {
  ox: number
  oy: number
  tw: number
  th: number
  layout: LayoutItem[]
  renderItem: (sourceIndex: number) => ReactNode
}

const TileGroup = memo(
  ({ ox, oy, tw, th, layout, renderItem }: TileGroupProps) => {
    return (
      <div
        className="absolute overflow-hidden"
        style={{
          transform: `translate(${ox}px, ${oy}px)`,
          width: tw,
          height: th,
        }}
      >
        {layout.map((layoutItem, i) => (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              transform: `translate(${layoutItem.x}px, ${layoutItem.y}px)`,
              width: layoutItem.width,
              height: layoutItem.height,
            }}
          >
            {renderItem(layoutItem.sourceIndex)}
          </div>
        ))}
      </div>
    )
  },
)

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
