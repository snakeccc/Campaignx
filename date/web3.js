const Web3 = require("web3");

let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa"
  );
  web3 = new Web3(provider);
}

export default web3;
