import { getPartialJsonObjectFieldState } from "@hitchsoftware/assistant-stream/utils";
import { useAuiState } from "@hitchsoftware/assistant-ui-store";

const COMPLETE_STATUS = { type: "complete" };

export const useToolArgsFieldStatus = (fieldPath: (string | number)[]) => {
  return useAuiState((s) => {
    if (s.part.type !== "tool-call")
      throw new Error(
        "useToolArgsFieldStatus can only be used inside tool-call message parts",
      );

    const state = getPartialJsonObjectFieldState(s.part.args, fieldPath);
    if (state === "complete" || s.part.status?.type === "requires-action")
      return COMPLETE_STATUS;
    return s.part.status;
  });
};
