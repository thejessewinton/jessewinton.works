import { Drawer as DrawerPrimitive } from 'vaul'
import { useUploadContext } from '~/context/upload-context'

export const Drawer = () => {
  const { isUploading, setIsUploading, progress } = useUploadContext()

  return (
    <DrawerPrimitive.Root
      open={isUploading}
      onOpenChange={setIsUploading}
      direction="right"
    >
      <DrawerPrimitive.Trigger className="sr-only">
        Open Drawer
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/20" />
        <DrawerPrimitive.Content className="-translate-y-1/2 fixed top-1/2 right-2 bottom-0 h-[calc(100vh-0.5rem)] w-[33vw] rounded-2xl bg-neutral-900 p-8 outline-none">
          Tags, uploads, progress, etc.
          <div className="inset-y-0 w-2 bg-neutral-800" />
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
