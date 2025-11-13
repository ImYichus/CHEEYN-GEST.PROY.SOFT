// cheeyn/next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', 
      },
      {
        protocol: 'https',
        hostname: 'i5.walmartimages.com.mx',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
    ],
  },
  
  /* config options here */
};

export default nextConfig;