import { withAui } from "@hitchsoftware/assistant-ui-next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hitchsoftware/assistant-ui-react", "@hitchsoftware/assistant-ui-react-langchain"],
};

export default withAui(nextConfig);
