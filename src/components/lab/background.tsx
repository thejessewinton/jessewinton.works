import { GrainGradient } from '@paper-design/shaders-react'
import type { ComponentProps } from 'react'

interface BackgroundProps extends ComponentProps<typeof GrainGradient> {}

export const Background = ({
  className,
  width = 1280,
  height = 720,
  colors = ['#808080', '#000'],
  colorBack = '#0a0a0a',
  softness = 1,
  frame = 200,
  shape = 'corners',
  intensity = 0.5,
  noise = 0.5,
  speed = 0,
  ...rest
}: BackgroundProps) => {
  return (
    <GrainGradient
      className={className}
      width={width}
      height={height}
      colors={colors}
      frame={frame}
      colorBack={colorBack}
      softness={softness}
      intensity={intensity}
      noise={noise}
      shape={shape}
      speed={speed}
      {...rest}
    />
  )
}
