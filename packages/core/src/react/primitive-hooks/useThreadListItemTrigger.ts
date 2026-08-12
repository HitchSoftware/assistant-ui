import { useCallback } from "react";
import { useAui } from "@hitchsoftware/assistant-ui-store";

export const useThreadListItemTrigger = () => {
  const aui = useAui();

  const switchTo = useCallback(() => {
    aui.threadListItem.switchTo();
  }, [aui]);

  return { switchTo };
};
