import { useCallback } from "react";
import { useAui } from "@hitchsoftware/assistant-ui-store";

export const useEditComposerCancel = () => {
  const aui = useAui();

  const cancel = useCallback(() => {
    aui.composer.cancel();
  }, [aui]);

  return { cancel };
};
