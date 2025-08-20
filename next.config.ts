import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const config = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  redirects: async () => [
    {
      source: '/lab',
      destination: 'https://cosmos.so',
      permanent: false,
    },
  ],
} satisfies NextConfig;

export default withContentCollections(config);
