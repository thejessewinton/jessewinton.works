import { createFileRoute } from '@tanstack/react-router'
import { Canvas, CanvasItem } from '~/components/canvas'

function generatePlaceholders(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const w = Math.floor(Math.random() * 300) + 100
    const h = Math.floor(Math.random() * 300) + 100
    return {
      id: i,
      width: w,
      height: h,
      src: `https://placehold.co/${w}x${h}`,
    }
  })
}

export const Route = createFileRoute('/menswear')({
  component: Index,
  loader: async () => {
    return generatePlaceholders(100)
  },
})

function Index() {
  const items = Route.useLoaderData()

  return (
    <Canvas>
      {items.map((item) => (
        <CanvasItem
          key={item.id}
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.height}
        >
          <img src={item.src} alt={item.id} />
        </CanvasItem>
      ))}
    </Canvas>
  )
}
