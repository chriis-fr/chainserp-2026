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
});
