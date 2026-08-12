import type { ComponentProps } from "react";
import { Text } from "ink";
import { useAuiState } from "@hitchsoftware/assistant-ui-store";

export type BranchPickerCountProps = ComponentProps<typeof Text>;

export const BranchPickerCount = (props: BranchPickerCountProps) => {
  const branchCount = useAuiState((s) => s.message.branchCount);
  return <Text {...props}>{branchCount}</Text>;
};
