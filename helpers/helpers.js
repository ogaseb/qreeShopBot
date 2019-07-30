import qrCode from "qrcode-generator";
import { MessageEmbed } from "discord.js";
import { Embeds } from "discord-paginationembed";
import { getWholeDB } from "../db/db_qree";
import urlStatusCode from "url-status-code";

export function parseDropboxLink(link) {
  let string = link;
  string = string.split("/");
  string[5] = "?dl=1";
  string = string.join("/");
  return string;
}

export function parseGDriveLink(link) {
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
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

export async function createEmbeddedAnswer(args, receivedMessage, destination) {
  const embeds = [];
  args.map(
    async (
      {
        id,
        qr_link,
        name,
        platform,
        region,
        size,
        uploader_name,
        qr_image_url
      }
    ) => {
      embeds.push(
        new MessageEmbed()
          .setImage(qr_image_url)
          .addField("Name: ", name, true)
          .addField("QR link: ", qr_link)
          .addField("DB ID: ", id, true)
          .addField("Platform: ", platform, true)
          .addField("Region: ", region, true)
          .addField("Size: ", size)
          .addField("QR:", "===================", true)
          .addField("Author: ", uploader_name, true)
      );
    }
  );

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

  console.log(client.channels.get("582266411166990346"));
  embeds.push(
    new MessageEmbed()
      .setImage(args.qr_image_url)
      .addField("Name: ", args.name, true)
      .addField("QR link: ", args.qr_link)
      .addField("Platform: ", args.platform, true)
      .addField("Region: ", args.region, true)
      .addField("Size: ", args.size)
      .addField("QR: ", "===================", true)
      .addField("Author: ", args.uploader_name, true)
  );

  return (
    new Embeds()
      .setArray(embeds)
      .setAuthorizedUsers([receivedMessage.author.id])
      .setChannel(client.channels.get("582266411166990346"))
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

export async function urlStatus(client) {
  await client.channels
    .get("605181514321494036")
    .send(
      `Checking urls started... I will do it every hour`
    );
  const { rows } = await getWholeDB();
  for (const {
    id,
    qr_link,
    name,
  } of rows) {
    urlStatusCode(qr_link, async (error, statusCode) => {
      if (error) {
      } else {
        if (statusCode === 404) {
          await client.channels
            .get("605181514321494036")
            .send(
              `This Game ${name} is giving 404 error (not found), DB ID to update link: ${id} . Mark it with some reaction if its fixed! `
            );
        }
      }
    });
  }
}

export function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

export const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  CIA: /\b(\w*cia\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /\b(\w*GBA|GBC|NES|SNES|MD|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO\w*)\b|(\d+\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+|\S+/gi,
  TITLE: /"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+“/g,
  REGIONS: /\b\w*USA|JPN|EUR|GLOBAL|HACK\w*\b/gi,
  PLATFORMS: /\b\w*GBA|GBC|NES|SNES|MD|PCE|3DS|NEW3DS|DSiWare|DSI|ESHOP|NEW 3DS|NEO GEO\w*\b/gi,
  SIZE: /(\d*\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)/gi,
  SCRAPER: /\b([^\(]+)|\((.*?)\)|(\w*GBA|NES|SNES|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO\w*)\b|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/gi
};
//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
