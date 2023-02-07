const routes = require("next-routes");

// Name   Page      Pattern
module.exports = routes()
  .add("/Campaigns/new", "/Campaigns/new")
  .add("/Campaigns/:address", "/Campaigns/show")
  .add("/Campaigns/:address/request", "/Campaigns/request")
  .add("/Campaigns/:address/addrequest", "/Campaigns/addrequest");
