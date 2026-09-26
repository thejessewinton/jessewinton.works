import { Dithering as DitheringShader } from '@paper-design/shaders-react'
import type { ComponentProps } from 'react'

interface DitheringProps extends ComponentProps<typeof DitheringShader> {}

export const Dithering = ({
  className,
  width = 1280,
  height = 720,
  colorBack = '#000',
  colorFront = '#222',
  speed = 0,
  scale = 0.65,
  ...rest
}: DitheringProps) => {
  return (
    <DitheringShader
      width={1280}
      height={720}
      colorBack={colorBack}
      colorFront={colorFront}
      shape="simplex"
      type="4x4"
      scale={scale}
      size={2.5}
      speed={speed}
      {...rest}
      className={className}
    />
  )
}
