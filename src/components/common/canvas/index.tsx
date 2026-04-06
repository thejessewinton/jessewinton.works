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

export interface CanvasItemProps {
  children?: ReactNode
  width: number
  height: number
  className?: string
}

export type CanvasItemComponent = (props: CanvasItemProps) => ReactNode

const CanvasItem: CanvasItemComponent = ({ children }) => {
  return <>{children}</>
}

interface CanvasProps {
  children: (CanvasItem: CanvasItemComponent) => ReactNode
  className?: string
  columns?: number
  gap?: number
  columnWidth?: number
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

interface Layout {
  items: LayoutItem[]
  contentWidth: number
  contentHeight: number
}

const computeLayout = (
  items: { width: number; height: number }[],
  columns: number,
  gap: number,
  columnWidth: number,
): Layout => {
  const n = items.length
  if (n === 0) return { items: [], contentWidth: 0, contentHeight: 0 }

  const columnHeights = new Float64Array(columns)
  const layoutItems: LayoutItem[] = []

  for (let i = 0; i < n; i++) {
    const item = items[i]!

    let shortest = 0
    let shortestH = columnHeights[0]!
    for (let c = 1; c < columns; c++) {
      if (columnHeights[c]! < shortestH) {
        shortest = c
        shortestH = columnHeights[c]!
      }
    }

    const scaledHeight = (item.height / item.width) * columnWidth
    layoutItems.push({
      x: shortest * (columnWidth + gap),
      y: columnHeights[shortest]!,
      width: columnWidth,
      height: scaledHeight,
      sourceIndex: i,
    })
    columnHeights[shortest]! += scaledHeight + gap
  }

  let contentHeight = 0
  for (let c = 0; c < columns; c++) {
    if (columnHeights[c]! > contentHeight) contentHeight = columnHeights[c]!
  }
  contentHeight -= gap

  const contentWidth = columns * (columnWidth + gap) - gap

  return { items: layoutItems, contentWidth, contentHeight }
}

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

const useViewportSize = () => {
  const [size, setSize] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1920, height: 1080 },
  )

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return size
}

export const Canvas = ({
  children,
  className,
  columns: columnsProp = 6,
  gap = 24,
  columnWidth: columnWidthProp = 300,
  maxScale = 5,
  initialTransform,
}: CanvasProps) => {
  const viewport = useViewportSize()
  const { columns: responsiveCols, columnWidth } = useResponsiveColumns(
    columnsProp,
    columnWidthProp,
  )

  const childArrayRef = useRef<ReactElement<CanvasItemProps>[]>([])
  const rawChildren = Children.toArray(
    children(CanvasItem),
  ) as ReactElement<CanvasItemProps>[]
  const childrenChanged =
    rawChildren.length !== childArrayRef.current.length ||
    rawChildren.some((c, i) => c.key !== childArrayRef.current[i]?.key)
  if (childrenChanged) {
    childArrayRef.current = rawChildren
  }
  const items = childArrayRef.current

  const columns = responsiveCols

  const layout = useMemo(() => {
    const dims = items.map((child) => ({
      width: child.props.width ?? 0,
      height: child.props.height ?? 0,
    }))
    return computeLayout(dims, columns, gap, columnWidth)
  }, [items, columns, gap, columnWidth])

  const minScale = useMemo(() => {
    if (layout.contentWidth === 0 || layout.contentHeight === 0) return 1
    const scaleX = (viewport.width - 2 * gap) / layout.contentWidth
    const scaleY = (viewport.height - 2 * gap) / layout.contentHeight
    return Math.min(scaleX, scaleY)
  }, [viewport, gap, layout.contentWidth, layout.contentHeight])

  const renderItem = useCallback(
    (sourceIndex: number) =>
      childArrayRef.current[sourceIndex]?.props.children ?? null,
    [],
  )

  const cellClassName = useCallback(
    (sourceIndex: number) =>
      childArrayRef.current[sourceIndex]?.props.className,
    [],
  )

  return (
    <div
      className={cn(
        'relative h-dvh w-dvw cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing',
        className,
      )}
    >
      <CanvasRenderer
        layout={layout}
        renderItem={renderItem}
        cellClassName={cellClassName}
        minScale={minScale}
        maxScale={maxScale}
        padding={gap}
        initialTransform={initialTransform}
      />
    </div>
  )
}

interface CanvasRendererProps {
  layout: Layout
  renderItem: (sourceIndex: number) => ReactNode
  cellClassName: (sourceIndex: number) => string | undefined
  minScale: number
  maxScale: number
  padding: number
  initialTransform?: Partial<CanvasTransform>
}

const CanvasRenderer = ({
  layout,
  renderItem,
  cellClassName,
  minScale,
  maxScale,
  padding,
  initialTransform,
}: CanvasRendererProps) => {
  const contentSize = useMemo(
    () => ({ width: layout.contentWidth, height: layout.contentHeight }),
    [layout.contentWidth, layout.contentHeight],
  )

  const { currentRef, containerRef, innerRef, handlers } = useCanvas({
    minScale,
    maxScale,
    initialTransform,
    contentSize,
    padding,
  })

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
        {layout.items.map((item, i) => (
          <CanvasCell
            key={i}
            item={item}
            renderItem={renderItem}
            cellClassName={cellClassName}
          />
        ))}
      </div>
    </div>
  )
}

interface CanvasCellProps {
  item: LayoutItem
  renderItem: (sourceIndex: number) => ReactNode
  cellClassName: (sourceIndex: number) => string | undefined
}

const CanvasCell = memo(
  ({ item, renderItem, cellClassName }: CanvasCellProps) => (
    <div
      className={cn('absolute overflow-hidden', cellClassName(item.sourceIndex))}
      style={{
        transform: `translate(${item.x}px, ${item.y}px)`,
        width: item.width,
        height: item.height,
      }}
    >
      {renderItem(item.sourceIndex)}
    </div>
  ),
)

CanvasCell.displayName = 'CanvasCell'
