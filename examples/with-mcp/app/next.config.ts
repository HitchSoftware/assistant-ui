import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@hitchsoftware/assistant-ui-react-mcp",
    "@hitchsoftware/assistant-ui-store",
    "@hitchsoftware/assistant-ui-tap",
    "@hitchsoftware/assistant-ui-ui",
  ],
  allowedDevOrigins: ["*"],
};

export default nextConfig;
