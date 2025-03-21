import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    largePageDataBytes: 128 * 100000,
  }
};

export default nextConfig;
