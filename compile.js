const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "./build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "./contracts", "campaign.sol");
const codeSource = fs.readFileSync(contractPath, "utf8");
const output = solc.compile(codeSource, 1).contracts;
fs.ensureDirSync(buildPath);

for (let contractIndex in output) {
  console.log(contractIndex);
  fs.outputJSONSync(
    path.resolve(buildPath, contractIndex.replace(":", "") + ".json"),
    output[contractIndex]
  );
}
