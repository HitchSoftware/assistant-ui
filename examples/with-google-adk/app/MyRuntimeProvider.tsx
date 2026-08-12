"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { useAdkRuntime, createAdkStream } from "@hitchsoftware/assistant-ui-react-google-adk";

export function MyRuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useAdkRuntime({
    stream: createAdkStream({ api: "/api/chat" }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
