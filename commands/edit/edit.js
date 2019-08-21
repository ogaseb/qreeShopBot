import { editQree, findGameToEdit } from "../../db/db_qree";
import { MessageCollector } from "discord.js";
import {
  createASCIIQrCode,
  createDataURLQrCode,
  regexes
} from "../../helpers/helpers";
import pgEscape from "pg-escape";
import imageDataURI from "image-data-uri";
import axios from "axios";
import pretty from "prettysize";

export async function handleGameEdit(messageArguments, receivedMessage) {
  try {
    const id = parseInt(messageArguments[1]);
    const rows = await findGameToEdit(id);
    const { qr_data,
      qr_image_url,
      qr_link,
      name,
      platform,
      region,
      size,
      uploader_discord_id,
      uploader_name} = rows[0]
    if (rows.length) {
      const collector = new MessageCollector(
        receivedMessage.channel,
        m => m.author.id === receivedMessage.author.id,
        { time: 120000 }
      );

      await receivedMessage.channel.send("", {
        files: [qr_image_url]
      });

      await receivedMessage.channel.send(
        "```" +
          "\nLink: " +
          qr_link +
          "\n\nName: " +
          name +
          "\nPlatform: " +
          platform +
          "\nRegion: " +
          region +
          "\nSize: " +
          size +
          "\nUploader: " +
          uploader_name +
          "```" +
          "```" +
          "Is this the game you wish to edit? type 'yes'/'no'" +
          "```"
      );
      collector.on("collect", async message => {
        if (message.content.toLowerCase() === "yes") {
          await receivedMessage.channel.send(
            "```please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.```" +
              "```type `end` if you want to finish```"
          );
        }
        if (message.content.toLowerCase() === "no") {
          collector.stop();
          await receivedMessage.channel.send(
            "``` Ok, will not do anything with it ```"
          );
        }

        if (message.content.toLowerCase() === "end") {
          collector.stop();
        }
      });

      collector.on("end", async collected => {
        let collectedArguments = [];
        for (const item of collected) {
          collectedArguments.push(item[1].content);
        }
        collectedArguments.shift();
        collectedArguments.pop();
        const args = collectedArguments.join(" ").match(regexes.ARGUMENTS);

        let newUrl, newTitle, newRegion, newPlatform, newSize;
        const urlIndex = await args.findIndex(value => regexes.URL.test(value));
        if (urlIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`URL\` is missing continue...`
          );
        } else {
          newUrl = args[urlIndex];
          args.splice(urlIndex, 1);
          await receivedMessage.channel.send(`argument \`URL\` is present!`);
        }

        const titleIndex = await args.findIndex(value =>
          regexes.TITLE.test(value)
        );
        if (titleIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`TITLE\` is missing continue...`
          );
        } else {
          newTitle = args[titleIndex];
          args.splice(titleIndex, 1);
          await receivedMessage.channel.send(`argument \`TITLE\` is present!`);
        }

        const regionIndex = await args.findIndex(value =>
          regexes.REGIONS.test(value)
        );
        if (regionIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`REGION\` is missing continue...`
          );
        } else {
          newRegion = args[regionIndex];
          args.splice(regionIndex, 1);
          await receivedMessage.channel.send(`argument \`REGION\` is present!`);
        }

        const platformIndex = await args.findIndex(value =>
          regexes.PLATFORMS.test(value)
        );
        if (platformIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`PLATFORM\` is missing continue...`
          );
        } else {
          newPlatform = args[platformIndex];
          args.splice(platformIndex, 1);
          await receivedMessage.channel.send(
            `argument \`PLATFORM\` is present!`
          );
        }

        const sizeIndex = await args.findIndex(value =>
          regexes.SIZE.test(value)
        );
        if (sizeIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`SIZE\` is missing continue...`
          );
        } else {
          newSize = args[sizeIndex];
          args.splice(sizeIndex, 1);
          await receivedMessage.channel.send(`argument \`SIZE\` is present!`);
        }

        const obj = {
          name: newTitle ? newTitle : name,
          qr_link: newUrl || qr_link,
          qr_data: newUrl ? await createASCIIQrCode(newUrl) : qr_data,
          qr_image_url: newUrl
            ? await createDataURLQrCode(newUrl)
            : qr_image_url,
          platform: newPlatform|| platform,
          region: newRegion || region,
          size: newSize || size,
          uploader_discord_id: uploader_discord_id,
          uploader_name: uploader_name
        };

        let urlMetadataSize
        if (newUrl) {
          let string =
            obj.name + obj.platform + obj.region + obj.uploader_discord_id;
          string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
          await imageDataURI.outputFile(
            obj.qr_image_url,
            "./img/" + string + ".png"
          );

          await receivedMessage.channel
            .send("", {
              files: ["./img/" + string + ".png"]
            })
            .then(msg => {
              obj.qr_image_url = msg.attachments.values().next().value.proxyURL;
            });

          const urlMetadata = await axios.head(newUrl, { timeout: 15000 });
          if (urlMetadata && urlMetadata.status !== 404) {
            if (urlMetadata.headers["content-length"]) {
              urlMetadataSize = pretty(urlMetadata.headers["content-length"], true)
            }
          }
          obj.size = urlMetadataSize
        }

        await editQree(
          id,
          obj.qr_data,
          obj.qr_image_url,
          obj.qr_link,
          obj.name,
          obj.platform,
          obj.region,
          obj.size,
          obj.uploader_discord_id,
          obj.uploader_name,
          receivedMessage
        );

      });
    } else {
      await receivedMessage.channel.send("cant find it in database");
    }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
  }
}
