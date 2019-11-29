require("dotenv").config();
const qrCode = require("qrcode-generator");
const { updateThumbnail } = require("../../controllers/qre_items");
const axios = require("axios");
const pretty = require("prettysize");

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
 * @param link
 * @returns {string|void|*}
 */
function parseURL(link) {
  if (link && regexes.GDRIVE.test(link)) {
    return parseGDriveLink(link);
  } else if (link && regexes.DROPBOX.test(link)) {
    if (link.slice(-1) === "0" || link.slice(-1) === "1") {
      link = parseDropboxLink(link);
      link = link.match(/^(.*?)\.?dl=1/gi);
      return link[0];
    }
  } else {
    return link;
  }
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

/**
 * returns array of all messages from specific channel, it bypass the discord limitation of 100 messages
 * @param channel
 * @param limit
 * @returns {Promise<[]>}
 */
async function limitlessFetchMessages(channel, limit = 9000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }
    console.log(channel.messages);
    const messages = await channel.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size !== 100 || sum_messages >= limit) {
      break;
    }
  }

  return sum_messages;
}

/**
 * checks if incoming message is from direct message
 * @param receivedMessage
 * @returns {boolean}
 */
function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

/**
 * returns filtered object of regexes you want to use
 * @param array
 * @returns {{}}
 */
function filteredRegexes(array) {
  return Object.keys(regexes)
    .filter(key => array.includes(key))
    .reduce((obj, key) => {
      obj[key] = regexes[key];
      return obj;
    }, {});
}

/**
 * checks file size from direct link to file
 * @param url
 * @returns {Promise<void>}
 */
async function checkFileSize(url) {
  const urlMetadata = await axios.head(url, { timeout: 15000 });
  if (urlMetadata && urlMetadata.status !== 404) {
    if (urlMetadata.headers["content-length"]) {
      return pretty(urlMetadata.headers["content-length"], true);
    }
  }
}

async function getRandomMeme(searchPhrase) {
  const tenor = {
    baseURL: "https://api.tenor.com/v1/random",
    apiKey: "T64EWZS77O3H",
    tag: searchPhrase,
    rating: "medium"
  };

  let tenorURL = encodeURI(
    `${tenor.baseURL}?key=${tenor.apiKey}&q=${tenor.tag}&contentfilter=${tenor.rating}&media_filter=minimal&limit=1`
  );
  const tenorResponse = await axios.get(tenorURL);
  return tenorResponse.data.results[0].media[0].gif.url;
}

function validateGuilds(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!process.env.BOT_PERMISSIONS_GUILD.includes(
      receivedMessage.guild.id
    );
  }
}

function validatePermissions(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ROLES.includes(r.name)
    );
  }
}

function validateAdmin(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ADMIN.includes(r.name)
    );
  }
}

async function getGameCover(name, id) {
  let config = {
    headers: {
      "user-key": process.env.IGDB_TOKEN,
      Accepts: "application/json"
    }
  };
  try {
    const title = name.replace(/[^a-zA-Z0-9 ]/gm, "");
    const game = await axios.get(
      `https://api-v3.igdb.com/games/?search=${title}}&fields=id,name,cover`,
      config
    );
    if (!!game.data.length && typeof game.data[0].cover !== undefined) {
      const cover = await axios.get(
        `https://api-v3.igdb.com/covers/${game.data[0].cover}/?fields=url`,
        config
      );
      if (id) {
        await updateThumbnail(id, `https:${cover.data[0].url}`);
      }
      return `https:${cover.data[0].url}`;
    } else {
      console.log("setting default cover");
      return `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`;
    }
  } catch (error) {
    console.log(error);
  }
}

const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  CIA: /\b(\w*cia\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /\b(\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*)\b|(\d+\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+/gi,
  TITLE: /"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+“/g,
  REGIONS: /\b\w*USA|JPN|EUR|GLOBAL|HACK\w*\b/gi,
  PLATFORMS: /\b\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*\b/g,
  SIZE: /(\d*\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)/gi,
  SCRAPER: /\b([^\(]+)|\((.*?)\)|(\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*)\b|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/gi
};

module.exports = {
  getGameCover,
  parseURL,
  validateAdmin,
  validatePermissions,
  validateGuilds,
  getRandomMeme,
  checkFileSize,
  filteredRegexes,
  createDataURLQrCode,
  createASCIIQrCode,
  limitlessFetchMessages,
  checkIfDM,
  regexes
};

//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
