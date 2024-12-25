'use client'

import { type ComponentPropsWithRef, useState } from 'react'
import { FluidText } from '~/components/lab/fluid-text'
import { cn } from '~/utils/classnames'

type FluidButtonProps = ComponentPropsWithRef<'button'>

export const FluidButton = ({ className, ...props }: FluidButtonProps) => {
  const [text, setText] = useState('Continue')

  const handleClick = () => {
    setText((state) => (state === 'Continue' ? 'Confirm?' : 'Continue'))
  }

  return (
    <div className="relative overflow-hidden rounded-full">
      <button
        className={cn(
          'flex h-8 min-w-32 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-sm text-white tracking-tight shadow-black/10 shadow-xs transition-colors dark:bg-white dark:text-neutral-900',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <FluidText>{text}</FluidText>
      </button>
    </div>
  )
}
