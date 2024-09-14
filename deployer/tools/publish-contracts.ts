import { publishPackage } from "../utils/sui_utils";

(async () => {
  await publishPackage({
    packagePath: __dirname + "/../../contracts/typing_hero",
    network: "testnet",
    exportFileName: "typing-hero-contract",
  });
})();
