import { useCallback } from "react";
import { useAui } from "@hitchsoftware/assistant-ui-store";

export const useThreadListItemArchive = () => {
  const aui = useAui();

  const archive = useCallback(() => {
    aui.threadListItem.archive();
  }, [aui]);

  return { archive };
};
