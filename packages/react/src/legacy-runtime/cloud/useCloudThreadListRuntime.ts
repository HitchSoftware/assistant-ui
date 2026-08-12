"use client";

import type { AssistantCloud } from "@hitchsoftware/assistant-cloud";
import type { AssistantRuntime } from "@hitchsoftware/assistant-ui-core";
import { useRemoteThreadListRuntime } from "../runtime-cores/remote-thread-list/useRemoteThreadListRuntime";
import { useCloudThreadListAdapter } from "../runtime-cores/remote-thread-list/adapter/cloud";

type ThreadData = {
  externalId: string;
};

type CloudThreadListAdapter = {
  cloud: AssistantCloud;

  runtimeHook: () => AssistantRuntime;

  create?(): Promise<ThreadData>;
  delete?(threadId: string): Promise<void>;
};

export function useCloudThreadListRuntime({
  runtimeHook,
  ...adapterOptions
}: CloudThreadListAdapter) {
  const adapter = useCloudThreadListAdapter(adapterOptions);
  return useRemoteThreadListRuntime({
    runtimeHook,
    adapter,
    allowNesting: true,
  });
}
