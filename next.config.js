/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ai-tools-directory',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimize for static site hosting (GitHub Pages / Vercel)
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '/ai-tools-directory',
}

module.exports = nextConfig
