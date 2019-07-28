import { editQree, findGameToEdit } from "../db/db_qree";
import { MessageCollector } from "discord.js";
import { createASCIIQrCode, regexes } from "../helpers/helpers";

export async function handleGameEdit(messageArguments, receivedMessage) {
  try {
    const id = parseInt(messageArguments[1]);
    const { rows } = await findGameToEdit(id);

    if (rows.length) {
      const collector = new MessageCollector(
        receivedMessage.channel,
        m => m.author.id === receivedMessage.author.id,
        { time: 120000 }
      );

      await receivedMessage.channel.send(
        "```" +
          rows[0].qr_data +
          "\nLink: " +
          rows[0].qr_link +
          "\n\nName: " +
          rows[0].name +
          "\nPlatform: " +
          rows[0].platform +
          "\nRegion: " +
          rows[0].region +
          "\nSize: " +
          rows[0].size +
          "\nUploader: " +
          rows[0].uploader_name +
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
        console.log(args);

        const urlIndex = await args.findIndex(value => regexes.URL.test(value));
        if (urlIndex === -1) {
          await receivedMessage.channel.send(
            `argument \`URL\` is missing continue...`
          );
        } else {
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
          await receivedMessage.channel.send(`argument \`SIZE\` is present!`);
        }

        console.log(
          urlIndex,
          titleIndex,
          regionIndex,
          sizeIndex,
          platformIndex,
          args[platformIndex]
        );

        const obj = {
          name: args[titleIndex]
            ? args[titleIndex].replace(/^"(.*)"$/, "$1").replace(/'/g, "''")
            : rows[0].name,
          qr_link: args[urlIndex] || rows[0].qr_link,
          qr_data: args[urlIndex]
            ? await createASCIIQrCode(args[urlIndex])
            : rows[0].qr_data,
          platform: args[platformIndex] || rows[0].platform,
          region: args[regionIndex] || rows[0].region,
          size: args[sizeIndex] || rows[0].size,
          uploader_discord_id: rows[0].uploader_discord_id,
          uploader_name: rows[0].uploader_name
        };

        await editQree(
          id,
          obj.qr_data,
          obj.qr_link,
          obj.name,
          obj.platform,
          obj.region,
          obj.size,
          obj.uploader_discord_id,
          obj.uploader_name
        );
        await receivedMessage.channel.send("Edited!");
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
