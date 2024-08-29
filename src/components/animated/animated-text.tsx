import { ComponentProps } from 'react'
import { Balancer } from 'react-wrap-balancer'

type AnimatedTextProps = {
  children: string
} & ComponentProps<'span'>

export const AnimatedText = ({ children, ...props }: AnimatedTextProps) => {
  return (
    <Balancer>
      <span {...props}>
        {children.split(' ').map((word, i) => {
          return (
            <span
              key={word}
              className='animate-text inline-block'
              style={{
                animationDelay: `${i * 75}ms`
              }}
            >
              {word}
            </span>
          )
        })}
      </span>
    </Balancer>
  )
}
