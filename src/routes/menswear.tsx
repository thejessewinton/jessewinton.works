import { createFileRoute } from '@tanstack/react-router'
import { Canvas, CanvasItem, type CanvasImage, loadImages } from '~/components/canvas'

const paths = Array.from(
  { length: 72 },
  (_, i) => `/canvas/csms-${String(i + 1).padStart(3, '0')}.webp`,
)

let cached: CanvasImage[] | null = null

export const Route = createFileRoute('/menswear')({
  component: Index,
  loader: async () => {
    if (typeof document === 'undefined') return []
    if (cached) return cached
    cached = await loadImages(paths)
    return cached
  },
})

function Index() {
  const items = Route.useLoaderData()

  return (
    <Canvas columns={6} gap={16}>
      {items.map((item) => (
        <CanvasItem key={item.src} width={item.width} height={item.height}>
          <img
            src={item.src}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </CanvasItem>
      ))}
    </Canvas>
  )
}
