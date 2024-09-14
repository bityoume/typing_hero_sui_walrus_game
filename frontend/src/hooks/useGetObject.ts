import { useSuiClientQuery } from "@mysten/dapp-kit";

export function useGetObject({ objectId }: { objectId: string }) {
  return useSuiClientQuery(
    "getObject",
    {
      id: objectId,
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
      },
    },
    {
      enabled: !!objectId,
    },
  );
}
