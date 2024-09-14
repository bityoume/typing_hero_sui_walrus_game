import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, signAndExecute } from "../utils/sui_utils";

const createNote = async (title: string, blob_id: string, alias: string) => {
  const txb = new Transaction();

  txb.moveCall({
    target: `${CONFIG.TYPING_HERO_CONTRACT.packageId}::typing_hero::create_note`,
    arguments: [
      txb.object(CONFIG.TYPING_HERO_CONTRACT.notesObjectId),
      txb.pure.string(title),
      txb.pure.string(blob_id),
    ],
  });

  const res = await signAndExecute(txb, ACTIVE_NETWORK, alias);

  console.log(JSON.stringify(res, null, 2));

  if (!res.objectChanges || res.objectChanges.length === 0)
    throw new Error("Something went wrong while creating note.");

  console.log("create note success");
};

async function main() {
  const randomNum = Math.floor(Math.random() * 1000000) + 1;
  await createNote("title_" + randomNum, "blob id " + randomNum, "bym");
}

main();
