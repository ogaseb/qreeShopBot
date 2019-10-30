import { updateThumbnail } from "../db/db_qree";

require("dotenv").config();
import qrCode from "qrcode-generator";
import { RichEmbed } from "discord.js";
import { Embeds } from "discord-paginationembed";
import axios from "axios";
import pretty from "prettysize";

export function parseDropboxLink(link) {
  let string = link;
  string = string.split("/");
  if (string[3] === "sh") {
    return string.join("/");
  } else {
    string[5] = "?dl=1";
    return string.join("/");
  }
}

export function parseGDriveLink(link) {
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
}

export function parseURL(link) {
  if (link && link.match(regexes.GDRIVE)) {
    return (link = parseGDriveLink(link));
  } else if (link && link.match(regexes.DROPBOX)) {
    if (link.slice(-1) === "0" || link.slice(-1) === "1") {
      link = parseDropboxLink(link);
      link = link.match(/^(.*?)\.?dl=1/gi);
      return link[0];
    }
  } else {
    return link;
  }
}

export function createASCIIQrCode(link) {
  let qr = qrCode(0, "L");
  qr.addData(`${link}`);
  qr.make();
  return qr.createASCII(2, 1);
}

export function createDataURLQrCode(link) {
  let qr = qrCode(0, "M");
  qr.addData(`${link}`);
  qr.make();
  return qr.createDataURL(5, 5);
}

export async function limitlessFetchMessages(channel, limit = 9000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }

    const messages = await channel.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size !== 100 || sum_messages >= limit) {
      break;
    }
  }

  return sum_messages;
}

export async function createEmbeddedAnswer(
  args,
  receivedMessage,
  loadingMessageId,
  destination
) {
  const embeds = [];
  for (const {
    id,
    name,
    platform,
    region,
    size,
    uploader_name,
    qr_image_url,
    thumbnail
  } of args) {
    const gameThumbnail = thumbnail || (await getGameCover(name, id));
    embeds.push(
      new RichEmbed()
        .setImage(qr_image_url)
        .addField("Name: ", name, true)
        .addField("DB ID: ", id, true)
        .addField("Platform: ", platform, true)
        .addField("Region: ", region, true)
        .addField("Size: ", size)
        .addField("QR:", "===================", true)
        .addField("Author: ", uploader_name, true)
        .setThumbnail(gameThumbnail)
    );
  }
  await receivedMessage.channel.messages.get(loadingMessageId).delete();
  return (
    new Embeds()
      .setArray(embeds)
      .setAuthorizedUsers([receivedMessage.author.id])
      .setChannel(
        destination === "pm" ? receivedMessage.author : receivedMessage.channel
      )
      .setPageIndicator(true)
      .setPage(1)
      // Methods below are for customising all embeds
      .setTitle("Qr Code 3DS games search collection")
      .setDescription(
        "=========================================================="
      )
      .setFooter("Bot created by: ProPanek#0188")
      .setColor(0x000000)
      .setNavigationEmojis({
        back: "◀",
        jump: "↗",
        forward: "▶",
        delete: "🗑"
      })
      .setTimeout(600000)
  );
}

export function sendToQrGames(args, receivedMessage, client) {
  const embeds = [];

  console.log(args);
  embeds.push(
    new RichEmbed()
      .setImage(args.qr_image_url)
      .addField("Name: ", args.name, true)
      .addField("QR link: ", args.qr_link)
      .addField("DB ID: ", args.id, true)
      .addField("Platform: ", args.platform, true)
      .addField("Region: ", args.region, true)
      .addField("Size: ", args.size)
      .addField("QR: ", "===================", true)
      .addField("Author: ", args.uploader_name, true)
  );

  return (
    new Embeds()
      .setArray(embeds)
      .setPageIndicator(false)
      .setAuthorizedUsers([])
      .setChannel(client.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL))
      .setPage(1)
      // Methods below are for customising all embeds
      .setTitle("QR Code 3DS games subscription module")
      .setDescription(
        "=========================================================="
      )
      .setFooter("Bot created by: ProPanek#0188")
      .setColor(0x000000)
      .setDisabledNavigationEmojis(["ALL"])
      .setTimeout(600000)
  );
}

export function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

export function filteredRegexes(array) {
  return Object.keys(regexes)
    .filter(key => array.includes(key))
    .reduce((obj, key) => {
      obj[key] = regexes[key];
      return obj;
    }, {});
}

export async function checkFileSize(url) {
  const urlMetadata = await axios.head(url, { timeout: 15000 });
  if (urlMetadata && urlMetadata.status !== 404) {
    if (urlMetadata.headers["content-length"]) {
      return pretty(urlMetadata.headers["content-length"], true);
    }
  }
}

export async function getRandomMeme(searchPhrase) {
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

export function validateGuilds(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!process.env.BOT_PERMISSIONS_GUILD.includes(
      receivedMessage.guild.id
    );
  }
}

export function validatePermissions(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ROLES.includes(r.name)
    );
  }
}

export function validateAdmin(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ADMIN.includes(r.name)
    );
  }
}

export async function getGameCover(name, id) {
  let config = {
    headers: {
      "user-key": process.env.IGDB_TOKEN,
      Accepts: "application/json"
    }
  };
  try {
    const game = await axios.get(
      `https://api-v3.igdb.com/games/?search=${name}}&fields=id,name,cover`,
      config
    );
    console.log(game.data[0].cover);
    if (game.data.length) {
      const cover = await axios.get(
        `https://api-v3.igdb.com/covers/${game.data[0].cover}/?fields=url`,
        config
      );
      console.log(cover.data[0].url);
      await updateThumbnail(id, `https:${cover.data[0].url}`);
      return `https:${cover.data[0].url}`;
    }
  } catch (error) {
    // console.log(error);
  }
}

export const regexes = {
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

//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
