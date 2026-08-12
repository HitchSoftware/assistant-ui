import { withAui } from "@hitchsoftware/assistant-ui-next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["assistant-cloud"],
};

export default withAui(nextConfig);
