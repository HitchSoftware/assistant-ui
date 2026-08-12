import { resource } from "@hitchsoftware/assistant-ui-tap";
import type { ClientOutput } from "@hitchsoftware/assistant-ui-store";
import type { AttachmentRuntime } from "../../runtime/api/attachment-runtime";
import { useSubscribable } from "./useSubscribable";

const useAttachmentRuntimeClient = ({
  runtime,
}: {
  runtime: AttachmentRuntime;
}): ClientOutput<"attachment"> => {
  const state = useSubscribable(runtime);

  return {
    getState: () => state,
    remove: runtime.remove,
    __internal_getRuntime: () => runtime,
  };
};

export const AttachmentRuntimeClient = resource(useAttachmentRuntimeClient);
