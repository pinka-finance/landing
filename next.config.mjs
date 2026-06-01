/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → Cloudflare (Workers + Static Assets). The dynamic bits
  // (waitlist/newsletter signups) are handled by the Worker in ./worker,
  // which serves this exported `out/` and writes signups to a D1 database.
  // Security headers live in ./public/_headers (copied into out/), since
  // next.config `headers()` does not apply to a static export.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
