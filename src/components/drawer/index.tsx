import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { useUploadContext } from '~/context/upload-context'
import { cn } from '~/utils/cn'
import styles from './drawer.module.css'

export const Drawer = () => {
  const { isUploading, setIsUploading } = useUploadContext()

  return (
    <DrawerPrimitive.Root
      open={isUploading}
      onOpenChange={setIsUploading}
      swipeDirection="right"
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Backdrop className={styles.backdrop} />
        <DrawerPrimitive.Viewport className={styles.viewport}>
          <DrawerPrimitive.Popup
            className={cn(
              styles.popup,
              'rounded-l-2xl bg-neutral-900 text-white',
            )}
          >
            <DrawerPrimitive.Content />
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
