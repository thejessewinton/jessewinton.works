import { GrainGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'motion/react'
import type { ComponentProps } from 'react'

interface NoiseProps extends ComponentProps<typeof GrainGradient> {}

export const Noise = ({
  className,
  width = 1280,
  height = 720,
  colors = ['#808080', '#000'],
  colorBack = '#000',
  softness = 1,
  shape = 'corners',
  intensity = 0.5,
  noise = 0.5,
  speed = 0.2,
  ...rest
}: NoiseProps) => {
  const reducedMotion = useReducedMotion()

  return (
    <GrainGradient
      className={className}
      width={width}
      height={height}
      colors={colors}
      colorBack={colorBack}
      softness={softness}
      intensity={intensity}
      noise={noise}
      shape={shape}
      speed={reducedMotion ? 0 : speed}
      {...rest}
    />
  )
}
