import { installPackageIfNeeded } from "./utils/package-installer";

export default async function installReactUILib(): Promise<void> {
  await installPackageIfNeeded({
    packageName: "@hitchsoftware/assistant-ui-react-ui",
    importPatterns: ["@hitchsoftware/assistant-ui-react-ui"],
    promptMessage:
      "React UI imports were added but @hitchsoftware/assistant-ui-react-ui is not installed. Do you want to install it? (Y/n) ",
    skipMessage:
      "@hitchsoftware/assistant-ui-react-ui is already installed. Skipping installation.",
    notFoundMessage: "No React UI imports found; skipping installation.",
  });
}
