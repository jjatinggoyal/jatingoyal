/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [] // Add any remote image patterns if needed
  }
};

export default nextConfig; 