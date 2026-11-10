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
    return [
      { source: '/logistics/docs/sdk', destination: '/logistics/docs/typescript', permanent: true },
      // Pages removed because they described things Chains does not do; send old links to the closest true page.
      { source: '/features/crypto-payroll', destination: '/features/payroll', permanent: true },
      { source: '/features/erp-for-remote-teams', destination: '/features/payroll', permanent: true },
      { source: '/industries/fintech', destination: '/industries', permanent: true },
      { source: '/industries/saas', destination: '/industries/consulting', permanent: true },
      { source: '/industries/crypto', destination: '/accept-bitcoin-payments', permanent: true },
      { source: '/regions/remote-teams', destination: '/regions', permanent: true },
      { source: '/problems/cross-border-payroll', destination: '/features/payroll', permanent: true },
      { source: '/problems/web3-accounting-compliance', destination: '/accept-bitcoin-payments', permanent: true },
    ];
  },
});
