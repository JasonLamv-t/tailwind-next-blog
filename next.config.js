/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH,
  images: {
    unoptimized: true,
  },
  output: 'standalone'
};

module.exports = nextConfig;
