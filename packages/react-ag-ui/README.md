# `@hitchsoftware/assistant-ui-react-ag-ui`

[AG-UI protocol](https://github.com/ag-ui-protocol/ag-ui) integration for `@hitchsoftware/assistant-ui-react`. Wraps an `@ag-ui/client` agent in an assistant-ui runtime so any AG-UI-compatible backend (CopilotKit, custom Python/Go/TS agents) can drive the standard assistant-ui components.

## Installation

```bash
npm install @hitchsoftware/assistant-ui-react @hitchsoftware/assistant-ui-react-ag-ui @ag-ui/client
```

## Usage

```tsx
"use client";

import { useMemo } from "react";
import { AssistantRuntimeProvider } from "@hitchsoftware/assistant-ui-react";
import { HttpAgent } from "@ag-ui/client";
import { useAgUiRuntime } from "@hitchsoftware/assistant-ui-react-ag-ui";

export function Provider({ children }: { children: React.ReactNode }) {
  const agent = useMemo(
    () => new HttpAgent({ url: process.env.NEXT_PUBLIC_AGUI_AGENT_URL! }),
    [],
  );
  const runtime = useAgUiRuntime({ agent });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
```

## See also

- `@hitchsoftware/assistant-ui-react-a2a` for the A2A v1.0 protocol.
- `@hitchsoftware/assistant-ui-react-langgraph` for LangGraph SDK agents.

Full API reference, multi-thread setup, and interrupt handling at [assistant-ui.com/docs/runtimes/ag-ui](https://www.assistant-ui.com/docs/runtimes/ag-ui). See [`examples/with-ag-ui`](https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-ag-ui) for a complete app.
