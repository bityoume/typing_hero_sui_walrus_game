import { CONSTANTS, QueryKey } from "@/constants/constants";
import { useTransactionExecution } from "@/hooks/useTransactionExecution";
import { putData } from "@/utils/walrusService";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote() {
  const account = useCurrentAccount();
  const executeTransaction = useTransactionExecution();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: { title: string; content: string }) => {
      if (!account?.address) {
        throw new Error("You need to connect your wallet!");
      }

      const blob_id = await putData(info.content);

      const txb = new Transaction();
      txb.moveCall({
        target: `${CONSTANTS.TYPING_HERO_CONTRACT.TARGET_CREATE_NOTE}`,
        arguments: [
          txb.object(CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID),
          txb.pure.string(info.title),
          txb.pure.string(blob_id),
        ],
      });

      return executeTransaction(txb);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetDynamicFields],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
}

export function useDeleteNote() {
  const account = useCurrentAccount();
  const executeTransaction = useTransactionExecution();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!account?.address) {
        throw new Error("You need to connect your wallet!");
      }

      const txb = new Transaction();
      txb.moveCall({
        target: `${CONSTANTS.TYPING_HERO_CONTRACT.TARGET_DELETE_NOTE}`,
        arguments: [
          txb.object(CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID),
          txb.pure.string(title),
        ],
      });

      return executeTransaction(txb);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetDynamicFields],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
}
