"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@hitchsoftware/assistant-ui-react-ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Thread } from "@/components/assistant-ui/thread";

export const Assistant = () => {
  const runtime = useChatRuntime({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
