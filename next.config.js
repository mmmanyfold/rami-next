/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rami-notion-api.fly.dev',
        pathname: '/public/assets/**',
      },
    ],
  },
}

module.exports = nextConfig
