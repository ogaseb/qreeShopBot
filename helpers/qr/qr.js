require("dotenv").config();
const qrCode = require("qrcode-generator");
const imageDataURI = require("image-data-uri");
const { regexes } = require("../other_helpers/other_helpers");

/**
 * parsing shared dropbox link to direct link
 * @param link
 * @returns {string}
 */
function parseDropboxLink(link) {
  let string = link;
  string = string.split("/");
  if (string[3] === "sh") {
    return string.join("/");
  } else {
    string[5] = "?dl=1";
    return string.join("/");
  }
}

/**
 * parsing shared google drive link to direct link
 * @param link
 * @returns {string|void|*}
 */
function parseGDriveLink(link) {
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
}

/**
 * parse url with one of matching patterns
 * @param link provide link for catbox or dropbox
 * @returns {string|void|*}
 */
async function parseURL(link) {
  if (!!link.match(regexes.DROPBOX)) {
    if (link.slice(-1) === "0" || link.slice(-1) === "1") {
      link = parseDropboxLink(link);
      link = link.match(/^(.*?)\.?dl=1/gi);
      return link[0];
    }
  }
  if (link.match(regexes.CATBOX)) {
    return link;
  }
  throw "error with parsing link. you must provide dropbox or catbox url";
}

/**
 * create ASCII qr code from url
 * @param link
 * @returns {string}
 */
function createASCIIQrCode(link) {
  let qr = qrCode(0, "L");
  qr.addData(`${link}`);
  qr.make();
  return qr.createASCII(2, 1);
}

/**
 * create data url from link
 * @param link
 * @returns {string}
 */
function createDataURLQrCode(link) {
  let qr = qrCode(0, "M");
  qr.addData(`${link}`);
  qr.make();
  return qr.createDataURL(5, 5);
}

async function createQrImageUrlFromLink(finalObject, receivedMessage, url) {
  let string =
    finalObject.name +
    finalObject.platform +
    finalObject.region +
    finalObject.uploaderDiscordId;
  string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
  
  await imageDataURI.outputFile(
    await createDataURLQrCode(url),
    "./img/" + string + ".jpg"
  );
  const imageMsg = await receivedMessage.channel.send("", {
    files: ["./img/" + string + ".jpg"]
  });
  if (
    typeof imageMsg.attachments.values().next().value.proxyURL !== "undefined"
  ) {
    return imageMsg.attachments.values().next().value.proxyURL;
  } else {
    throw "cant get link for qr image";
  }
}

module.exports = {
  parseURL,
  createASCIIQrCode,
  createQrImageUrlFromLink
};
