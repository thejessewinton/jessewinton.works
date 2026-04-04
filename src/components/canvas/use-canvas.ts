import { useAnimationFrame } from 'motion/react'
import { useCallback, useRef, useState } from 'react'

export interface CanvasTransform {
  x: number
  y: number
  scale: number
}

export interface CanvasBounds {
  left: number
  top: number
  right: number
  bottom: number
}

interface UseCanvasOptions {
  minScale?: number
  maxScale?: number
  initialTransform?: Partial<CanvasTransform>
}

export const useCanvas = ({
  minScale = 0.1,
  maxScale = 5,
  initialTransform,
}: UseCanvasOptions = {}) => {
  const [transform, setTransform] = useState<CanvasTransform>({
    x: initialTransform?.x ?? 0,
    y: initialTransform?.y ?? 0,
    scale: initialTransform?.scale ?? 1,
  })

  const targetRef = useRef<CanvasTransform>({ ...transform })
  const containerRef = useRef<HTMLDivElement>(null)
  const isPanning = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  useAnimationFrame(() => {
    const target = targetRef.current
    const lerp = 0.15

    setTransform((prev) => {
      const dx = target.x - prev.x
      const dy = target.y - prev.y
      const ds = target.scale - prev.scale

      if (
        Math.abs(dx) < 0.01 &&
        Math.abs(dy) < 0.01 &&
        Math.abs(ds) < 0.0001
      )
        return prev

      return {
        x: prev.x + dx * lerp,
        y: prev.y + dy * lerp,
        scale: prev.scale + ds * lerp,
      }
    })
  })

  const clampScale = useCallback(
    (s: number) => Math.min(maxScale, Math.max(minScale, s)),
    [minScale, maxScale],
  )

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const target = targetRef.current
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      if (e.ctrlKey || e.metaKey) {
        const pointerX = e.clientX - rect.left
        const pointerY = e.clientY - rect.top

        const delta = -e.deltaY * 0.01
        const newScale = clampScale(target.scale * (1 + delta))
        const ratio = newScale / target.scale

        targetRef.current = {
          x: pointerX - (pointerX - target.x) * ratio,
          y: pointerY - (pointerY - target.y) * ratio,
          scale: newScale,
        }
      } else {
        targetRef.current = {
          ...target,
          x: target.x - e.deltaX,
          y: target.y - e.deltaY,
        }
      }
    },
    [clampScale],
  )

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button === 0) {
      e.preventDefault()
      isPanning.current = true
      lastPointer.current = { x: e.clientX, y: e.clientY }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return

    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    const target = targetRef.current
    targetRef.current = {
      ...target,
      x: target.x + dx,
      y: target.y + dy,
    }
  }, [])

  const onPointerUp = useCallback(() => {
    isPanning.current = false
  }, [])

  const getViewportBounds = useCallback((): CanvasBounds => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      return {
        left: -Infinity,
        top: -Infinity,
        right: Infinity,
        bottom: Infinity,
      }
    }

    return {
      left: -transform.x / transform.scale,
      top: -transform.y / transform.scale,
      right: (rect.width - transform.x) / transform.scale,
      bottom: (rect.height - transform.y) / transform.scale,
    }
  }, [transform])

  const handlers = {
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }

  return {
    transform,
    containerRef,
    handlers,
    getViewportBounds,
    isPanning,
  }
}
