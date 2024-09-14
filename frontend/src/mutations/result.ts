import { CONSTANTS, QueryKey } from "@/constants/constants";
import { useTransactionExecution } from "@/hooks/useTransactionExecution";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadMyWPM() {
  const account = useCurrentAccount();
  const executeTransaction = useTransactionExecution();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (my_wpm: number) => {
      if (!account?.address) {
        throw new Error("You need to connect your wallet!");
      }

      const txb = new Transaction();
      txb.moveCall({
        target: `${CONSTANTS.TYPING_HERO_CONTRACT.TARGET_UPLOAD_MY_RESULT}`,
        arguments: [
          txb.object(CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID),
          txb.pure.u64(my_wpm),
        ],
      });

      return executeTransaction(txb);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetObject],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
}
