import { ReactNode } from 'react';

import css from 'classnames';
import { default as NextLink } from 'next/link';

interface LinkProps {
  children: ReactNode;
  to?: string | any;
  as?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
  activeClassName?: string;
  [key: string]: ReactNode;
}

export const Link = ({
  children,
  to,
  className,
  activeClassName,
  as,
  icon,
  iconPosition = 'right',
  target,
  params,
  ...props
}: LinkProps) => {
  const isLink = typeof to !== 'undefined';
  const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '');

  return (
    <NextLink href={to} as={as}>
      <a
        className={css('flex items-center gap-3', className)}
        target={isExternal ? '_blank' : target}
        {...props}
      >
        {iconPosition === 'left' && icon && (
          <span className="h-icon w-icon">{icon}</span>
        )}
        {children}
        {iconPosition === 'right' && icon && (
          <span className="h-icon w-icon">{icon}</span>
        )}
      </a>
    </NextLink>
  );
};
