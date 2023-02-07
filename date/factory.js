import web3 from "./web3";
import CampaignFactory from "../build/FactoryCampaigns.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1397fc11893fe5b959f38de7f577d14efbe65208"
);

export default instance;
