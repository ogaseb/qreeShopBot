import {
  createASCIIQrCode,
  limitlessFetchMessages,
  parseDropboxLink,
  regexes
} from "../helpers/helpers";
import fetch from "node-fetch";
import jimp from "jimp";
import QRReader from "qrcode-reader";
import { createQree, findGame } from "../db/db_qree";

export async function scrapChannelForQrCodes(
  messageArguments,
  receivedMessage
) {
  if (receivedMessage.channel.type === "dm") {
    return receivedMessage.channel.send(
      `This command is available only in servers`
    );
  }
  try {
    await receivedMessage.author.send(`Starting scrapping`);
    // await receivedMessage.channel.send(`scrapping...`);

    limitlessFetchMessages(receivedMessage.channel).then(async messages => {
      for (const item of messages) {
        if (!!item.attachments.size) {
          const metaInformation = item.content
            .match(regexes.SCRAPER_TITLE)
            .map(Function.prototype.call, String.prototype.trim)
            .filter(function(el) {
              if (el !== null && el !== " ") return el;
            });
          let name = metaInformation[0];
          if (!name) {
            continue;
          } else {
            name = name.replace(/^"(.*)"$/, "$1").replace(/'/g, "''");
          }
          metaInformation.shift();
          const { rows } = await findGame(name);
          if (rows.length) {
            console.log("Game is already in DB " + name + " Skipping...");
            continue;
          }

          const regionIndex = metaInformation.findIndex(value =>
            regexes.REGIONS.test(value)
          );
          const platformIndex = metaInformation.findIndex(value =>
            regexes.PLATFORMS.test(value)
          );
          const sizeIndex = metaInformation.findIndex(value =>
            regexes.SIZE.test(value)
          );

          const res = await fetch(
            `${item.attachments.values().next().value.proxyURL}`
          );
          const buffer = await res.buffer();

          const img = await jimp.read(buffer).catch(e => {
            console.log(e);
          });
          if (!img) {
            continue;
          }
          const qr = await new QRReader();

          const value = await new Promise((resolve, reject) => {
            qr.callback = (err, v) => {
              err != null ? reject(err) : resolve(v);
            };
            qr.decode(img.bitmap);
          }).catch(e => {
            console.log(e);
          });
          if (value) {
            if (
              value.result.match(regexes.DROPBOX) &&
              value.result.match(regexes.CIA)
            ) {
              value.result = parseDropboxLink(value.result);
              value.result = value.result.match(/^(.*?)\.?dl=1/gi);
            }
          } else {
            continue;
          }

          const obj = {
            name: name.replace(/^"(.*)"$/, "$1").replace(/'/g, "''"),
            qr_link: value.result,
            qr_data: await createASCIIQrCode(value.result),
            platform: metaInformation[platformIndex] || "3DS",
            region: metaInformation[regionIndex] || "N/A",
            size: metaInformation[sizeIndex] || "N/A",
            uploader_discord_id: item.author.id,
            uploader_name: item.author.username
          };

          if (!rows.length) {
            try {
              await createQree(
                obj.qr_data,
                obj.qr_link,
                obj.name,
                obj.platform,
                obj.region,
                obj.size,
                obj.uploader_discord_id,
                obj.uploader_name
              );
              console.log("Saving in database! " + obj.name);
            } catch (e) {
              console.log(e);
              await receivedMessage.author.send(
                "something went wrong, send it to developer: \n" +
                  "```diff\n- " +
                  e +
                  "```"
              );
            }
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}
