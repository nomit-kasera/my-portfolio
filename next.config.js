/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  output: 'export',
  basePath: '/my-portfolio',
  assetPrefix: '/my-portfolio/',
};

module.exports = nextConfig;
