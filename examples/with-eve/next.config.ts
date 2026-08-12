import { withAui } from "@hitchsoftware/assistant-ui-next";
import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hitchsoftware/assistant-ui-eve", "@hitchsoftware/assistant-ui-react"],
};

export default withEve(withAui(nextConfig));
