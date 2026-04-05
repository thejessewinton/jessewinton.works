import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '~/components/common/canvas'
import { Dropzone } from '~/components/common/dropzone'
import { Teleport } from '~/components/common/teleport'
import { Drawer } from '~/components/ds/drawer'
import { Toolbar } from '~/components/ds/toolbar'
import { UploadProvider } from '~/context/upload'
import { getImages } from '~/server/api/get-images'
import { getTags } from '~/server/api/get-tags'

type StyleSearch = {
  tags?: string[]
}

export const Route = createFileRoute('/style')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): StyleSearch => ({
    tags: Array.isArray(search.tags) ? search.tags : undefined,
  }),
  loaderDeps: ({ search }) => ({ tags: search.tags }),
  loader: async ({ deps }) => {
    const [images, tags] = await Promise.all([
      getImages({ data: { tags: deps.tags } }),
      getTags(),
    ])
    return { images, tags }
  },
  ssr: false,
})

function Index() {
  const { images, tags } = Route.useLoaderData()
  const { tags: selectedTags } = Route.useSearch()

  return (
    <UploadProvider>
      <Dropzone />
      <Drawer />
      <Teleport>
        <Toolbar tags={tags} selectedTags={selectedTags} />
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
