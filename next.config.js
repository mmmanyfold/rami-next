/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
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
