const {
  other: { checkFileSize, filteredRegexes, regexes },
  qr: { createDataURLQrCode, parseURL, createQrImageUrlFromLink }
} = require("../../../helpers");

const createInitialObjectEdit = async (
  messageArguments,
  receivedMessage,
  game
) => {
  let finalObject = {
    name: null,
    qrLink: null,
    qrImageUrl: null,
    platform: null,
    region: null,
    size: null,
    uploaderDiscordId: game.uploaderDiscordId,
    uploaderName: game.uploaderName,
    messagesIdArray: []
  };

  const regexesObj = await filteredRegexes([
    "URL",
    "TITLE",
    "REGIONS",
    "PLATFORMS",
    "SIZE"
  ]);
  let foundArgsObj = {};
  for (const regex in regexesObj) {
    const itemIndex = await messageArguments.findIndex(value =>
      value.match(regexesObj[regex])
    );
    console.log(itemIndex);
    if (itemIndex === -1) {
      const message = await receivedMessage.channel.send(
        `argument \`${regex}\` is missing continue...`
      );
      await finalObject.messagesIdArray.push(message.id);
    } else {
      const message = await receivedMessage.channel.send(
        `argument \`${regex}\` is present! : ${messageArguments[itemIndex]}`
      );
      foundArgsObj[regex] = messageArguments[itemIndex];
      messageArguments.splice(itemIndex, 1);
      await finalObject.messagesIdArray.push(message.id);
    }
  }
  foundArgsObj.TITLE
    ? (finalObject.name = foundArgsObj.TITLE.replace(/['"]+/g, ""))
    : (finalObject.name = game.name);
  foundArgsObj.URL
    ? (finalObject.qrLink = await parseURL(foundArgsObj.URL))
    : (finalObject.qrLink = game.qrLink);
  foundArgsObj.PLATFORMS
    ? (finalObject.platform = foundArgsObj.PLATFORMS)
    : (finalObject.platform = game.platform);
  foundArgsObj.REGIONS
    ? (finalObject.region = foundArgsObj.REGIONS)
    : (finalObject.region = game.region);
  foundArgsObj.SIZE
    ? (finalObject.size = foundArgsObj.SIZE)
    : (finalObject.size = game.size);
  if (foundArgsObj.URL && !foundArgsObj.SIZE) {
    finalObject.size = await checkFileSize(foundArgsObj.URL);
  }

  if (foundArgsObj.URL) {
    const qrImageUrl = await createQrImageUrlFromLink(
      finalObject,
      receivedMessage,
      finalObject.qrLink
    );
    finalObject.qrImageUrl = qrImageUrl.proxyURL;
  } else {
    finalObject.qrImageUrl = game.qrImageUrl;
  }
  // finalObject.messagesIdArray = messagesIdArray

  const isEmpty = Object.values(finalObject).every(x => x === null);

  if (isEmpty) {
    await receivedMessage.channel.send(
      `something went wrong with editing data for qr code`
    );
  } else {
    return finalObject;
  }
};

module.exports.createInitialObjectEdit = createInitialObjectEdit;
