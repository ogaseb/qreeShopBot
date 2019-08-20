import {
  createASCIIQrCode,
  createEmbeddedAnswer,
  parseDropboxLink,
  parseGDriveLink,
  regexes,
  sendToQrGames,
  createDataURLQrCode
} from "../../helpers/helpers";
import { createQree, findGame } from "../../db/db_qree";
import { MessageCollector } from "discord.js";
import imageDataURI from "image-data-uri";

export async function handleGameUpload(
  messageArguments,
  receivedMessage,
  client
) {
  try {
    if (messageArguments.length !== 6) {
      return receivedMessage.channel.send(
        `invalid arguments count for upload command`
      );
    }

    const urlIndex = messageArguments.findIndex(value =>
      regexes.URL.test(value)
    );

    let url, title, region, platform, size;
    if (urlIndex === -1) {
      return await receivedMessage.channel.send(
        `invalid arguments \`URL\` for upload command`
      );
    } else {
      url = messageArguments[urlIndex];
      messageArguments.splice(urlIndex, 1);
    }

    const titleIndex = messageArguments.findIndex(value =>
      regexes.TITLE.test(value)
    );
    if (titleIndex === -1) {
      return await receivedMessage.channel.send(
        `invalid arguments \`TITLE\` for upload command`
      );
    } else {
      title = messageArguments[titleIndex];
      messageArguments.splice(titleIndex, 1);
    }

    const regionIndex = messageArguments.findIndex(value =>
      regexes.REGIONS.test(value)
    );
    if (regionIndex === -1) {
      return await receivedMessage.channel.send(
        `invalid arguments \`REGION\` for upload command`
      );
    } else {
      region = messageArguments[regionIndex];
      messageArguments.splice(regionIndex, 1);
    }

    const platformIndex = messageArguments.findIndex(value =>
      regexes.PLATFORMS.test(value)
    );
    if (platformIndex === -1) {
      return await receivedMessage.channel.send(
        `invalid arguments \`PLATFORM\` for upload command`
      );
    } else {
      platform = messageArguments[platformIndex];
      messageArguments.splice(platformIndex, 1);
    }

    const sizeIndex = messageArguments.findIndex(value =>
      regexes.SIZE.test(value)
    );
    if (sizeIndex === -1) {
      return await receivedMessage.channel.send(
        `invalid arguments \`SIZE\` for upload command`
      );
    } else {
      size = messageArguments[sizeIndex];
      messageArguments.splice(sizeIndex, 1);
    }

    console.log(url, title, region, platform, size, messageArguments);

    if (url && url.match(regexes.GDRIVE)) {
      url = parseGDriveLink(url);
    } else if (url && url.match(regexes.DROPBOX)) {
      if (url.slice(-1) === "0" || url.slice(-1) === "1") {
        url = parseDropboxLink(url);
        url = url.match(/^(.*?)\.?dl=1/gi);
        url = url[0];
      }
    }

    const obj = {
      name: title.replace(/^"(.*)"$/, "$1"),
      qr_link: url,
      qr_data: await createASCIIQrCode(url),
      qr_image_url: await createDataURLQrCode(url),
      platform: platform,
      region: region,
      size: size,
      uploader_discord_id: receivedMessage.author.id,
      uploader_name: receivedMessage.author.username
    };

    console.log(obj);

    // imageDataURI.decode(obj.qr_data);
    let string = obj.name + obj.platform + obj.region + obj.uploader_discord_id;
    string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
    await imageDataURI.outputFile(obj.qr_image_url, "./img/" + string + ".png");

    const { rows } = await findGame(obj.name.replace(/'/g, "''"));
    const text =
      rows.length === 0
        ? "```diff\n" +
          "+ This is how it will look, save in database? Type 'yes'/'no'" +
          "\n```"
        : "```diff\n" +
          "- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'" +
          "\n```" +
          "```diff\n" +
          "+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)" +
          "\n```";

    await receivedMessage.channel
      .send("", {
        files: ["./img/" + string + ".png"]
      })
      .then(msg => {
        obj.qr_image_url = msg.attachments.values().next().value.proxyURL;
      });

    await receivedMessage.channel.send(
      "```" +
        "\nLink: " +
        obj.qr_link +
        "\n\nName: " +
        obj.name +
        "\nPlatform: " +
        obj.platform +
        "\nRegion: " +
        obj.region +
        "\nSize: " +
        obj.size +
        "\nUploader: " +
        obj.uploader_name +
        "```" +
        text
    );

    const collector = new MessageCollector(
      receivedMessage.channel,
      m => m.author.id === receivedMessage.author.id,
      { time: 60000 }
    );

    collector.on("collect", async message => {
      if (message.content.toLowerCase() === "yes") {
        collector.stop();
        try {
          await receivedMessage.channel.send("Saving in database!");
          await createQree(
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

          const QrCodesSubscription = sendToQrGames(
            obj,
            receivedMessage,
            client
          );
          await QrCodesSubscription.build();
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            "something went wrong, send it to developer: \n" +
              "```diff\n- " +
              e +
              "```"
          );
        }
      } else if (message.content.toLowerCase() === "no") {
        collector.stop();

        try {
          await receivedMessage.channel.send("Ok try again later :P");
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            "something went wrong, send it to developer: \n" +
              "```diff\n- " +
              e +
              "```"
          );
        }
      } else if (message.content.toLowerCase() === "search") {
        try {
          await receivedMessage.channel.send(
            "```Ok, displaying games that I have found you can type 'yes'/'no' still```"
          );

          const QrCodesSearchResults = await createEmbeddedAnswer(
            rows,
            receivedMessage
          );
          await QrCodesSearchResults.build();
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
    });

    collector.on("end", async () => {
      await receivedMessage.channel.send("upload session ended");
    });
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
