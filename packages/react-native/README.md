# `@hitchsoftware/assistant-ui-react-native`

[![npm version](https://img.shields.io/npm/v/@hitchsoftware/assistant-ui-react-native)](https://www.npmjs.com/package/@hitchsoftware/assistant-ui-react-native)
[![npm downloads](https://img.shields.io/npm/dm/@hitchsoftware/assistant-ui-react-native)](https://www.npmjs.com/package/@hitchsoftware/assistant-ui-react-native)
[![GitHub stars](https://img.shields.io/github/stars/assistant-ui/assistant-ui)](https://github.com/assistant-ui/assistant-ui)
![License](https://img.shields.io/npm/l/@hitchsoftware/assistant-ui-react-native)

React Native bindings for assistant-ui. Native primitives for `Thread`, `Composer`, `Message`, and `ThreadList` that share the same runtime and adapters as `@hitchsoftware/assistant-ui-react`.

## Installation

```bash
npm install @hitchsoftware/assistant-ui-react-native
```

## Usage

```tsx
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from "@hitchsoftware/assistant-ui-react-native";

const adapter: ChatModelAdapter = {
  async *run({ messages }) {
    yield { content: [{ type: "text", text: "Hello!" }] };
  },
};

export function App() {
  const runtime = useLocalRuntime(adapter);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* Thread, Composer, Message primitives */}
    </AssistantRuntimeProvider>
  );
}
```

## Documentation

Full primitives, hooks, and adapter reference at [assistant-ui.com/docs/react-native](https://www.assistant-ui.com/docs/react-native).

## For other platforms

- Web: [`@hitchsoftware/assistant-ui-react`](https://www.npmjs.com/package/@hitchsoftware/assistant-ui-react)
- Terminal (Ink): [`@hitchsoftware/assistant-ui-react-ink`](https://www.npmjs.com/package/@hitchsoftware/assistant-ui-react-ink)
