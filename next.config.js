const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// The commit this build came from, for /api/health: the server's deployer checks it.
const BUILD_COMMIT = (() => {
  try {
    return require('child_process').execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim();
  } catch {
    return 'unknown';
  }
})();

// Set by the Chains platform deployer on the server; Vercel and local dev never set it.
const SELF_HOSTED = process.env.BUILD_STANDALONE === 'true';

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  // On the server the site runs as a standalone Node app in a Docker container.
  ...(SELF_HOSTED ? { output: 'standalone' } : {}),

  env: { BUILD_COMMIT },

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
    // On the server, serve images as they are: resizing on request costs CPU the API and POS need.
    unoptimized: SELF_HOSTED,
  },

  compiler: {
    styledComponents: true,
  },

  // Pin Turbopack's root to this project: the Desktop holds several Next projects side by side.
  turbopack: { root: __dirname },

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
