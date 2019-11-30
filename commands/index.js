const { scrapChannelForQrCodes } = require("./scrap/scrap.js");
const { changeInvokeCommand } = require("./invoke/invoke.js");
const { handleGameUpload } = require("./upload/upload.js");
const { searchGame } = require("./search/search.js");
const { handleGameEdit } = require("./edit/edit.js");
const { createEmbeddedHelper } = require("./help/help.js");
const { makeQrImagesfromDB } = require("./images/images");
const { urlStatus } = require("./checkurls/checkurls");
const { updateSize } = require("./updatesize/updatesize");
const { headPat } = require("./headpat/headpat");
const { findCovers } = require("./findcovers/findcovers");
const { randomGame } = require("./random/random");

module.exports = {
  scrapChannelForQrCodes,
  changeInvokeCommand,
  handleGameUpload,
  searchGame,
  handleGameEdit,
  createEmbeddedHelper,
  makeQrImagesfromDB,
  urlStatus,
  updateSize,
  headPat,
  findCovers,
  randomGame
};
