import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { useUploadContext } from '~/context/upload'
import { cn } from '~/utils/cn'
import styles from './drawer.module.css'

export const Drawer = () => {
  const { isUploading, handleReset, src } = useUploadContext()

  return (
    <DrawerPrimitive.Root
      open={isUploading}
      onOpenChange={handleReset}
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
              {src ? (
                <img
                  src={src}
                  className="pointer-events-none h-full max-h-120 w-full rounded-[3px] object-contain"
                  alt="just uploaded"
                  draggable={false}
                />
              ) : null}
            </DrawerPrimitive.Content>
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
