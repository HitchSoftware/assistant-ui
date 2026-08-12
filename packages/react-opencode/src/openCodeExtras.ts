import { createRuntimeExtras } from "@hitchsoftware/assistant-ui-core/react";
import type { OpenCodeRuntimeExtras } from "./types";

export const openCodeExtras =
  createRuntimeExtras<OpenCodeRuntimeExtras>("useOpenCodeRuntime");
