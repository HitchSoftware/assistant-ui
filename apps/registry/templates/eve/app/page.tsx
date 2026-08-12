"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { useEveAgentRuntime } from "@hitchsoftware/assistant-ui-eve";

export default function Home() {
  const runtime = useEveAgentRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
