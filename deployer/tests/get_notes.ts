import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, getClient, signAndExecute } from "../utils/sui_utils";

const getNotes = async () => {
  const client = getClient(ACTIVE_NETWORK);

  let ownedObjects = await client.getDynamicFields({
    parentId: CONFIG.TYPING_HERO_CONTRACT.notesObjectId,
  });

  console.log(JSON.stringify(ownedObjects, null, 2));

  let ownedObjectsDetails = await Promise.all(
    ownedObjects.data.map(async (obj) => {
      return await client.getDynamicFieldObject({
        parentId: CONFIG.TYPING_HERO_CONTRACT.notesObjectId,
        name: {
          type: obj.name.type,
          value: obj.name.value,
        },
      });
    })
  );

  return ownedObjectsDetails.map((obj) => (obj.data?.content as any)?.fields);
};

async function main() {
  const notes = await getNotes();
  console.log(JSON.stringify(notes, null, 2));
}

main();
