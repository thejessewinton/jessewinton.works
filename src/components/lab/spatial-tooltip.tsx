'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useEffect, useRef, useState } from 'react'
import { cn } from '~/utils/classnames'

export const TabsGroup = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]!.name)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabElementRef = useRef(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
    'right',
  )

  const previousActiveTabRef = useRef(activeTab)

  useEffect(() => {
    const container = containerRef.current

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement

        const clipLeft = offsetLeft
        const clipRight = offsetLeft + offsetWidth
        container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 8px)`
      }
    }
  }, [activeTab])

  useEffect(() => {
    const currentIndex = TABS.findIndex((tab) => tab.name === activeTab)
    const previousIndex = TABS.findIndex(
      (tab) => tab.name === previousActiveTabRef.current,
    )

    setSlideDirection(currentIndex > previousIndex ? 'right' : 'left')
    previousActiveTabRef.current = activeTab
  }, [activeTab])

  return (
    <Tabs.Root
      className="relative mx-0 flex w-fit flex-col items-center pt-4"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <div
        aria-hidden
        className="peer relative w-full overflow-hidden transition-all duration-500 [clip-path:inset(100%_75%_0px_0%_round_8px)]"
        ref={containerRef}
      >
        <div
          className={cn(
            'relative flex w-full justify-between bg-neutral-950 transition-all',
            {
              'animate-menu-out opacity-0': !open,
              'animate-menu-in': open,
            },
          )}
        >
          {TABS.map((tab) => {
            return (
              <button
                key={tab.name}
                type="button"
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name)
                }}
                className={cn(
                  'grid place-items-center px-2 py-1 text-center text-white text-xs transition-all duration-500 ease-out [grid-area:stack]',
                  {
                    'translate-x-full opacity-0':
                      activeTab !== tab.name && slideDirection === 'right',
                    '-translate-x-[50px] opacity-0':
                      activeTab !== tab.name && slideDirection === 'left',
                  },
                )}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      <Tabs.List
        className="flex w-full"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {TABS.map((tab) => {
          return (
            <Tabs.Trigger
              onMouseEnter={() => setActiveTab(tab.name)}
              value={tab.name}
              key={tab.name}
              asChild
            >
              <button
                type="button"
                ref={activeTab === tab.name ? activeTabElementRef : null}
                data-tab={tab.name}
                className='relative grid cursor-pointer grid-cols-1 place-items-center px-2 py-1 text-xs [grid-template-areas:"stack"]'
              >
                <span
                  className={cn(
                    'transition-all duration-300 ease-out [grid-area:stack]',
                  )}
                >
                  {tab.component}
                </span>
                <div
                  className={cn(
                    'opacity-0 transition-all duration-300 ease-out [grid-area:stack]',
                  )}
                >
                  {tab.name}
                </div>
              </button>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}

const TABS = [
  {
    name: 'No changes',
    component: <button type="button">Hover</button>,
  },
  {
    name: 'Balances that are cool',
    component: <button type="button">Hover</button>,
  },
  {
    name: 'Customers',
    component: <button type="button">Hover</button>,
  },
  {
    name: 'Billing',
    component: <button type="button">Hover</button>,
  },
]
