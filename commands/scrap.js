import {
  createASCIIQrCode,
  limitlessFetchMessages,
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

  limitlessFetchMessages(receivedMessage.channel).then(async messages => {
    for (const item of messages) {
      console.log(messages.author.name);
      if (!!item.attachments.size) {
        const metaInformation = item.content
          .match(regexes.SCRAPER_TITLE)
          .map(Function.prototype.call, String.prototype.trim)
          .filter(function(el) {
            if (el !== null && el !== " ") return el;
          });
        const name = metaInformation[0];
        metaInformation.shift();

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
        const img = await jimp.read(buffer);
        const qr = new QRReader();

        const value = await new Promise((resolve, reject) => {
          qr.callback = (err, v) => (err != null ? reject(err) : resolve(v));
          qr.decode(img.bitmap);
        });

        const obj = {
          name: name.replace(/^"(.*)"$/, "$1").replace(/'/g, "''"),
          qr_link: value.result,
          qr_data: await createASCIIQrCode(value.result),
          platform: metaInformation[platformIndex] || "N/A",
          region: metaInformation[regionIndex] || "N/A",
          size: metaInformation[sizeIndex] || "N/A",
          uploader_discord_id: item.author.id,
          uploader_name: messages.author.username
        };

        const { rows } = await findGame(obj.name);
        console.log(!rows.length);
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
            await receivedMessage.author.send(
              "Saving in database! " + obj.name
            );
          } catch (e) {
            console.log(e);
            await receivedMessage.author.send(
              "something went wrong, send it to developer: \n" +
                "```diff\n- " +
                e +
                "```"
            );
          }
        } else {
          await receivedMessage.author.send("Game is already in DB" + obj.name);
        }
      }
    }

    return receivedMessage.channel.send(`fetching messages`);
  });
}
