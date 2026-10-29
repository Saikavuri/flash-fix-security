import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Keep the dev server's output away from the production build output so a
   * running `next dev` can never corrupt a `next build` in `.next`.
   */
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 200, 256, 384],
    /**
     * Explicitly allow the quality values used across the site. Required
     * from Next.js 16 — declaring them here keeps the build warning-free.
     */
    qualities: [70, 75, 80, 82, 84, 88, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
