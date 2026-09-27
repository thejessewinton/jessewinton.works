import { NumberField } from '@base-ui/react/number-field'
import NumberFlow from '@number-flow/react'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useId, useRef, useState } from 'react'
import { usePointerDrag } from '../../hooks/use-pointer-drag'
import { Chevron } from '../ds/chevron'

export const QuantityStepper = () => {
  const id = useId()
  const [value, setValue] = useState<number | null>(100)
  const [animated, setAnimated] = useState(true)
  const stepperRef = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState<'left' | 'right'>('left')

  const handleScrubStart = usePointerDrag({
    onMove: (event) => {
      if (event.movementX !== 0) setSide(event.movementX < 0 ? 'left' : 'right')
    },
  })

  return (
    <NumberField.Root
      id={id}
      value={value}
      min={0}
      onValueChange={(value, details) => {
        if (details.reason !== 'input-change') setAnimated(true)
        setValue(value)
      }}
      name="quantity"
      ref={stepperRef}
      className="flex flex-col items-start gap-2"
    >
      <NumberField.ScrubArea
        className="w-full cursor-ew-resize select-none"
        onPointerDown={handleScrubStart}
      >
        <label htmlFor={id} className="font-normal text-neutral-200">
          Quantity
        </label>
        <NumberField.ScrubAreaCursor className="filter">
          <Chevron side={side} size={24} />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="flex h-12">
        <NumberField.Decrement className="group flex size-12 cursor-pointer items-center justify-center rounded-l-md border-[0.5px] border-neutral-800 border-r-0 bg-white/5 bg-clip-padding text-neutral-400 backdrop-blur-sm transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/8 hover:text-neutral-200 focus-visible:z-1 focus-visible:outline-[0.5px] focus-visible:outline-neutral-400">
          <MinusIcon className="size-5 transition-transform duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-active:scale-90" />
        </NumberField.Decrement>
        <div className="relative h-full">
          <NumberField.Input
            onFocus={() => setAnimated(false)}
            onInput={() => setAnimated(false)}
            onBlur={() => setAnimated(true)}
            className="h-full w-[7ch] border-[0.5px] border-neutral-800 bg-white/2 px-3 text-left font-normal any-pointer-coarse:text-base text-transparent tabular-nums caret-neutral-950 backdrop-blur-sm selection:bg-white/20 selection:text-transparent! focus:z-1 focus:outline-[0.5px] focus:outline-neutral-400 focus:outline-offset-[-0.5px] dark:caret-white"
            name="quantity"
          />
          <NumberFlow
            value={value ?? 0}
            animated={animated}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-3 z-2 flex items-center font-normal any-pointer-coarse:text-base text-white tabular-nums"
          />
        </div>
        <NumberField.Increment className="group flex size-12 cursor-pointer items-center justify-center rounded-r-md border-[0.5px] border-neutral-800 border-l-0 bg-white/5 bg-clip-padding text-neutral-400 backdrop-blur-sm transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/8 hover:text-neutral-200 focus-visible:z-1 focus-visible:outline-[0.5px] focus-visible:outline-neutral-400">
          <PlusIcon className="size-5 transition-transform duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-active:scale-90" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
