"use client";

import {
  AssistantRuntimeProvider,
  unstable_Interactables,
  useAui,
} from "@hitchsoftware/assistant-ui-react";
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
  const aui = useAui({ unstable_interactables: unstable_Interactables() });

  return (
    <AssistantRuntimeProvider aui={aui} runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
