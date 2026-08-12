"use client";

import {
  AssistantRuntimeProvider,
  WebSpeechSynthesisAdapter,
} from "@hitchsoftware/assistant-ui-react";
import { useChatRuntime } from "@hitchsoftware/assistant-ui-react-ai-sdk";

export function PlaygroundRuntimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const runtime = useChatRuntime({
    adapters: {
      speech: new WebSpeechSynthesisAdapter(),
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
