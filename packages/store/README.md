# `@hitchsoftware/assistant-ui-store`

[![npm version](https://img.shields.io/npm/v/@hitchsoftware/assistant-ui-store)](https://www.npmjs.com/package/@hitchsoftware/assistant-ui-store)
[![GitHub stars](https://img.shields.io/github/stars/assistant-ui/assistant-ui)](https://github.com/assistant-ui/assistant-ui)

Tap-based state container with React Context integration. Bridges `@hitchsoftware/assistant-ui-tap` resources into React via `useAui`, `useAuiState`, `AuiConfig`, and `<AuiProvider>`.

`store` powers the runtime layer of assistant-ui. Most users do not install it directly; reach for `@hitchsoftware/assistant-ui-react` instead.

## Framework-neutral entry

`@hitchsoftware/assistant-ui-store/client` exposes `createAssistantClient`, which builds the same client inside a standalone tap root with no React renderer. Non-React bindings consume the store through this entry; react-less consumers additionally alias `react` to `@hitchsoftware/assistant-ui-tap/standalone-shim` in their bundler. The `react` peer dependency is optional for exactly this configuration.

## Installation

```bash
npm install @hitchsoftware/assistant-ui-store @hitchsoftware/assistant-ui-tap
```

## Usage

```typescript
import { resource } from "@hitchsoftware/assistant-ui-tap";
import { useState } from "react";
import {
  useAui,
  useAuiState,
  AuiProvider,
  AuiConfig,
  type ClientOutput,
} from "@hitchsoftware/assistant-ui-store";

declare module "@hitchsoftware/assistant-ui-store" {
  interface ScopeRegistry {
    counter: {
      methods: {
        getState: () => { count: number };
        increment: () => void;
      };
    };
  }
}

const useCounterClient = (): ClientOutput<"counter"> => {
  const [state, setState] = useState({ count: 0 });
  return {
    getState: () => state,
    increment: () => setState({ count: state.count + 1 }),
  };
};

const CounterClient = resource(useCounterClient);

function App() {
  const config = AuiConfig({ counter: CounterClient() });
  return (
    <AuiProvider config={config}>
      <Counter />
    </AuiProvider>
  );
}

function Counter() {
  const count = useAuiState((s) => s.counter.count);
  const aui = useAui();
  return <button onClick={() => aui.counter().increment()}>{count}</button>;
}
```

Full API reference (clients, derived clients, events, `useClientLookup`, `useClientList`) at [assistant-ui.com/tap/docs/store/quickstart](https://www.assistant-ui.com/tap/docs/store/quickstart).
