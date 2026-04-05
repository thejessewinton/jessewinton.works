import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Dropzone } from '~/components/dropzone'
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
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=optional',
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
      <body className="flex min-h-dvh flex-col items-center justify-center bg-neutral-950 font-light text-white antialiased selection:bg-cyan-900 selection:text-white">
        <Dropzone />
        <main className="w-full">
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  )
}
