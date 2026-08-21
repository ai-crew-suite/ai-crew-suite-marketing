import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@digestengine/sanity-schema"],
};

export default nextConfig;