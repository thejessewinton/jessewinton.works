import { Inter, Newsreader, Roboto_Mono } from 'next/font/google'
import { Footer } from '~/components/footer'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import '~/styles/globals.css'
import { Analytics, SpeedInsights } from '~/components/analytics'

const sans = Inter({
  variable: '--font-sans',
  display: 'optional',
  subsets: ['latin']
})

const serif = Newsreader({
  variable: '--font-serif',
  display: 'optional',
  style: 'italic',
  subsets: ['latin'],
  weight: ['300']
})

const mono = Roboto_Mono({
  variable: '--font-mono',
  display: 'optional',
  subsets: ['latin'],
  weight: ['300']
})

export const metadata: Metadata = {
  title: {
    default: 'Jesse Winton',
    template: '%s — Jesse Winton'
  }
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en' className={`${sans.variable} ${serif.variable} ${mono.variable} text-sm`}>
      <body className='flex min-h-screen flex-col items-center justify-center scroll-smooth leading-loose antialiased selection:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:selection:bg-neutral-800'>
        <main className='mx-auto mt-32 flex w-full max-w-3xl flex-grow flex-col items-center justify-center px-8'>
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
