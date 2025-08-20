'use client'

import { useGlitch } from 'react-powerglitch'

export const Glitch = ({ text }: { text: string }) => {
  const { ref } = useGlitch({
    playMode: 'hover',
  })

  return (
    <div className="contents">
      <span className="sr-only">{text}</span>
      <span ref={ref}>{text}</span>
    </div>
  )
}
