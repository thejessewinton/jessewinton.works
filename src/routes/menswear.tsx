import { createFileRoute } from '@tanstack/react-router'
import {
  Canvas,
  type CanvasImage,
  CanvasItem,
  loadImages,
} from '~/components/canvas'

const paths = Array.from(
  { length: 72 },
  (_, i) => `/canvas/csms-${String(i + 1).padStart(3, '0')}.webp`,
)

let cached: CanvasImage[] | null = null

export const Route = createFileRoute('/menswear')({
  component: Index,
  loader: async () => {
    cached = await loadImages(paths)
    return cached
  },
  ssr: false,
})

function Index() {
  const items = Route.useLoaderData()

  return (
    <Canvas columns={6} gap={40}>
      {items.map((item) => (
        <CanvasItem key={item.src} width={item.width} height={item.height}>
          <img
            src={item.src}
            className="h-full w-full rounded-[3px] object-cover"
            draggable={false}
            alt={`CSMS ${item.src.split('/').pop()?.split('.').shift()}`}
          />
        </CanvasItem>
      ))}
    </Canvas>
  )
}
