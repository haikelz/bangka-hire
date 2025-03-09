import { SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } from "@/lib/constants";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = withSentryConfig(
  {
    reactStrictMode: true,
    compress: true,
    experimental: {
      webpackBuildWorker: true,
      optimizePackageImports: ["@radix-ui/*"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "randomuser.me",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "picsum.photos",
          pathname: "**",
        },
      ],
    },
  },
  {
    org: SENTRY_ORG,
    project: SENTRY_PROJECT,
    authToken: SENTRY_AUTH_TOKEN,
    silent: false,
    widenClientFileUpload: true,
    disableLogger: true,
  }
);

export default nextConfig;
