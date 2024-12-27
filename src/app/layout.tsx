import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '~/components/footer'

import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { Snowfall } from '~/components/lab/snowfall'
import { QueryProvider } from '~/providers/query'

const sans = Inter({
  variable: '--font-sans',
  display: 'optional',
  subsets: ['latin'],
})

const serif = Newsreader({
  variable: '--font-serif',
  display: 'optional',
  style: 'italic',
  subsets: ['latin'],
  weight: ['300'],
})

const mono = JetBrains_Mono({
  variable: '--font-mono',
  display: 'optional',
  subsets: ['latin'],
  weight: ['300'],
})

export const metadata: Metadata = {
  title: {
    default: 'Jesse Winton',
    template: '%s — Jesse Winton',
  },
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} text-sm`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col items-center justify-center scroll-smooth bg-white text-neutral-800 leading-loose antialiased selection:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:selection:bg-neutral-800 dark:selection:text-white">
        <ThemeProvider attribute="class">
          <QueryProvider>
            <main className="mx-auto mt-32 flex w-full max-w-4xl grow flex-col items-center justify-center px-4 md:px-8">
              {children}
            </main>
            <Snowfall />
            <Footer />
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
