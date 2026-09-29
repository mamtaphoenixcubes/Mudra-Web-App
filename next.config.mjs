/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.17', '192.168.1.17:3000', 'localhost:3000'],
};

export default nextConfig;
