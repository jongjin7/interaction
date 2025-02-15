const path = require('path');

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 배포 위치를 설정하면 이미지 최적화기능을 사용할 수 없도록 같이 설정한다.
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // ✅ Webpack alias 설정 (프로젝트 외부 폴더 접근 가능하도록)
    config.resolve.alias['@client-services'] = path.resolve(__dirname, '../../client-services');

    config.resolve.modules = [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, '../client-services'),
      'node_modules',
    ];
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류를 빌드 중 무시합니다.
  },
};

module.exports = withVanillaExtract(nextConfig);
