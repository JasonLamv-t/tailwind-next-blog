const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH,
  images: {
    unoptimized: true,
  },
  output: 'export' // TODO: toggle for start
};

module.exports = withContentlayer(nextConfig);
