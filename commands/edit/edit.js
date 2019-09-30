import { editQree, findGameToEdit } from "../../db/db_qree";
import { MessageCollector } from "discord.js";
import {
  checkFileSize,
  createASCIIQrCode,
  createDataURLQrCode,
  filteredRegexes,
  regexes
} from "../../helpers/helpers";
import imageDataURI from "image-data-uri";

export async function handleGameEdit(messageArguments, receivedMessage) {
  try {
    const id = parseInt(messageArguments[1]);
    const rows = await findGameToEdit(id);
    const {
      qr_data,
      qr_image_url,
      qr_link,
      name,
      platform,
      region,
      size,
      uploader_discord_id,
      uploader_name
    } = rows[0];
    if (rows.length) {
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
          "```",
        {
          files: [qr_image_url]
        }
      );

      const collector = new MessageCollector(
        receivedMessage.channel,
        m => m.author.id === receivedMessage.author.id,
        { time: 120000 }
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

        const args = collectedArguments
          .filter(
            function(e) {
              return this.indexOf(e.toLowerCase()) < 0;
            },
            ["end", "yes", "no"]
          )
          .join(" ")
          .match(regexes.ARGUMENTS);

        const regexesObj = filteredRegexes([
          "URL",
          "TITLE",
          "REGIONS",
          "PLATFORMS",
          "SIZE"
        ]);
        let foundArgsObj = {};
        for (const regex in regexesObj) {
          const itemIndex = await args.findIndex(value =>
            regexesObj[regex].test(value)
          );
          if (itemIndex === -1) {
            await receivedMessage.channel.send(
              `argument \`${regex}\` is missing continue...`
            );
          } else {
            foundArgsObj[regex] = args[itemIndex];
            args.splice(itemIndex, 1);
            await receivedMessage.channel.send(
              `argument \`${regex}\` is present! : \`${foundArgsObj[regex]}\``
            );
          }
        }

        const obj = {
          name: foundArgsObj.TITLE ? foundArgsObj.TITLE : name,
          qr_link: foundArgsObj.URL || qr_link,
          qr_data: foundArgsObj.URL
            ? await createASCIIQrCode(foundArgsObj.URL)
            : qr_data,
          qr_image_url: foundArgsObj.URL
            ? await createDataURLQrCode(foundArgsObj.URL)
            : qr_image_url,
          platform: foundArgsObj.PLATFORMS || platform,
          region: foundArgsObj.REGIONS || region,
          size: foundArgsObj.SIZE || size,
          uploader_discord_id: uploader_discord_id,
          uploader_name: uploader_name
        };

        if (foundArgsObj.URL) {
          let string =
            obj.name + obj.platform + obj.region + obj.uploader_discord_id;
          string = string.replace(/[^a-z0-9]/gim, "");
          await imageDataURI.outputFile(
            obj.qr_image_url,
            "./img/" + string + ".jpg"
          );

          await receivedMessage.channel
            .send("", {
              files: ["./img/" + string + ".jpg"]
            })
            .then(msg => {
              obj.qr_image_url = msg.attachments.values().next().value.proxyURL;
            });

          obj.size = checkFileSize(foundArgsObj.URL);
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
