import { createRuntimeExtras } from "@hitchsoftware/assistant-ui-core/react";
import type { PiRuntimeExtrasInternal } from "./runtimeTypes";

export const piExtras =
  createRuntimeExtras<PiRuntimeExtrasInternal>("usePiRuntime");
