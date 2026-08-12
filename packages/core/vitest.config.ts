import { defineConfig } from "vitest/config";
import { aui } from "@hitchsoftware/assistant-ui-vite";

export default defineConfig({
  plugins: [aui()],
  test: {
    environment: "node",
    globals: true,
    passWithNoTests: true,
  },
});
