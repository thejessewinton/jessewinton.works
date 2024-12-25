'use client';

import { useTheme } from 'next-themes';

export const Toolbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 max-w-xs left-1/2 w-full border border-neutral-300 dark:border-neutral-700/30 rounded-full -translate-x-1/2 bg-white/50 backdrop-blur-sm dark:bg-neutral-900/50 fixed mx-auto bottom-10">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="bg-neutral-300 dark:bg-neutral-700 size-6 rounded-full"
      ></button>
    </div>
  );
};
