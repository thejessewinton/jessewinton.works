import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const config = {
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig

export default withContentCollections(config)
