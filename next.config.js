const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.blog',
      },
    ],
    deviceSizes: [320, 640, 1080, 1200],
    imageSizes: [64, 128],
  },

  compiler: {
    styledComponents: true,
  },

  // REQUIRED to silence the error and confirm intent
  turbopack: {},

  // The SDK page became the TypeScript quickstart; keep old links working.
  async redirects() {
    return [{ source: '/logistics/docs/sdk', destination: '/logistics/docs/typescript', permanent: true }];
  },
});
