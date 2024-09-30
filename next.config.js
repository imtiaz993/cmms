const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@/components": path.resolve(__dirname, "components"),
      "@/context": path.resolve(__dirname, "context"),
      "@/public": path.resolve(__dirname, "public"),
      "@/lib": path.resolve(__dirname, "lib"),
      "@/config": path.resolve(__dirname, "config"),
      "@/utils": path.resolve(__dirname, "utils"),
      "@/hooks": path.resolve(__dirname, "hooks"),
      "@/icons": path.resolve(__dirname, "icons"),
      "@/constants": path.resolve(__dirname, "constants"),
    };
    return config;
  },
};
