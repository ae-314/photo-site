/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // build static files into /out
  images: { unoptimized: true }, // no server-side image optimizer
};
export default nextConfig;
