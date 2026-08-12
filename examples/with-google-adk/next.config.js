import { withAui } from "@hitchsoftware/assistant-ui-next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@hitchsoftware/assistant-ui-react", "@hitchsoftware/assistant-ui-react-google-adk"],
};

export default withAui(nextConfig);
