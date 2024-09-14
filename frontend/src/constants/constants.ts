/** @ts-ignore */
import typingHeroContract from "../../typing-hero-contract.json";

export enum QueryKey {
  GetDynamicFields = "getDynamicFields",
  GetObject = "getObject",
}

export const CONSTANTS = {
  TYPING_HERO_CONTRACT: {
    TARGET_CREATE_NOTE: `${typingHeroContract.packageId}::typing_hero::create_note`,
    TARGET_DELETE_NOTE: `${typingHeroContract.packageId}::typing_hero::delete_note`,
    TARGET_UPLOAD_MY_RESULT: `${typingHeroContract.packageId}::typing_hero::upload_my_result`,
    NOTES_OBJECT_ID: typingHeroContract.notesObjectId,
  },
  WALRUS_AGGREGATOR_URL: "https://aggregator-devnet.walrus.space",
  WALRUS_PUBLISHER_URL: "https://publisher-devnet.walrus.space",
};
