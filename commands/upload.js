import {
  createASCIIQrCode,
  createEmbeddedAnswer,
  parseDropboxLink,
  parseGDriveLink,
  regexes,
  sendToQrGames
} from "../helpers/helpers";
import { createQree, findGame } from "../db/db_qree";
import { MessageCollector } from "discord.js";

export async function handleGameUpload(
  messageArguments,
  receivedMessage,
  client
) {
  console.log(messageArguments);
  if (messageArguments.length !== 6) {
    return receivedMessage.channel.send(
      `invalid arguments count for upload command`
    );
  }

  console.log(messageArguments);

  const urlIndex = messageArguments.findIndex(value => regexes.URL.test(value));

  if (urlIndex === -1) {
    return receivedMessage.channel.send(
      `invalid arguments \`URL\` for upload command`
    );
  }
  const titleIndex = messageArguments.findIndex(value =>
    regexes.TITLE.test(value)
  );
  if (titleIndex === -1) {
    return receivedMessage.channel.send(
      `invalid arguments \`TITLE\` for upload command`
    );
  }
  const regionIndex = messageArguments.findIndex(value =>
    regexes.REGIONS.test(value)
  );
  if (regionIndex === -1) {
    return receivedMessage.channel.send(
      `invalid arguments \`REGION\` for upload command`
    );
  }
  const platformIndex = messageArguments.findIndex(value =>
    regexes.PLATFORMS.test(value)
  );
  if (platformIndex === -1) {
    return receivedMessage.channel.send(
      `invalid arguments \`PLATFORM\` for upload command`
    );
  }
  const sizeIndex = messageArguments.findIndex(value =>
    regexes.SIZE.test(value)
  );
  if (sizeIndex === -1) {
    return receivedMessage.channel.send(
      `invalid arguments \`SIZE\` for upload command`
    );
  }

  console.log(urlIndex, titleIndex, regionIndex, platformIndex, sizeIndex);

  if (messageArguments[urlIndex].match(regexes.GDRIVE)) {
    messageArguments[urlIndex] = parseGDriveLink(messageArguments[urlIndex]);
  } else if (messageArguments[urlIndex].match(regexes.DROPBOX)) {
    if (
      messageArguments[urlIndex].slice(-1) === "0" ||
      messageArguments[urlIndex].slice(-1) === "1"
    ) {
      messageArguments[urlIndex] = parseDropboxLink(messageArguments[urlIndex]);
      messageArguments[urlIndex] = messageArguments[urlIndex].match(
        /^(.*?)\.?dl=1/gi
      );
    }
  }

  console.log(messageArguments[urlIndex]);

  const obj = {
    name: messageArguments[titleIndex]
      .replace(/^"(.*)"$/, "$1")
      .replace(/'/g, "''"),
    qr_link: messageArguments[urlIndex],
    qr_data: await createASCIIQrCode(messageArguments[urlIndex]),
    platform: messageArguments[platformIndex],
    region: messageArguments[regionIndex],
    size: messageArguments[sizeIndex],
    uploader_discord_id: receivedMessage.author.id,
    uploader_name: receivedMessage.author.username
  };

  const { rows } = await findGame(obj.name);
  const text =
    rows.length === 0
      ? "```diff\n" +
        "+ This is how it will look, save in database? Type 'yes'/'no'" +
        "\n```"
      : "```diff\n" +
        "+ There are games with similar name, check by searching them first before uploading" +
        "\n```" +
        "```diff\n" +
        "+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)" +
        "\n```";

  await receivedMessage.channel.send(
    "```" +
      obj.qr_data +
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
          obj.qr_link,
          obj.name,
          obj.platform,
          obj.region,
          obj.size,
          obj.uploader_discord_id,
          obj.uploader_name
        );

        const QrCodesSubscription = sendToQrGames(obj, receivedMessage, client);
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
}
