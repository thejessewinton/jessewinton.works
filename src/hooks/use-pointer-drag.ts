import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
} from 'react'

type PointerDragHandlers = {
  onStart?: (event: PointerEvent) => boolean | undefined
  onMove?: (event: PointerEvent) => void
  onEnd?: (event: PointerEvent) => void
}

export const usePointerDrag = (handlers: PointerDragHandlers) => {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  return useCallback((event: ReactPointerEvent) => {
    if (event.button !== 0) return
    if (handlersRef.current.onStart?.(event.nativeEvent) === false) return

    const controller = new AbortController()
    const { signal } = controller

    window.addEventListener(
      'pointermove',
      (event) => handlersRef.current.onMove?.(event),
      { signal },
    )

    const end = (event: PointerEvent) => {
      controller.abort()
      handlersRef.current.onEnd?.(event)
    }

    window.addEventListener('pointerup', end, { signal })
    window.addEventListener('pointercancel', end, { signal })
  }, [])
}
