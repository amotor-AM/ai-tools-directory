/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimize for static site hosting (GitHub Pages / Vercel)
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
