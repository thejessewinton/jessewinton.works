import type { HTMLProps } from 'react'

import { Arrow } from '~/components/icons'
import { cn } from '~/utils/cn'

export const Link = ({
  className,
  children,
  ...props
}: HTMLProps<HTMLAnchorElement>) => {
  return (
    <a
      className={cn(
        'group inline-flex items-center gap-2.5 underline-offset-6 [text-decoration-thickness:0.15px] hover:underline',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <Arrow className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  )
}
