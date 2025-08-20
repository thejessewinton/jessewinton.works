import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from 'next-themes'
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
      <body className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-light text-white antialiased selection:bg-gray-800 selection:text-white">
        <ThemeProvider attribute="class">
          <main className="relative mx-auto h-full w-full px-12 lg:px-40">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
