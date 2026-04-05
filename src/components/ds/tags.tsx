import { Combobox } from '@base-ui/react/combobox'
import { useNavigate } from '@tanstack/react-router'
import * as React from 'react'

interface TagsProps {
  tags: string[]
  selectedTags?: string[]
}

export const Tags = ({ tags, selectedTags = [] }: TagsProps) => {
  const navigate = useNavigate()

  const items = tags.map((tag) => ({ label: tag, value: tag }))

  const selectedItems = items.filter((item) =>
    selectedTags.includes(item.value),
  )

  const handleValueChange = (
    values: { label: string; value: string }[],
  ) => {
    const next = values.map((v) => v.value)
    navigate({
      to: '/style',
      search: next.length > 0 ? { tags: next } : {},
    })
  }

  const label = React.useMemo(() => {
    if (selectedTags.length === 0) return 'Tags'
    if (selectedTags.length === 1) return selectedTags[0]
    return `${selectedTags[0]} +${selectedTags.length - 1}`
  }, [selectedTags])

  return (
    <Combobox.Root
      items={items}
      multiple
      value={selectedItems}
      onValueChange={handleValueChange}
    >
      <Combobox.Trigger className="flex items-center gap-2 rounded-full bg-neutral-700 px-4 py-1.5 text-neutral-200 text-sm transition-colors hover:bg-neutral-600">
        <span>{label}</span>
      </Combobox.Trigger>

      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={8}>
          <Combobox.Popup className="max-h-[20rem] w-56 origin-[var(--transform-origin)] rounded-lg bg-neutral-800 p-1 text-neutral-200 shadow-lg ring ring-neutral-600/50 transition-[transform,scale,opacity] duration-100 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
            <div className="p-2">
              <Combobox.Input
                placeholder="Search tags..."
                className="w-full rounded-md border border-neutral-600 bg-neutral-700 px-3 py-1.5 text-neutral-200 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-500"
              />
            </div>
            <Combobox.Empty className="px-3 py-2 text-neutral-400 text-sm">
              No tags found.
            </Combobox.Empty>
            <Combobox.List className="max-h-[min(16rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain outline-0">
              {(item: { label: string; value: string }) => (
                <Combobox.Item
                  key={item.value}
                  value={item}
                  className="flex cursor-default select-none items-center gap-2 rounded-md px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-neutral-700"
                >
                  <Combobox.ItemIndicator className="size-4 text-neutral-400">
                    &#10003;
                  </Combobox.ItemIndicator>
                  <span>{item.label}</span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}
