import { useAnimationFrame } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import type { Touch } from 'react'

const getTouchDistance = (t1: Touch, t2: Touch) =>
  Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)

const getTouchCenter = (t1: Touch, t2: Touch) => ({
  x: (t1.clientX + t2.clientX) / 2,
  y: (t1.clientY + t2.clientY) / 2,
})

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
  contentSize?: { width: number; height: number }
  padding?: number
}

export const useCanvas = ({
  minScale = 0.1,
  maxScale = 5,
  friction = 0.95,
  initialTransform,
  contentSize,
  padding = 0,
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

  const pinchRef = useRef<{
    active: boolean
    startDist: number
    startScale: number
    centerX: number
    centerY: number
  }>({ active: false, startDist: 0, startScale: 1, centerX: 0, centerY: 0 })

  const contentSizeRef = useRef(contentSize)
  contentSizeRef.current = contentSize
  const paddingRef = useRef(padding)
  paddingRef.current = padding
  const minScaleRef = useRef(minScale)
  minScaleRef.current = minScale

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const preventDefaults = (e: TouchEvent) => {
      if (e.touches.length >= 1) e.preventDefault()
    }

    el.addEventListener('touchmove', preventDefaults, { passive: false })
    el.addEventListener('touchstart', preventDefaults, { passive: false })

    return () => {
      el.removeEventListener('touchmove', preventDefaults)
      el.removeEventListener('touchstart', preventDefaults)
    }
  }, [])

  const clampPosition = useCallback(
    (t: CanvasTransform): CanvasTransform => {
      const cs = contentSizeRef.current
      const p = paddingRef.current
      const rect = containerRef.current?.getBoundingClientRect()
      if (!cs || !rect || cs.width === 0 || cs.height === 0) return t

      const vw = rect.width
      const vh = rect.height
      const sw = cs.width * t.scale
      const sh = cs.height * t.scale

      let x: number
      let y: number

      if (sw <= vw - 2 * p) {
        x = (vw - sw) / 2
      } else {
        x = Math.min(p, Math.max(vw - p - sw, t.x))
      }

      if (sh <= vh - 2 * p) {
        y = (vh - sh) / 2
      } else {
        y = Math.min(p, Math.max(vh - p - sh, t.y))
      }

      return { x, y, scale: t.scale }
    },
    [],
  )

  useAnimationFrame(() => {
    const target = targetRef.current
    const current = currentRef.current

    if (!isPanning.current && !pinchRef.current.active) {
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

    const clamped = clampPosition(target)
    targetRef.current = clamped

    const lerp = 0.15
    const dx = clamped.x - current.x
    const dy = clamped.y - current.y
    const ds = clamped.scale - current.scale

    if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01 && Math.abs(ds) < 0.0001)
      return

    current.x += dx * lerp
    current.y += dy * lerp
    current.scale += ds * lerp

    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${current.x}px, ${current.y}px) scale(${current.scale})`
    }
  })

  const clampScale = useCallback(
    (s: number) => Math.min(maxScale, Math.max(minScaleRef.current, s)),
    [maxScale],
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

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    velocity.current = { x: 0, y: 0 }

    if (e.touches.length === 2) {
      const t0 = e.touches[0]
      const t1 = e.touches[1]
      if (t0 === undefined || t1 === undefined) return

      const dist = getTouchDistance(t0, t1)
      const center = getTouchCenter(t0, t1)
      pinchRef.current = {
        active: true,
        startDist: dist,
        startScale: targetRef.current.scale,
        centerX: center.x,
        centerY: center.y,
      }
      isPanning.current = false
    } else if (e.touches.length === 1) {
      const t = e.touches[0]
      if (t === undefined) return

      isPanning.current = true
      lastPointer.current = {
        x: t.clientX,
        y: t.clientY,
      }
    }
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current.active) {
        const t0 = e.touches[0]
        const t1 = e.touches[1]
        if (t0 === undefined || t1 === undefined) return

        const dist = getTouchDistance(t0, t1)
        const center = getTouchCenter(t0, t1)
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return

        const newScale = clampScale(
          pinchRef.current.startScale * (dist / pinchRef.current.startDist),
        )
        const ratio = newScale / targetRef.current.scale

        const pointerX = center.x - rect.left
        const pointerY = center.y - rect.top

        const dx = center.x - pinchRef.current.centerX
        const dy = center.y - pinchRef.current.centerY
        pinchRef.current.centerX = center.x
        pinchRef.current.centerY = center.y

        targetRef.current = {
          x: pointerX - (pointerX - targetRef.current.x) * ratio + dx,
          y: pointerY - (pointerY - targetRef.current.y) * ratio + dy,
          scale: newScale,
        }
      } else if (e.touches.length === 1 && isPanning.current) {
        const dx = e.touches[0]!.clientX - lastPointer.current.x
        const dy = e.touches[0]!.clientY - lastPointer.current.y
        lastPointer.current = {
          x: e.touches[0]!.clientX,
          y: e.touches[0]!.clientY,
        }

        velocity.current = { x: dx, y: dy }
        targetRef.current.x += dx
        targetRef.current.y += dy
      }
    },
    [clampScale],
  )

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchRef.current.active = false
    }
    if (e.touches.length === 0) {
      isPanning.current = false
    }
    if (e.touches.length === 1) {
      const t = e.touches[0]
      if (t === undefined) return

      isPanning.current = true
      lastPointer.current = {
        x: t.clientX,
        y: t.clientY,
      }
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    if (e.button === 0) {
      e.preventDefault()
      isPanning.current = true
      velocity.current = { x: 0, y: 0 }
      lastPointer.current = { x: e.clientX, y: e.clientY }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    if (!isPanning.current) return

    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    velocity.current = { x: dx, y: dy }

    const target = targetRef.current
    target.x += dx
    target.y += dy
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    isPanning.current = false
  }, [])

  const handlers = {
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }

  return {
    currentRef,
    containerRef,
    innerRef,
    handlers,
    isPanning,
  }
}
