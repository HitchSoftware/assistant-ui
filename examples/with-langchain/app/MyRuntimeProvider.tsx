"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { useStreamRuntime } from "@hitchsoftware/assistant-ui-react-langchain";

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const runtime = useStreamRuntime({
    assistantId: process.env.NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID!,
    apiUrl: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
