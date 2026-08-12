"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { useChatRuntime } from "@hitchsoftware/assistant-ui-react-ai-sdk";
import { ElevenLabsVoiceAdapter } from "@/lib/elevenlabs-voice-adapter";
import { VoiceThread } from "./voice-thread";

export default function Home() {
  const runtime = useChatRuntime({
    adapters: {
      voice: new ElevenLabsVoiceAdapter({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "",
      }),
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <VoiceThread />
    </AssistantRuntimeProvider>
  );
}
