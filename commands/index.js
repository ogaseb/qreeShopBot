const { scrapChannelForQrCodes } = require("./scrap/scrap.js");
const { changeInvokeCommand } = require("./invoke/invoke.js");
const { handleGameUpload } = require("./upload/upload.js");
const { searchGame } = require("./search/search.js");
const { editQrData } = require("./edit/edit.js");
const { sendHelp } = require("./help/help.js");
const { makeQrImagesFromDB } = require("./images/images");
const { checkUrlsForStatus } = require("./checkurls/checkurls");
const { updateSizeOfFile } = require("./updatesize/updatesize");
const { sendHeadPat } = require("./headpat/headpat");
const { findCoversForGames } = require("./findcovers/findcovers");
const { getRandomGame } = require("./random/random");

module.exports = {
  scrapChannelForQrCodes,
  changeInvokeCommand,
  handleGameUpload,
  searchGame,
  editQrData,
  sendHelp,
  makeQrImagesFromDB,
  checkUrlsForStatus,
  updateSizeOfFile,
  sendHeadPat,
  findCoversForGames,
  getRandomGame
};
