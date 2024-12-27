import { useEffect, useRef, useState } from 'react'

export const useElementMousePosition = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{
    x: number | null
    y: number | null
  }>({
    x: null,
    y: null,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = element.getBoundingClientRect()
      setPosition({
        x: e.clientX - left,
        y: e.clientY - top,
      })
    }

    element.addEventListener('mousemove', handleMouseMove)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return [ref, position] as const
}
