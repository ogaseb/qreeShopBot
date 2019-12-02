const {
  qr: { parseURL, createDataURLQrCode },
  third_party: { getRandomMeme },
  other: { checkFileSize, filteredRegexes },
  embedded: { sendToQrGames, createEmbeddedAnswer }
} = require("../../helpers/index");
const { createQree, findGame } = require("../../controllers/qre_items");
const { MessageCollector } = require("discord.js");
const imageDataURI = require("image-data-uri");

const createInitialObject = async (messageArguments, receivedMessage) => {
  let finalObject = {
    name: null,
    qrLink: null,
    qrImageUrl: null,
    platform: null,
    region: null,
    size: null,
    uploaderDiscordId: null,
    uploaderName: null
  };

  const regexesObj = filteredRegexes(["URL", "TITLE", "REGIONS", "PLATFORMS"]);

  let foundArgsObj = {};
  for (const regex in regexesObj) {
    const itemIndex = await messageArguments.findIndex(value =>
      regexesObj[regex].test(value)
    );
    if (itemIndex === -1) {
      await receivedMessage.channel.send(
        `invalid arguments \`${regex}\` for upload command`
      );
    } else {
      foundArgsObj[regex] = messageArguments[itemIndex];
      messageArguments.splice(itemIndex, 1);
    }
  }

  finalObject.name = foundArgsObj.TITLE.replace(/['"]+/g, "");
  finalObject.qrLink = parseURL(foundArgsObj.URL);
  finalObject.platform = foundArgsObj.PLATFORMS;
  finalObject.region = foundArgsObj.REGIONS;
  finalObject.size = await checkFileSize(finalObject.qrLink);
  finalObject.uploaderDiscordId = receivedMessage.author.id;
  finalObject.uploaderName = receivedMessage.author.username;
  finalObject.qrImageUrl = await createImageUrlFromFile(
    finalObject,
    receivedMessage,
    foundArgsObj.URL
  );
  const isEmpty = Object.values(finalObject).every(x => x === null);
  if (isEmpty) {
    await receivedMessage.channel.send(
      `something went wrong with creating data for qr code`
    );
  } else {
    return finalObject;
  }
};

const createImageUrlFromFile = async (finalObject, receivedMessage, url) => {
  let string =
    finalObject.name +
    finalObject.platform +
    finalObject.region +
    finalObject.uploaderDiscordId;
  string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
  await imageDataURI.outputFile(
    await createDataURLQrCode(url),
    "./img/" + string + ".jpg"
  );
  const imageMsg = await receivedMessage.channel.send("", {
    files: ["./img/" + string + ".jpg"]
  });
  return imageMsg.attachments.values().next().value.proxyURL;
};

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
    const waitingMessage = await receivedMessage.channel.send(
      `wait a moment...`,
      {
        files: [meme]
      }
    );

    const qrGameObject = await createInitialObject(
      messageArguments,
      receivedMessage
    );
    const rows = await findGame(qrGameObject.name);
    const text =
      rows.length === 0
        ? `\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no'\n\`\`\``
        : `\`\`\`diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'"\n\`\`\`\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)"\n\`\`\``;

    await receivedMessage.channel.messages.get(waitingMessage.id).delete();
    await receivedMessage.channel.send(
      `\`\`\`\nLink: ${qrGameObject.qrLink}\n\nName: ${qrGameObject.name}\nPlatform: ${qrGameObject.platform}\nRegion: ${qrGameObject.region}\nSize: ${qrGameObject.size}\nUploader: ${qrGameObject.uploaderName}\`\`\`${text}`
    );

    const collector = new MessageCollector(
      receivedMessage.channel,
      m => m.author.id === receivedMessage.author.id,
      { time: 60000 }
    );

    collector.on("collect", async message => {
      if (message.content.toLowerCase() === "yes") {
        collector.stop();
        qrGameObject.id = await createQree(qrGameObject, receivedMessage);
        await receivedMessage.channel.send("Saving in database!");

        const qrCodesSubscription = await sendToQrGames(
          qrGameObject,
          receivedMessage,
          client
        );
        await qrCodesSubscription.build();
      } else if (message.content.toLowerCase() === "no") {
        collector.stop();
        await receivedMessage.channel.send("Ok try again later :P");
      } else if (message.content.toLowerCase() === "search") {
        await receivedMessage.channel.send(
          `\`\`\`Ok, displaying games that I have found you can type 'yes'/'no' still\`\`\``
        );

        const QrCodesSearchResults = await createEmbeddedAnswer(
          rows,
          receivedMessage
        );
        await QrCodesSearchResults.build();
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
