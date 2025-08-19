// next.config.mjs
const isVercel = !!process.env.VERCEL;

const nextConfig = {
  images: isVercel
    ? { formats: ["image/avif", "image/webp"] } // Vercel optimizer ON
    : { unoptimized: true },                    // Cloudflare safe
  ...(isVercel ? {} : { output: "export" }),    // keep static export only off Vercel
};

export default nextConfig;
