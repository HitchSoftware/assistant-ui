import { useCallback } from "react";
import { useAui, useAuiState } from "@hitchsoftware/assistant-ui-store";

export const useBranchPickerPrevious = () => {
  const aui = useAui();
  const disabled = useAuiState((s) => {
    if (s.message.branchNumber <= 1) return true;
    if (s.thread.isRunning && !s.thread.capabilities.switchBranchDuringRun) {
      return true;
    }
    return false;
  });

  const previous = useCallback(() => {
    aui.message.switchToBranch({ position: "previous" });
  }, [aui]);

  return { previous, disabled };
};
