/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // reactStrictMode: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
