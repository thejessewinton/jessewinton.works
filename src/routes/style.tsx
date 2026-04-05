import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '~/components/common/canvas'
import { Drawer } from '~/components/common/drawer'
import { Dropzone } from '~/components/common/dropzone'
import { Teleport } from '~/components/common/teleport'
import { Toolbar } from '~/components/ds/toolbar'
import { UploadProvider } from '~/context/upload-context'
import { getImages } from '~/server/api/get-images'

export const Route = createFileRoute('/style')({
  component: Index,
  loader: () => getImages(),
  ssr: false,
})

function Index() {
  const images = Route.useLoaderData()

  return (
    <UploadProvider>
      <Dropzone />
      <Drawer />
      <Teleport>
        <Toolbar />
      </Teleport>
      <Canvas columns={6} gap={40}>
        {(CanvasItem) => {
          return images.map((image) => {
            return (
              <CanvasItem
                key={image.id}
                width={image.width}
                height={image.height}
                className="animate-fade-in"
              >
                <img
                  src={image.url}
                  className="h-full w-full rounded-[3px] object-cover"
                  draggable={false}
                  alt={`CSMS ${image.url.split('/').pop()?.split('.').shift()}`}
                />
              </CanvasItem>
            )
          })
        }}
      </Canvas>
    </UploadProvider>
  )
}
