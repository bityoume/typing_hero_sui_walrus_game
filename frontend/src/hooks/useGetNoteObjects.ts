import { CONSTANTS } from "@/constants/constants";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import toast from "react-hot-toast";

export function useGetNoteObjects() {
  const account = useCurrentAccount();
  const {
    data: noteObjects,
    isPending,
    error,
  } = useSuiClientQuery(
    "getDynamicFields",
    {
      parentId: CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    toast.error("connect wallet first pls.");
    return;
  }

  if (error) {
    toast.error(`get notes objects failed: ${error.message}`);
    return;
  }

  if (isPending || !noteObjects) {
    toast.error("loading data...");
    return;
  }

  return noteObjects;
}
