import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const config = {} satisfies NextConfig

export default withContentCollections(config)
