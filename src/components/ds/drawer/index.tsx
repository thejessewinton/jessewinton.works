import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { useRouter } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { useUploadContext } from '~/context/upload'
import { getTags } from '~/server/api/get-tags'
import { updateImageTags } from '~/server/api/update-image-tags'
import { cn } from '~/utils/cn'
import { DrawerTags } from './drawer-tags'
import styles from './drawer.module.css'

export const Drawer = () => {
  const router = useRouter()
  const { upload, reset } = useUploadContext()
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const isOpen = upload.status !== 'idle'
  const src = upload.status === 'complete' ? upload.src : undefined
  const imageId = upload.status === 'complete' ? upload.imageId : undefined

  useEffect(() => {
    if (isOpen) {
      getTags().then(setAvailableTags)
      setSelectedTags([])
    }
  }, [isOpen])

  const handleSave = useCallback(async () => {
    if (!imageId || selectedTags.length === 0) return
    setSaving(true)
    await updateImageTags({ data: { imageId, tags: selectedTags } })
    await router.invalidate()
    setSaving(false)
    reset()
  }, [imageId, selectedTags, router, reset])

  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={reset}
      swipeDirection="right"
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Backdrop
          className={cn(
            styles.backdrop,
            'fixed inset-0 min-h-dvh backdrop-blur-xs',
          )}
        />
        <DrawerPrimitive.Viewport
          className={cn(
            styles.viewport,
            'fixed inset-0 flex items-stretch justify-end',
          )}
        >
          <DrawerPrimitive.Popup
            className={cn(
              styles.popup,
              'relative box-border h-full touch-auto overflow-y-auto overscroll-contain rounded-2xl bg-neutral-900 p-8 text-white outline-none',
            )}
          >
            <DrawerPrimitive.Content>
              <div className="flex h-full flex-col gap-6">
                {src ? (
                  <img
                    src={src}
                    className="pointer-events-none max-h-120 w-full rounded-[3px] object-contain"
                    alt="just uploaded"
                    draggable={false}
                  />
                ) : null}
                {imageId ? (
                  <div className="flex items-center gap-3">
                    <DrawerTags
                      tags={availableTags}
                      selectedTags={selectedTags}
                      onTagsChange={setSelectedTags}
                    />
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving || selectedTags.length === 0}
                      className="rounded-full bg-white px-4 py-1.5 font-medium text-neutral-900 text-sm transition-colors hover:bg-neutral-200 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                ) : null}
              </div>
            </DrawerPrimitive.Content>
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
