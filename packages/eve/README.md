# @hitchsoftware/assistant-ui-eve

Eve runtime adapter for assistant-ui.

```tsx
"use client";

import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { useEveAgentRuntime } from "@hitchsoftware/assistant-ui-eve";

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useEveAgentRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
```
