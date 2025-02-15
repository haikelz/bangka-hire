import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    webpackBuildWorker: true,
  },
};

export default nextConfig;
