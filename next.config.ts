import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow YouTube thumbnail/embed domains for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
