const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // images: {
  //   unoptimized: true
  // },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류를 빌드 중 무시합니다.
  },
  // transpilePackages: ['@company/design-system'],
};

module.exports = withVanillaExtract(nextConfig);
