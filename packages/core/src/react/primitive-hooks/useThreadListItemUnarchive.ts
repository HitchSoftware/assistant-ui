import { useCallback } from "react";
import { useAui } from "@hitchsoftware/assistant-ui-store";

export const useThreadListItemUnarchive = () => {
  const aui = useAui();

  const unarchive = useCallback(() => {
    aui.threadListItem.unarchive();
  }, [aui]);

  return { unarchive };
};
