import { withAui } from "@hitchsoftware/assistant-ui-next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@hitchsoftware/assistant-ui-react", "@hitchsoftware/assistant-ui-react-ai-sdk"],
};

export default withAui(nextConfig);
