import { type ReactNode, useMemo } from 'react'
import { CanvasItem } from './canvas'

interface MasonryItem {
  id: string
  width: number
  height: number
  render: () => ReactNode
}

interface CanvasMasonryProps {
  items: MasonryItem[]
  columns?: number
  gap?: number
  columnWidth?: number
}

interface LayoutItem {
  item: MasonryItem
  x: number
  y: number
  width: number
  height: number
}

const computeLayout = (
  items: MasonryItem[],
  columns: number,
  gap: number,
  columnWidth: number,
): LayoutItem[] => {
  const columnHeights = new Array(columns).fill(0)
  const layout: LayoutItem[] = []

  for (const item of items) {
    const shortest = columnHeights.indexOf(Math.min(...columnHeights))
    const x = shortest * (columnWidth + gap)
    const y = columnHeights[shortest]

    const scaledHeight = (item.height / item.width) * columnWidth

    layout.push({
      item,
      x,
      y,
      width: columnWidth,
      height: scaledHeight,
    })

    columnHeights[shortest] += scaledHeight + gap
  }

  return layout
}

export const CanvasMasonry = ({
  items,
  columns = 6,
  gap = 40,
  columnWidth = 300,
}: CanvasMasonryProps) => {
  const layout = useMemo(
    () => computeLayout(items, columns, gap, columnWidth),
    [items, columns, gap, columnWidth],
  )

  return (
    <>
      {layout.map(({ item, x, y, width, height }) => (
        <CanvasItem key={item.id} x={x} y={y} width={width} height={height}>
          {item.render()}
        </CanvasItem>
      ))}
    </>
  )
}

export type { MasonryItem, CanvasMasonryProps }
