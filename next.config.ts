import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shikoimagestoragegrp3.blob.core.windows.net",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
