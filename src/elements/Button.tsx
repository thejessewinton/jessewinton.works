import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from 'react';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import css from 'classnames';
import { Link } from './Link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export const Button = forwardRef(
  (
    {
      to,
      icon,
      iconPosition = 'right',
      target,
      className,
      children,
      ...rest
    }: ButtonProps,
    ref: Ref<any>
  ) => {
    const isLink = typeof to !== 'undefined';
    const isExternal =
      isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '');

    const buttonStyles = css(
      'py-3 px-6 max-h-12 font-bold cursor-pointer flex items-center justify-center rounded transition-all bg-gray-400 text-gray-100 gap-3 hover:bg-transparent hover:border-gray-400 border border-solid border-transparent relative overflow-hidden hover:bg-gray-100 hover:text-white transition-all disabled:cursor-not-allowed',
      className
    );

    if (isExternal) {
      return (
        <a
          className={buttonStyles}
          href={to}
          rel="noopener noreferrer"
          target="_blank"
          ref={ref}
        >
          {children}
          <ExternalLinkIcon />
        </a>
      );
    }

    if (isLink) {
      return (
        <Link
          to={to}
          icon={icon}
          iconPosition={iconPosition}
          target={target}
          className={buttonStyles}
        >
          {children}
        </Link>
      );
    }

    return (
      <button className={buttonStyles} ref={ref} {...rest}>
        {iconPosition === 'left' && icon && <> {icon}</>}
        {children}
        {iconPosition === 'right' && icon && <>{icon}</>}
      </button>
    );
  }
);

Button.displayName = 'Button';
