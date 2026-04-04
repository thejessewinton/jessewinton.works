import type { ComponentProps } from 'react'

import { Link as TanstackLink } from '@tanstack/react-router'
import { Arrow } from '~/components/icons'
import { cn } from '~/utils/cn'

export const Link = ({
  className,
  children,
  ...props
}: ComponentProps<typeof TanstackLink>) => {
  return (
    <TanstackLink
      to={props.href}
      className={cn(
        'group inline-flex items-center gap-2.5 decoration-[1.15px] underline-offset-6 hover:underline',
        className,
      )}
      preload="intent"
      {...props}
    >
      <span>
        {typeof children === 'function'
          ? children({ isActive: false, isTransitioning: false })
          : children}
      </span>
      <Arrow className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </TanstackLink>
  )
}
