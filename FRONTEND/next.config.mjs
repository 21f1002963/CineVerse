/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
    unoptimized: true, // Required for static export
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
};

export default nextConfig;
