import { createFileRoute } from '@tanstack/react-router'
import { Canvas, CanvasItem, loadImages } from '~/components/canvas'

const images = Array.from(
  { length: 72 },
  (_, i) => `/canvas/csms-${String(i + 1).padStart(3, '0')}.webp`,
)

export const Route = createFileRoute('/menswear')({
  component: Index,
  loader: () => loadImages(images),
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
