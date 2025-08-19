import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const config = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['@phosphor-icons/react'],
  },
} satisfies NextConfig;

export default withContentCollections(config);
