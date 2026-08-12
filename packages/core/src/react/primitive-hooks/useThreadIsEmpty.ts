import { useAuiState } from "@hitchsoftware/assistant-ui-store";

export const useThreadIsEmpty = (): boolean => {
  return useAuiState((s) => s.thread.isEmpty);
};
