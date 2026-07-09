import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/profile", destination: "/artist", permanent: true },
      { source: "/jobs", destination: "/library", permanent: true },
      { source: "/messaging", destination: "/artist", permanent: true },
      { source: "/notifications", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfoliomaxlegav-maxs-projects-04fa28ce.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
