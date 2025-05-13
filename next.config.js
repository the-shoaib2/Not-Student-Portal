/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: process.env.API_BASE_URL || 'http://peoplepulse.diu.edu.bd:8189/:path*'
      }
    ];
  }
}

module.exports = nextConfig