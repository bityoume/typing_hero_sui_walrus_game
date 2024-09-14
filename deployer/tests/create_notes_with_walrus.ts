import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, signAndExecute } from "../utils/sui_utils";

const AGGREGATOR_URL = "https://aggregator-devnet.walrus.space";
const PUBLISHER_URL = "https://publisher-devnet.walrus.space";

// const AGGREGATOR_URL = "http://127.0.0.1:31415.walrus.space";
// const PUBLISHER_URL = "http://127.0.0.1:31415.walrus.space";

const putData = async (data: string): Promise<string> => {
  try {
    const response = await fetch(PUBLISHER_URL + "/v1/store", {
      method: "PUT",
      body: data,
    });

    // console.log("Response:", response); return "aaa";
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

async function main() {
  const randomNum = Math.floor(Math.random() * 1000000) + 1;

  const blobId = await putData("blob txt: " + randomNum);
  console.log("Blob ID:", blobId);

  await createNote("title_" + randomNum, blobId, "bym");
}

main();
