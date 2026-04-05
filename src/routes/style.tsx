import { createFileRoute } from '@tanstack/react-router'
import { Canvas, CanvasItem } from '~/components/canvas'
import { getImages } from '~/server/api/get-images'

export const Route = createFileRoute('/style')({
  component: Index,
  loader: () => getImages(),
  ssr: false,
})

function Index() {
  const images = Route.useLoaderData()

  return (
    <Canvas columns={6} gap={40}>
      {images.map((image) => {
        return (
          <CanvasItem key={image.id} width={image.width} height={image.height}>
            <img
              src={image.url}
              className="h-full w-full rounded-[3px] object-cover"
              draggable={false}
              alt={`CSMS ${image.url.split('/').pop()?.split('.').shift()}`}
            />
          </CanvasItem>
        )
      })}
    </Canvas>
  )
}
