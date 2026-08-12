import { installPackageIfNeeded } from "./utils/package-installer";

export default async function installEdgeLib(): Promise<void> {
  await installPackageIfNeeded({
    packageName: "@hitchsoftware/assistant-ui-react-ai-sdk",
    importPatterns: [
      "@hitchsoftware/assistant-ui-react-edge",
      "@hitchsoftware/assistant-ui-react-ai-sdk",
      "useChatRuntime",
    ],
    promptMessage:
      "Edge Runtime imports were detected but @hitchsoftware/assistant-ui-react-ai-sdk is not installed. Do you want to install it? (Y/n) ",
    skipMessage:
      "@hitchsoftware/assistant-ui-react-ai-sdk is already installed. Skipping installation.",
    notFoundMessage: "No Edge Runtime imports found; skipping installation.",
  });
}
