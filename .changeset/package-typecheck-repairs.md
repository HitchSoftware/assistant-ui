---
"@hitchsoftware/assistant-ui-core": patch
"@hitchsoftware/assistant-ui-store": patch
"@hitchsoftware/assistant-cloud": patch
"@hitchsoftware/assistant-ui-next": patch
"@hitchsoftware/assistant-ui-mcp-docs-server": patch
"@hitchsoftware/assistant-ui-react": patch
"@hitchsoftware/assistant-ui-react-ai-sdk": patch
"@hitchsoftware/assistant-ui-react-data-stream": patch
"@hitchsoftware/assistant-ui-react-generative-ui": patch
"@hitchsoftware/assistant-ui-react-google-adk": patch
"@hitchsoftware/assistant-ui-react-langchain": patch
"@hitchsoftware/assistant-ui-react-langgraph": patch
"@hitchsoftware/assistant-ui-react-mcp": patch
"@hitchsoftware/assistant-ui-react-opencode": patch
"@hitchsoftware/assistant-ui-react-pi": patch
---

Repair package typecheck prerequisites and typed test fixtures without excluding tests or relaxing compiler diagnostics. Accept the existing empty external-store message case, use the MCP request context's cancellation signal, and correct Vue slot child typing and selected-thread lookup.
