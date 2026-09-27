import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { useRef, useState } from 'react'
import { usePointerDrag } from '../../hooks/use-pointer-drag'

const DRAG_THRESHOLD = 3

export const Switch = () => {
  const [checked, setChecked] = useState(true)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const didDragRef = useRef(false)
  const gestureRef = useRef({ startX: 0, startOffset: 0, travel: 0, offset: 0 })

  const handleThumbDrag = usePointerDrag({
    onStart: (event) => {
      const thumb = thumbRef.current
      const track = thumb?.parentElement
      if (!thumb || !track) return false

      const { paddingLeft, paddingRight } = getComputedStyle(track)
      const travel =
        track.clientWidth -
        Number.parseFloat(paddingLeft) -
        Number.parseFloat(paddingRight) -
        thumb.offsetWidth

      gestureRef.current = {
        startX: event.clientX,
        startOffset: checked ? travel : 0,
        travel,
        offset: checked ? travel : 0,
      }
      didDragRef.current = false
    },
    onMove: (event) => {
      const thumb = thumbRef.current
      const track = thumb?.parentElement
      if (!thumb || !track) return

      const gesture = gestureRef.current
      const deltaX = event.clientX - gesture.startX
      if (!didDragRef.current && Math.abs(deltaX) < DRAG_THRESHOLD) return

      didDragRef.current = true
      gesture.offset = Math.min(
        Math.max(gesture.startOffset + deltaX, 0),
        gesture.travel,
      )
      const progress = gesture.offset / gesture.travel

      thumb.style.transitionProperty = 'transform, scale'
      thumb.style.translate = `${gesture.offset}px 0`
      thumb.style.transformOrigin = `${progress * 100}% 50%`
      thumb.style.backgroundColor = `color-mix(in oklab, var(--color-neutral-500), var(--color-white) ${progress * 100}%)`

      track.style.transitionProperty = 'none'
      track.style.backgroundColor = `color-mix(in oklab, color-mix(in oklab, var(--color-white) 5%, transparent), var(--color-green-900) ${progress * 100}%)`
    },
    onEnd: () => {
      const thumb = thumbRef.current
      const track = thumb?.parentElement
      if (!thumb || !track) return

      thumb.style.removeProperty('transition-property')
      thumb.style.removeProperty('translate')
      thumb.style.removeProperty('transform-origin')
      thumb.style.removeProperty('background-color')
      track.style.removeProperty('transition-property')
      track.style.removeProperty('background-color')

      if (!didDragRef.current) return
      setChecked(gestureRef.current.offset > gestureRef.current.travel / 2)
      setTimeout(() => {
        didDragRef.current = false
      })
    },
  })

  return (
    <label className="group flex cursor-pointer items-center gap-2 font-bold text-neutral-200 text-sm">
      Notifications
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={(checked) => {
          if (didDragRef.current) return
          setChecked(checked)
        }}
        className="flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-[0.5px] border-neutral-800 bg-white/5 bg-clip-padding p-[3.5px] backdrop-blur-sm transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-[0.5px] focus-visible:outline-neutral-400 data-checked:bg-green-900"
      >
        <SwitchPrimitive.Thumb
          className="h-6 w-8 origin-left touch-none rounded-full bg-neutral-500 transition-[translate,background-color,transform,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-x-105 data-checked:origin-right data-checked:translate-x-[calc(100%-8px)] data-checked:bg-white motion-reduce:transition-[background-color]"
          ref={thumbRef}
          onPointerDown={handleThumbDrag}
        />
      </SwitchPrimitive.Root>
    </label>
  )
}
