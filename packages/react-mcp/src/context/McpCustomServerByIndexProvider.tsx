import type { FC, PropsWithChildren } from "react";
import { useAui, AuiConfig, AuiProvider, Derived } from "@hitchsoftware/assistant-ui-store";

export const McpCustomServerByIndexProvider: FC<
  PropsWithChildren<{ index: number }>
> = ({ index, children }) => {
  const aui = useAui();
  const config = AuiConfig({
    mcpServer: Derived({
      source: "mcp",
      query: { kind: "custom", index },
      get: (parent) => parent.mcp.customServer({ index }),
    }),
  });
  return (
    <AuiProvider extends={aui} config={config}>
      {children}
    </AuiProvider>
  );
};
