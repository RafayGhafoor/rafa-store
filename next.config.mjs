/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Required for GitHub Pages (static HTML export)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Disable Next image optimization for static export
  },
  assetPrefix: isProd ? '/rafa-store/' : '',
  basePath: isProd ? '/rafa-store' : '',
};

export default nextConfig;
