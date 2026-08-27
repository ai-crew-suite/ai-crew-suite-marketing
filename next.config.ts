import { withSentryConfig } from "@sentry/nextjs";

const telemetryEnabled = process.env.NODE_ENV !== "development";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "iframe.mediadelivery.net" },
    ],
  },
};

export default telemetryEnabled
  ? withSentryConfig(nextConfig, {
      org: "webstack-builders",
      project: "digestengine-marketing",
      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,
      // Pass the auth token
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // Upload a larger set of source maps for prettier stack traces
      widenClientFileUpload: true,
    })
  : nextConfig;
