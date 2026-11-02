import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol:"https",
        hostname:"i.pinimg.com",
      },
      {
        protocol:"https",
        hostname:"images.unsplash.com",
      },
      {
        protocol:"https",
        hostname:"www.ikea.com",
      }
    ],
  },
};

export default nextConfig;