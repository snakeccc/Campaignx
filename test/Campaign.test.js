const Web3 = require("web3");
const assert = require("assert");
const ganache = require("ganache");
const compileCampaign = require("../build/Compaign.json");
const compileFactory = require("../build/FactoryCampaigns.json");

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({ data: compileFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createCampaign("10")
    .send({ from: accounts[0], gas: "1000000" });

  [campaignAddress] = await factory.methods.getdeployCampaign().call();

  campaign = await new web3.eth.Contract(
    JSON.parse(compileCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploy a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
    console.log("bb");
  });

  it("dd", async () => {
    const manger = await campaign.methods.Manager().call();

    assert.equal(accounts[0], manger);
    //console.log("campaign", campaign);
    //console.log("campaignAddress", campaignAddress);
  });

  it("ContributeTest", async () => {
    await campaign.methods
      .createRequest("ffffffffff", "2000000000000000000", accounts[5])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .Contribute()
      .send({ value: "1000000000000000000", from: accounts[1] });

    await campaign.methods
      .Contribute()
      .send({ value: "1000000000000000000", from: accounts[2] });

    var myContract = await campaign.methods
      .approvalRequest(0)
      .send({ from: accounts[1], gas: "1000000" });
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: "1000000" });
  });

  it("xxx", async () => {
    let balance = await web3.eth.getBalance(accounts[5]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
  });

  /* it("finalizeRequest", async () => {
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: "1000000" });
  });*/
});

/*
let manger;
setTimeout(() => {
  manger = campaign.methods.Manager().call();

  console.log(accounts);
  console.log(manger);
}, 5000);
*/
