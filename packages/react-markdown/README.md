# `@hitchsoftware/assistant-ui-react-markdown`

[`react-markdown`](https://github.com/remarkjs/react-markdown) integration for `@hitchsoftware/assistant-ui-react`. Renders the assistant's markdown output as React components inside `MessagePrimitive.Parts`.

## When to use this

| Package                                  | Best for                                                          |
| ---------------------------------------- | ----------------------------------------------------------------- |
| `@hitchsoftware/assistant-ui-react-markdown`           | Lightweight rendering; bring your own syntax highlighter.         |
| `@hitchsoftware/assistant-ui-react-streamdown`         | Feature-rich with built-in Shiki, KaTeX, and Mermaid.             |
| `@hitchsoftware/assistant-ui-react-syntax-highlighter` | Pair with `react-markdown` when you only need code-block highlighting. |

## Installation

```bash
npm install @hitchsoftware/assistant-ui-react @hitchsoftware/assistant-ui-react-markdown react-markdown remark-gfm
```

## Usage

```tsx
import { MarkdownTextPrimitive } from "@hitchsoftware/assistant-ui-react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownText = () => (
  <MarkdownTextPrimitive remarkPlugins={[remarkGfm]} className="aui-md" />
);
```

Plug `<MarkdownText />` into `MessagePrimitive.Parts` as the `Text` component to render markdown for every text part.

Full reference at [assistant-ui.com/docs/ui/markdown](https://www.assistant-ui.com/docs/ui/markdown).
