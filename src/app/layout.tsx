import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from 'next-themes'
import { Noise } from '~/components/noise'
import { cn } from '~/utils/cn'
import { Snowfall } from '~/components/snow'

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

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      lang="en"
      className={cn(sans.variable, 'text-sm')}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col items-center justify-center bg-neutral-950 font-light text-white antialiased selection:bg-cyan-900 selection:text-white">
        <ThemeProvider attribute="class">
          <main className="relative mx-auto h-full w-full px-12 lg:px-40">
            {children}
          </main>
         
          <Noise blendMode="multiply" animate />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
