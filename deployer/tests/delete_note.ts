import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, signAndExecute } from "../utils/sui_utils";

const deleteNote = async (title: string, alias: string) => {
  const txb = new Transaction();

  txb.moveCall({
    target: `${CONFIG.TYPING_HERO_CONTRACT.packageId}::typing_hero::delete_note`,
    arguments: [
      txb.object(CONFIG.TYPING_HERO_CONTRACT.notesObjectId),
      txb.pure.string(title),
    ],
  });

  console.log(ACTIVE_NETWORK);

  const res = await signAndExecute(txb, ACTIVE_NETWORK, alias);

  console.log(JSON.stringify(res, null, 2));

  if (!res.objectChanges || res.objectChanges.length === 0)
    throw new Error("Something went wrong while deleting note.");

  console.log("delete note success");
};

async function main() {
  await deleteNote("title_102007", "bym");
}

main();
