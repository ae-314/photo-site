// next.config.mjs
const isVercel = !!process.env.VERCEL;

const nextConfig = {
  images: isVercel
    ? { formats: ["image/avif", "image/webp"] } // optimizer ON on Vercel
    : { unoptimized: true },                    // off elsewhere (Cloudflare)
  ...(isVercel ? {} : { output: "export" }),    // DO NOT export on Vercel
};
export default nextConfig;
