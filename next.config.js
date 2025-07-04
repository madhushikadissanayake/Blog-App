/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Add your domain
    // or use unoptimized: true for local images
    unoptimized: true
  }
}

module.exports = nextConfig
