const {
  qr: { parseURL, createQrImageUrlFromLink },
  third_party: { getRandomMeme },
  other: { checkFileSize, filteredRegexes }
} = require("../../helpers/index");
const { findGame } = require("../../controllers/qre_items");
const { QrCollector } = require("../../classess/collector/collector");

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
  finalObject.qrImageUrl = await createQrImageUrlFromLink(
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
    const searchResult = await findGame(qrGameObject.name);
    const text =
      searchResult.length === 0
        ? `\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no'\n\`\`\``
        : `\`\`\`diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'"\n\`\`\`\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)"\n\`\`\``;

    await receivedMessage.channel.messages.get(waitingMessage.id).delete();
    await receivedMessage.channel.send(
      `\`\`\`\nLink: ${qrGameObject.qrLink}\n\nName: ${qrGameObject.name}\nPlatform: ${qrGameObject.platform}\nRegion: ${qrGameObject.region}\nSize: ${qrGameObject.size}\nUploader: ${qrGameObject.uploaderName}\`\`\`${text}`
    );

    return new QrCollector(receivedMessage, "upload", {
      client: client,
      qrGameObject: qrGameObject,
      searchResult: searchResult
    }).init();
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
    );
  }
};
