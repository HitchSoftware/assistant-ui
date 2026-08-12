import { withAui } from "@hitchsoftware/assistant-ui-next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@hitchsoftware/assistant-ui-react",
    "@hitchsoftware/assistant-ui-react-ai-sdk",
    "@hitchsoftware/assistant-ui-react-markdown",
  ],
};

export default withAui(nextConfig);
