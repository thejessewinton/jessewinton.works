import { useEffect, useState } from 'react'

export const useElementMousePosition = (
  ref: React.RefObject<HTMLDivElement>,
) => {
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
  }, [ref])

  return position
}
