/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  // other settings...
}

module.exports = {
  output: 'export',
  basePath: isGithubPages ? '/your-repo-name' : '',
  assetPrefix: isGithubPages ? '/your-repo-name/' : '',
};
