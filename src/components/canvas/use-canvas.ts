import { useAnimationFrame } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'

export interface CanvasTransform {
  x: number
  y: number
  scale: number
}

interface UseCanvasOptions {
  minScale?: number
  maxScale?: number
  friction?: number
  initialTransform?: Partial<CanvasTransform>
  onTransformChange?: (transform: CanvasTransform, container: HTMLDivElement | null) => void
}

export const useCanvas = ({
  minScale = 0.1,
  maxScale = 5,
  friction = 0.95,
  initialTransform,
  onTransformChange,
}: UseCanvasOptions = {}) => {
  const initial: CanvasTransform = {
    x: initialTransform?.x ?? 0,
    y: initialTransform?.y ?? 0,
    scale: initialTransform?.scale ?? 1,
  }

  const targetRef = useRef<CanvasTransform>({ ...initial })
  const currentRef = useRef<CanvasTransform>({ ...initial })
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isPanning = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const onChangeRef = useRef(onTransformChange)

  useEffect(() => {
    onChangeRef.current = onTransformChange
  }, [onTransformChange])

  useAnimationFrame(() => {
    const target = targetRef.current
    const current = currentRef.current

    if (!isPanning.current) {
      const vx = velocity.current.x
      const vy = velocity.current.y

      if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
        velocity.current.x *= friction
        velocity.current.y *= friction
        target.x += velocity.current.x
        target.y += velocity.current.y
      } else {
        velocity.current.x = 0
        velocity.current.y = 0
      }
    }

    const lerp = 0.15
    const dx = target.x - current.x
    const dy = target.y - current.y
    const ds = target.scale - current.scale

    if (
      Math.abs(dx) < 0.01 &&
      Math.abs(dy) < 0.01 &&
      Math.abs(ds) < 0.0001
    )
      return

    current.x += dx * lerp
    current.y += dy * lerp
    current.scale += ds * lerp

    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${current.x}px, ${current.y}px) scale(${current.scale})`
    }

    onChangeRef.current?.(current, containerRef.current)
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
        target.x -= e.deltaX
        target.y -= e.deltaY
      }
    },
    [clampScale],
  )

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button === 0) {
      e.preventDefault()
      isPanning.current = true
      velocity.current = { x: 0, y: 0 }
      lastPointer.current = { x: e.clientX, y: e.clientY }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return

    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    velocity.current = { x: dx, y: dy }

    const target = targetRef.current
    target.x += dx
    target.y += dy
  }, [])

  const onPointerUp = useCallback(() => {
    isPanning.current = false
  }, [])

  const handlers = {
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }

  return {
    currentRef,
    containerRef,
    innerRef,
    handlers,
    isPanning,
  }
}
