import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, getClient, signAndExecute } from "../utils/sui_utils";

const AGGREGATOR_URL = "https://aggregator-devnet.walrus.space";
const PUBLISHER_URL = "https://publisher-devnet.walrus.space";

const putData = async (data: string): Promise<string> => {
  try {
    const response = await fetch(PUBLISHER_URL + "/v1/store", {
      method: "PUT",
      body: data,
    });

    const jsonResponse = await response.json();
    console.log("Response:", JSON.stringify(jsonResponse));

    let blobId = "";

    if (jsonResponse.alreadyCertified) {
      blobId = jsonResponse.alreadyCertified.blobId;
    } else if (jsonResponse.newlyCreated) {
      blobId = jsonResponse.newlyCreated.blobObject.blobId;
    } else {
      throw new Error("Response does not contain expected bolbId");
    }

    return blobId;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

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

const getNotes = async () => {
  const client = getClient(ACTIVE_NETWORK);

  let ownedObjects = await client.getDynamicFields({
    parentId: CONFIG.TYPING_HERO_CONTRACT.notesObjectId,
  });

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

const getData = async (blob_id: string): Promise<string> => {
  try {
    const response = await fetch(AGGREGATOR_URL + `/v1/${blob_id}`, {
      method: "GET",
    });
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

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
  const total = 10;
  for (let i = 0; i < total; i++) {
    console.log(`>>> create note: [${i + 1}/${total}]`);

    const randomNum = Math.floor(Math.random() * 1000000) + 1;
    const blobId = await putData("bityoume blob txt: " + randomNum);
    console.log("Blob ID:", blobId);
    await createNote("title_" + randomNum, blobId, "bym");
  }

  console.log(">>> get notes");
  const notes = await getNotes();
  //   console.log(JSON.stringify(notes, null, 2));

  for (const note of notes) {
    const data = getData(note.blob_id);
    console.log(`>>> title: ${note.title}, data: ${data}`);
    await deleteNote(note.title, "bym");
  }
}

main();
