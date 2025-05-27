/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Only use static export when explicitly building for Electron
  output: process.env.BUILD_FOR_ELECTRON === 'true' ? 'export' : 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Configure images based on build target
  images: {
    unoptimized: process.env.BUILD_FOR_ELECTRON === 'true', // Only unoptimize for Electron
  },
  
  // Only use trailing slash for Electron builds
  trailingSlash: process.env.BUILD_FOR_ELECTRON === 'true',
  
  // Keep rewrites for normal development
  async rewrites() {
    // Only use rewrites when not building for Electron
    if (process.env.BUILD_FOR_ELECTRON !== 'true') {
      return [
        {
          source: '/proxy/:path*',
          destination: `${process.env.API_BASE_URL}/:path*`
        }
      ];
    }
    return [];
  },
  
  // Skip API routes in static exports
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig