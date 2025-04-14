import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Add experimental features here
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Piksel cinsinden cihaz boyutları
  }
};

export default nextConfig;
