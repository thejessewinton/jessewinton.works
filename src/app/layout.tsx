import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { QueryProvider } from '~/providers/query'
import { cn } from '~/utils/cn'

const sans = Inter({
  variable: '--font-sans',
  display: 'optional',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Jesse Winton',
    template: '%s — Jesse Winton',
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(sans.variable, 'text-sm')}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-white font-light text-neutral-800 antialiased selection:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:selection:bg-neutral-800 dark:selection:text-white">
        <ThemeProvider attribute="class">
          <QueryProvider>
            <main className="container mx-auto w-full">{children}</main>
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
