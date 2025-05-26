import type { Metadata } from 'next'
import { DottedMap } from '~/components/shared/dotted-map'

export const metadata: Metadata = {
  title: 'SVG Dotted Map',
  description: 'A lightweight utility to create beautiful, stylized SVG maps.',
}

export default function MapPage() {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-2 pb-4">
      <DottedMap />
    </div>
  )
}
