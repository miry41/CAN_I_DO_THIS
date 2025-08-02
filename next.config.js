/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発環境ではAPIルートを使用するため、output: 'export'をコメントアウト
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
