'use client'

import { useTheme } from 'next-themes'

export const Toolbar = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="-translate-x-1/2 fixed bottom-10 left-1/2 mx-auto flex w-full max-w-xs items-center justify-between rounded-full border border-neutral-300 bg-white/50 p-4 backdrop-blur-sm dark:border-neutral-700/30 dark:bg-neutral-900/50">
      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="size-6 rounded-full bg-neutral-300 dark:bg-neutral-700"
      />
    </div>
  )
}
