import { withAui } from "@hitchsoftware/assistant-ui-next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@hitchsoftware/assistant-ui-react"],
  },
  async rewrites() {
    return [
      {
        source: "/assistant/:path*",
        destination: "http://localhost:8000/assistant/:path*",
      },
    ];
  },
};

export default withAui(nextConfig);
