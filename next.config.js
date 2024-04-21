/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["vercel.com", "api.dicebear.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
