import { CONSTANTS } from "../constants/constants";

export const putData = async (data: string): Promise<string> => {
  const noWhitespaceData = data.replace(/\s+/g, " ");

  try {
    const response = await fetch(CONSTANTS.WALRUS_PUBLISHER_URL + "/v1/store", {
      method: "PUT",
      body: noWhitespaceData,
    });

    const jsonResponse = await response.json();
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

export const getData = async (blob_id: string): Promise<string> => {
  try {
    const response = await fetch(
      CONSTANTS.WALRUS_AGGREGATOR_URL + `/v1/${blob_id}`,
      {
        method: "GET",
      },
    );
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
