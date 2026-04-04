import {
  type LinkComponentProps,
  Link as TanstackLink,
} from '@tanstack/react-router'
import { Arrow } from '~/components/icons'
import { cn } from '~/utils/cn'

export const Link = ({
  className,
  children,
  to,
  ...rest
}: LinkComponentProps<'a'>) => {
  return (
    <TanstackLink
      to={to}
      className={cn(
        'group inline-flex items-center gap-2.5 decoration-[1.15px] underline-offset-6 hover:underline',
        className,
      )}
      preload="intent"
      {...rest}
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
