"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@hitchsoftware/assistant-ui-react-ai-sdk";

export function RuntimeProvider({
  api = "/api/chat",
  children,
}: Readonly<{ api?: string; children: React.ReactNode }>) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
