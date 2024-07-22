/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // reactStrictMode: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
