import { Combobox } from '@base-ui/react/combobox'
import * as React from 'react'

export const Tags = () => {
  const id = React.useId()
  return (
    <Combobox.Root items={fruits} multiple>
      <div className="relative flex flex-col gap-1 font-medium text-gray-900 text-sm leading-5">
        <Combobox.InputGroup className="focus-within:-outline-offset-1 relative box-content h-10 w-64 rounded-md border border-gray-200 bg-[canvas] focus-within:outline-2 focus-within:outline-blue-800 [&>input]:pr-[calc(0.5rem+1.5rem)] has-[.combobox-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]">
          <Combobox.Input
            placeholder="e.g. Apple"
            id={id}
            className="h-full w-full border-0 bg-transparent pl-3.5 font-normal text-base text-gray-900 outline-none"
          />
          <div className="absolute right-2 bottom-0 flex h-10 items-center justify-center text-gray-600">
            <Combobox.Clear
              className="combobox-clear flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
              aria-label="Clear selection"
            ></Combobox.Clear>
            <Combobox.Trigger
              className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
              aria-label="Open popup"
            ></Combobox.Trigger>
          </div>
        </Combobox.InputGroup>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={4}>
          <Combobox.Popup className="dark:-outline-offset-1 max-h-[23rem] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-md bg-[canvas] text-gray-900 shadow-gray-200 shadow-lg outline-1 outline-gray-200 transition-[transform,scale,opacity] duration-100 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none dark:outline-gray-300">
            <Combobox.Empty className="p-4 text-[0.925rem] text-gray-600 leading-4 empty:m-0 empty:p-0">
              No fruits found.
            </Combobox.Empty>
            <Combobox.List className="max-h-[min(23rem,var(--available-height))] scroll-py-[0.5rem] overflow-y-auto overscroll-contain py-2 outline-0 data-[empty]:p-0">
              {(item: Fruit) => (
                <Combobox.Item
                  key={item.value}
                  value={item}
                  className="grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
                >
                  <Combobox.ItemIndicator className="col-start-1"></Combobox.ItemIndicator>
                  <div className="col-start-2">{item.label}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

interface Fruit {
  label: string
  value: string
}

const fruits: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
]
