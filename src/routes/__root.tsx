import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import appCss from '~/styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Jesse Winton' },
      {
        name: 'description',
        content:
          'NYC based frontend engineer. Specialized in creating exceptional, well-designed web experiences.',
      },
      { property: 'og:title', content: 'Jesse Winton' },
      {
        property: 'og:description',
        content:
          'NYC based frontend engineer. Specialized in creating exceptional, well-designed web experiences.',
      },
      {
        property: 'og:image',
        content: 'https://jessewinton.works/opengraph-image.jpg',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Jesse Winton' },
      {
        name: 'twitter:description',
        content:
          'NYC based frontend engineer. Specialized in creating exceptional, well-designed web experiences.',
      },
      {
        name: 'twitter:image',
        content: 'https://jessewinton.works/opengraph-image.jpg',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;300;400&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="text-sm">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col bg-olive-100 p-12 font-mono text-neutral-900 text-sm antialiased selection:bg-olive-200 dark:bg-olive-950 dark:text-white dark:selection:text-olive-950">
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}
