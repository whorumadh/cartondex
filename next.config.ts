import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // @ts-ignore Next.js 16 agentRules flag
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.tcgdex.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
