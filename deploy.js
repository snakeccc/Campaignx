const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compileFactory = require("./build/FactoryCampaigns.json");

const provider = new HDWalletProvider(
  "asset army project alcohol moon path olympic menu cover enforce mechanic knife",
  "https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const factory = await new web3.eth.Contract(
    JSON.parse(compileFactory.interface)
  )
    .deploy({ data: compileFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  console.log(factory.options.address);
};

deploy();
