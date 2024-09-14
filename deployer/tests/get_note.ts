import { Transaction } from "@mysten/sui/transactions";
import { CONFIG } from "../utils/config";
import { ACTIVE_NETWORK, signAndExecute } from "../utils/sui_utils";

const AGGREGATOR_URL = "https://aggregator-devnet.walrus.space";
const PUBLISHER_URL = "https://publisher-devnet.walrus.space";

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

async function main() {
  // const data = await getData("ZfiKaIT8C2KL3-NWCoCaa60hZO0tOi0Uz3lQ1hYBqPc");
  //const data = await getData("vn18znQ_SZp0avEwTUQDmz-hi4yG03eRezpsbcPbjIs");
  const data = await getData("vn18znQ_SZp0avEwTUQDmz-hi4yG03eRezpsbcPbjIs");

  console.log(`data: [${data}]`);
}

main();
