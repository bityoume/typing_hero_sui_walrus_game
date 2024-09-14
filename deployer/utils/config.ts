import { readFileSync } from "fs";
import { Network } from "./sui_utils";

const parseConfigurationFile = (fileName: string) => {
  try {
    return JSON.parse(readFileSync(`${fileName}.json`, "utf8"));
  } catch (e) {
    throw new Error(`Missing config file ${fileName}.json`);
  }
};

export const CONFIG = {
  /// Look for events every 1s
  POLLING_INTERVAL_MS: 1000,
  DEFAULT_LIMIT: 50,
  NETWORK: (process.env.NETWORK as Network) || "testnet",
  TYPING_HERO_CONTRACT: parseConfigurationFile("typing-hero-contract"),
};
