/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Add a trailing slash to all paths (helps with static hosting)
  trailingSlash: true,
  // Optional: Configure image optimization
  images: {
    unoptimized: true, // Required for static exports
  },
  // Optional: Add environment variables that should be available at build time
  env: {
    // Add any build-time environment variables here
  }
};

export default nextConfig;
