import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from 'next-themes'

import { Noise } from '~/components/noise'
import { cn } from '~/utils/cn'
import type { LayoutProps } from '.next/types/app/page'

const sans = Inter({
  variable: '--font-sans',
  display: 'optional',
  weight: ['300', '500'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Jesse Winton',
    template: '%s — Jesse Winton',
  },
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(sans.variable, 'text-sm')}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-white font-light text-black antialiased selection:bg-neutral-100 dark:bg-neutral-950 dark:text-white dark:selection:bg-neutral-800 dark:selection:text-white">
        <ThemeProvider attribute="class">
          <main className="mx-auto w-full px-12 md:px-40">{children}</main>
          <Noise
            className="size-full"
            animate
            baseFrequency={20}
            grainSize={1.25}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
