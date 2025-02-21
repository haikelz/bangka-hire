import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    webpackBuildWorker: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
