const {
  checkFileSize,
  createASCIIQrCode,
  createDataURLQrCode,
  createEmbeddedAnswer,
  filteredRegexes,
  getGameCover,
  getRandomMeme,
  parseURL,
  sendToQrGames
} = require("../../helpers/helpers");
const { createQree, findGame } = require("../../../controllers/qre_items");
const { MessageCollector } = require("discord.js");
const imageDataURI = require("image-data-uri");

module.exports.handleGameUpload = async function(
  messageArguments,
  receivedMessage,
  client
) {
  try {
    if (messageArguments.length !== 5) {
      return receivedMessage.channel.send(
        `invalid arguments count for upload command`
      );
    }
    const meme = await getRandomMeme("head-pat-anime");
    const response = await receivedMessage.channel.send(`wait a moment...`, {
      files: [meme]
    });
    const loadingMessageId = response.id;

    const regexesObj = filteredRegexes([
      "URL",
      "TITLE",
      "REGIONS",
      "PLATFORMS"
    ]);

    let foundArgsObj = {};
    for (const regex in regexesObj) {
      const itemIndex = await messageArguments.findIndex(value =>
        regexesObj[regex].test(value)
      );
      if (itemIndex === -1) {
        return await receivedMessage.channel.send(
          `invalid arguments \`${regex}\` for upload command`
        );
      } else {
        foundArgsObj[regex] = messageArguments[itemIndex];
        messageArguments.splice(itemIndex, 1);
      }
    }

    const obj = {
      name: foundArgsObj.TITLE.replace(/['"]+/g, ""),
      qrLink: parseURL(foundArgsObj.URL),
      qrData: createASCIIQrCode(parseURL(foundArgsObj.URL)),
      qrImageUrl: createDataURLQrCode(parseURL(foundArgsObj.URL)),
      platform: foundArgsObj.PLATFORMS,
      region: foundArgsObj.REGIONS,
      size: await checkFileSize(parseURL(foundArgsObj.URL)),
      uploaderDiscordId: receivedMessage.author.id,
      uploaderName: receivedMessage.author.username
    };

    let string = obj.name + obj.platform + obj.region + obj.uploaderDiscordId;
    string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
    await imageDataURI.outputFile(obj.qrImageUrl, "./img/" + string + ".jpg");

    const rows = await findGame(obj.name);
    const text =
      rows.length === 0
        ? `\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no'\n\`\`\``
        : `\`\`\`diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'"\n\`\`\`\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)"\n\`\`\``;
    // delete loading message
    setTimeout(async () => {
      receivedMessage.channel.messages.get(loadingMessageId).delete();

      await receivedMessage.channel
        .send("", {
          files: ["./img/" + string + ".jpg"]
        })
        .then(msg => {
          obj.qrImageUrl = msg.attachments.values().next().value.proxyURL;
        });

      await receivedMessage.channel.send(
        `\`\`\`\nLink: ${obj.qrLink}\n\nName: ${obj.name}\nPlatform: ${obj.platform}\nRegion: ${obj.region}\nSize: ${obj.size}\nUploader: ${obj.uploaderName}\`\`\`${text}`
      );
    }, 3000);

    const collector = new MessageCollector(
      receivedMessage.channel,
      m => m.author.id === receivedMessage.author.id,
      { time: 60000 }
    );

    collector.on("collect", async message => {
      if (message.content.toLowerCase() === "yes") {
        collector.stop();
        try {
          obj.id = await createQree(obj, receivedMessage);
          const gameThumbnail = await getGameCover(obj.id, obj.name);
          const qrCodesSubscription = await sendToQrGames(
            obj,
            receivedMessage,
            client,
            gameThumbnail
          );
          await qrCodesSubscription.build();
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
          );
        }
      } else if (message.content.toLowerCase() === "no") {
        collector.stop();

        try {
          await receivedMessage.channel.send("Ok try again later :P");
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
          );
        }
      } else if (message.content.toLowerCase() === "search") {
        try {
          await receivedMessage.channel.send(
            `\`\`\`Ok, displaying games that I have found you can type 'yes'/'no' still\`\`\``
          );

          const QrCodesSearchResults = await createEmbeddedAnswer(
            rows,
            receivedMessage
          );
          await QrCodesSearchResults.build();
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
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
      `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
    );
  }
};
