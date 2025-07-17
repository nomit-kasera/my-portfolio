/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  // other settings...
}

module.exports = {
  output: 'export',
  basePath: '/my-portfolio',
  assetPrefix: '/my-portfolio/',
};
