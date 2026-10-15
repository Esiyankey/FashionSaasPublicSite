import type { NextConfig } from "next";

const apiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const apiUrl = new URL(apiOrigin);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
          protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
          hostname: apiUrl.hostname,
          ...(apiUrl.port ? { port: apiUrl.port } : {}),
          pathname: "/media/**",
        },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
