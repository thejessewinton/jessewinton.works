import { NumberField } from '@base-ui/react/number-field'
import NumberFlow from '@number-flow/react'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useCallback, useId, useRef, useState } from 'react'
import { Chevron } from '../ds/chevron'

export const QuantityStepper = () => {
  const id = useId()
  const [value, setValue] = useState<number | null>(100)
  const [animated, setAnimated] = useState(true)
  const stepperRef = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState<'left' | 'right'>('left')

  const handleScrubStart = useCallback(() => {
    const controller = new AbortController()
    const { signal } = controller

    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.movementX !== 0) setSide(e.movementX < 0 ? 'left' : 'right')
      },
      { signal },
    )
    window.addEventListener('pointerup', () => controller.abort(), { signal })
  }, [])

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
        <label htmlFor={id} className="font-bold text-neutral-200 text-sm">
          Quantity
        </label>
        <NumberField.ScrubAreaCursor className="filter">
          <Chevron side={side} size={24} />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="flex h-12">
        <NumberField.Decrement className="group flex size-12 cursor-pointer items-center justify-center rounded-l-md border-[0.5px] border-neutral-700 border-r-0 bg-white/5 bg-clip-padding backdrop-blur-sm">
          <MinusIcon className="size-5 transition-transform group-active:scale-98" />
        </NumberField.Decrement>
        <div className="relative h-full text-md">
          <NumberField.Input
            onFocus={() => setAnimated(false)}
            onInput={() => setAnimated(false)}
            onBlur={() => setAnimated(true)}
            className="focus:-outline-offset-[0.5px] h-full w-[7ch] border-[0.5px] border-neutral-700 bg-white/2 px-2.5 text-left font-normal any-pointer-coarse:text-base text-transparent tabular-nums caret-neutral-950 backdrop-blur-sm transition-all focus:z-1 focus:outline-[0.5px] focus:outline-neutral-400 dark:caret-white"
            name="quantity"
          />
          <NumberFlow
            value={value ?? 0}
            animated={animated}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-2.5 z-2 flex items-center any-pointer-coarse:text-base text-white tabular-nums"
          />
        </div>
        <NumberField.Increment className="group flex size-12 cursor-pointer items-center justify-center rounded-r-md border-[0.5px] border-neutral-700 border-l-0 bg-white/5 bg-clip-padding backdrop-blur-sm">
          <PlusIcon className="size-5 transition-transform group-active:scale-98" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
